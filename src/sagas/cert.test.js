import { all, put, call, select } from "redux-saga/effects";
import sinon from "sinon";
import { certificateData } from "@govtechsg/open-certificate";
import {
  verifyCertificateIssuer,
  resolveEnsNamesToText,
  lookupEthereumAddresses,
  sendCertificate,
  analyticsIssuerFail,
  analyticsHashFail,
  analyticsIssuedFail,
  analyticsRevocationFail,
  verifyCertificateNotRevoked,
  getIntermediateHashes
} from "./certificate";
import {
  getCertificate,
  verifyingCertificateIssuerSuccess,
  verifyingCertificateIssuerFailure
} from "../reducers/certificate";
import MakeCertUtil from "./makeCertUtil";
import * as sendEmail from "../services/email";

const h0 = "f7432b3219b2aa4122e289f44901830fa32f224ee9dfce28565677f1d279b2c7";

const p0 = "2bb9dd186994f38084ee68e06be848b9d43077c307684c300d81df343c7858cf";
const p1 = "ed8bdba60a24af04bcdcd88b939251f3843e03839164fdd2dd502aaeef3bfb99";

const intermediateHash =
  "fe0958c4b90e768cecb50cea207f3af034580703e9ed74ef460c1a31dd1b4d6c";
const rootHash =
  "fcfce0e79adc002c1fd78a2a02c768c0fdc00e5b96f1da8ef80bed02876e18d1";

describe("getIntermediateHashes", () => {
  it("returns targetHash only if there is no proof", () => {
    expect(getIntermediateHashes(h0)).toEqual([`0x${h0}`]);
  });
  it("returns all intermediate (and final) hash", () => {
    const intermediateHashes = getIntermediateHashes(h0, [p0, p1]);
    expect(intermediateHashes.length).toBe(3);
    expect(intermediateHashes[0]).toEqual(`0x${h0}`);
    expect(intermediateHashes[2]).toEqual(`0x${rootHash}`);
  });
});

const mockStore = () => {
  const call = sinon.stub();
  return {
    methods: {
      isRevoked: h => ({
        call: () => call(h)
      })
    },
    stub: call
  };
};

describe("verifyCertificateNotRevoked", () => {
  it("passes if all the store returns true for all hashes", () => {
    const certificateStores = [mockStore(), mockStore(), mockStore()];
    const certificate = {
      signature: {
        targetHash:
          "f7432b3219b2aa4122e289f44901830fa32f224ee9dfce28565677f1d279b2c7",
        proof: [
          "2bb9dd186994f38084ee68e06be848b9d43077c307684c300d81df343c7858cf",
          "ed8bdba60a24af04bcdcd88b939251f3843e03839164fdd2dd502aaeef3bfb99"
        ]
      }
    };

    const generator = verifyCertificateNotRevoked({
      certificate,
      certificateStores
    });

    generator.next();

    // When all store returns false for target hash
    generator.next([false, false, false]);
    // When all store returns false for intermediate hash
    generator.next([false, false, false]);
    // When all store returns false for merkle root
    const doneWithVerification = generator.next([false, false, false]);

    // Assert that hashes is checked against all stores
    const hashCheckSequence = [
      [`0x${h0}`],
      [`0x${intermediateHash}`],
      [`0x${rootHash}`]
    ];
    expect(certificateStores[0].stub.args).toEqual(hashCheckSequence);
    expect(certificateStores[1].stub.args).toEqual(hashCheckSequence);
    expect(certificateStores[2].stub.args).toEqual(hashCheckSequence);

    expect(doneWithVerification.value).toEqual(
      put({
        type: "VERIFYING_CERTIFICATE_REVOCATION_SUCCESS"
      })
    );

    const generatorEnd = generator.next();
    expect(generatorEnd.value).toBe(true);
    expect(generatorEnd.done).toBe(true);
  });
});
