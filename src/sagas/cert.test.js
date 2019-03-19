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
  getIntermediateHashes,
  verifyCertificateHash
} from "./certificate";
import {
  getCertificate,
  verifyingCertificateIssuerSuccess,
  verifyingCertificateIssuerFailure
} from "../reducers/certificate";
import MakeCertUtil from "./makeCertUtil";
import * as sendEmail from "../services/email";
import * as openCerts from "@govtechsg/open-certificate";

const targetHash =
  "f7432b3219b2aa4122e289f44901830fa32f224ee9dfce28565677f1d279b2c7";
const proof0 =
  "2bb9dd186994f38084ee68e06be848b9d43077c307684c300d81df343c7858cf";
const proof1 =
  "ed8bdba60a24af04bcdcd88b939251f3843e03839164fdd2dd502aaeef3bfb99";
const intermediateHash =
  "fe0958c4b90e768cecb50cea207f3af034580703e9ed74ef460c1a31dd1b4d6c";
const rootHash =
  "fcfce0e79adc002c1fd78a2a02c768c0fdc00e5b96f1da8ef80bed02876e18d1";

// verifyCertificateIssued

function whenThereIsOneEthereumAddressIssuer() {
  const ethereumAddresses = ["0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F"];
  const testCert = new MakeCertUtil().addIssuer(ethereumAddresses[0]).finish();
  return { testCert, ethereumAddresses };
}

describe("a", () => {
  it("works", () => {});
});
