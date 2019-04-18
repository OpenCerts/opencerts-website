import { put, call, select } from "redux-saga/effects";
import sinon from "sinon";
import * as openCertsApi from "@govtechsg/open-certificate";
import {
  verifyCertificateNotRevoked,
  verifyCertificateIssuer,
  verifyCertificateHash,
  verifyCertificateIssued,
  resolveEnsNamesToText,
  lookupEthereumAddresses,
  sendCertificate,
  analyticsIssuerFail,
  analyticsHashFail,
  analyticsIssuedFail,
  analyticsRevocationFail,
  getIntermediateHashes
} from "./certificate";
import {
  getCertificate,
  verifyingCertificateIssuerSuccess,
  verifyingCertificateIssuerFailure,
  verifyingCertificateRevocationSuccess,
  verifyingCertificateRevocationFailure,
  verifyingCertificateIssuedSuccess,
  verifyingCertificateIssuedFailure,
  verifyingCertificateHashSuccess,
  verifyingCertificateHashFailure
} from "../reducers/certificate";
import {
  MakeCertUtil,
  mockStore,
  targetHash,
  proof0,
  proof1,
  intermediateHash,
  rootHash
} from "./testutils";
import * as sendEmail from "../services/email";

const { certificateData } = openCertsApi;

function whenThereIsOneEthereumAddressIssuer() {
  const ethereumAddresses = ["0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F"];
  const testCert = new MakeCertUtil().addIssuer(ethereumAddresses[0]).finish();
  return { testCert, ethereumAddresses };
}

function whenThereAreMultipleEthereumAddressIssuers() {
  const ethereumAddresses = [
    "0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F",
    "0x0096Ca31c87771a2Ed212D4b2E689e712Bd938F9"
  ];
  const testCert = new MakeCertUtil()
    .addIssuer(ethereumAddresses[0])
    .addIssuer(ethereumAddresses[1])
    .finish();
  return { testCert, ethereumAddresses };
}

function whenThereIsOnlyOneEnsName() {
  const ensNames = ["govtech-test.sg.opencerts.eth"];
  const testCert = new MakeCertUtil().addIssuer(ensNames[0]).finish();

  return { testCert, ensNames };
}
function whenThereAreMultipleEnsNames() {
  const ensNames = [
    "govtech-test.sg.opencerts.eth",
    "govtech-test2.sg.opencerts.eth"
  ];
  const testCert = new MakeCertUtil()
    .addIssuer(ensNames[0])
    .addIssuer(ensNames[1])
    .finish();

  return { testCert, ensNames };
}

function whenThereAreEnsNamesAndEthereumAddresses() {
  const ensNames = [
    "govtech-test.sg.opencerts.eth",
    "govtech-test2.sg.opencerts.eth"
  ];
  const ethereumAddresses = [
    "0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F",
    "0x0096Ca31c87771a2Ed212D4b2E689e712Bd938F9"
  ];
  const testCert = new MakeCertUtil()
    .addIssuer(ensNames[0])
    .addIssuer(ensNames[1])
    .addIssuer(ethereumAddresses[0])
    .addIssuer(ethereumAddresses[1])
    .finish();

  return { testCert, ensNames, ethereumAddresses };
}

describe("sagas/certificate", () => {
  describe("sendCertificate", () => {
    let emailStub;
    beforeEach(() => {
      emailStub = sinon.stub(sendEmail, "default");
    });
    afterEach(() => {
      emailStub.restore();
    });
    it("should put SENDING_CERTIFICATE_SUCCESS on success", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const saga = sendCertificate({ payload: { email, captcha } });

      expect(saga.next().value).toEqual(select(getCertificate));
      expect(saga.next(testCert).value).toEqual(
        emailStub({
          certificate: testCert,
          email,
          captcha
        })
      );
      expect(saga.next(true).value).toEqual(
        put({
          type: "SENDING_CERTIFICATE_SUCCESS"
        })
      );
      expect(saga.next().done).toBe(true);
    });

    it("should put SENDING_CERTIFICATE_SUCCESS on failure", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const saga = sendCertificate({ payload: { email, captcha } });

      expect(saga.next().value).toEqual(select(getCertificate));
      expect(saga.next(testCert).value).toEqual(
        emailStub({
          certificate: testCert,
          email,
          captcha
        })
      );
      expect(saga.next(false).value).toEqual(
        put({
          type: "SENDING_CERTIFICATE_FAILURE",
          payload: "Fail to send certificate"
        })
      );
      expect(saga.next().done).toBe(true);
    });

    it("should put SENDING_CERTIFICATE_SUCCESS on error", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const errorMsg = "Some unknown error has occured";
      const saga = sendCertificate({ payload: { email, captcha } });

      expect(saga.next().value).toEqual(select(getCertificate));
      expect(saga.next(testCert).value).toEqual(
        emailStub({
          certificate: testCert,
          email,
          captcha
        })
      );
      expect(saga.throw(new Error(errorMsg)).value).toEqual(
        put({
          type: "SENDING_CERTIFICATE_FAILURE",
          payload: errorMsg
        })
      );
      expect(saga.next().done).toBe(true);
    });
  });
  describe("verifyCertificateIssuer", () => {
    it("should resolve singular issuer ens name", () => {
      const { testCert, ensNames } = whenThereIsOnlyOneEnsName();
      const resolverReturnValue = ["test store"];
      const issuerSaga = verifyCertificateIssuer({ certificate: testCert });

      expect(issuerSaga.next().value).toEqual(
        call(resolveEnsNamesToText, ensNames)
      );
      const resolvedPut = issuerSaga.next(resolverReturnValue).value;

      expect(resolvedPut).toEqual(
        put(verifyingCertificateIssuerSuccess(resolverReturnValue))
      );
      const isSagaFinished = issuerSaga.next().done;

      expect(isSagaFinished).toBe(true);
    });

    it("should resolve multiple issuer ens name", () => {
      const { testCert, ensNames } = whenThereAreMultipleEnsNames();
      const resolverReturnValue = ["test store", "test store 2"];
      const issuerSaga = verifyCertificateIssuer({ certificate: testCert });

      expect(issuerSaga.next().value).toEqual(
        call(resolveEnsNamesToText, ensNames)
      );
      const resolvedPut = issuerSaga.next(resolverReturnValue).value;

      expect(resolvedPut).toEqual(
        put(verifyingCertificateIssuerSuccess(resolverReturnValue))
      );
      const isSagaFinished = issuerSaga.next().done;

      expect(isSagaFinished).toBe(true);
    });

    it("should resolve issuer ethereum address", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereIsOneEthereumAddressIssuer();
      const resolverReturnValue = ["test store", "test store 2"];
      const issuerSaga = verifyCertificateIssuer({ certificate: testCert });

      expect(issuerSaga.next().value).toEqual(
        call(lookupEthereumAddresses, ethereumAddresses)
      );
      const resolvedPut = issuerSaga.next(resolverReturnValue).value;

      expect(resolvedPut).toEqual(
        put(verifyingCertificateIssuerSuccess(resolverReturnValue))
      );
      const isSagaFinished = issuerSaga.next().done;

      expect(isSagaFinished).toBe(true);
    });

    it("should resolve issuer ethereum address", () => {
      const {
        testCert,
        ensNames,
        ethereumAddresses
      } = whenThereAreEnsNamesAndEthereumAddresses();
      const resolverReturnValue = ["resolved ens 1", "resolved ens 2"];
      const issuerRegistryReturnValue = [
        "ethereum address registry 1",
        "ethereum address registry 2"
      ];
      const issuerSaga = verifyCertificateIssuer({ certificate: testCert });

      expect(issuerSaga.next().value).toEqual(
        call(resolveEnsNamesToText, ensNames)
      );

      expect(issuerSaga.next(resolverReturnValue).value).toEqual(
        call(lookupEthereumAddresses, ethereumAddresses)
      );
      const resolvedPut = issuerSaga.next(issuerRegistryReturnValue).value;

      expect(resolvedPut).toEqual(
        put(
          verifyingCertificateIssuerSuccess(
            issuerRegistryReturnValue.concat(resolverReturnValue)
          )
        )
      );
      const isSagaFinished = issuerSaga.next().done;

      expect(isSagaFinished).toBe(true);
    });

    it("should throw if there are no issuer identity", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereAreMultipleEthereumAddressIssuers();
      const resolverReturnValue = [];
      const errorMsg = "Issuer identity missing in certificate";
      const certData = certificateData(testCert);
      const issuerSaga = verifyCertificateIssuer({ certificate: testCert });

      expect(issuerSaga.next().value).toEqual(
        call(lookupEthereumAddresses, ethereumAddresses)
      );

      const resolvedPut = issuerSaga.next(resolverReturnValue).value;
      // const resolvedPut = issuerSaga.throw(new Error(errorMsg)).value;

      expect(resolvedPut).toEqual(
        put(
          verifyingCertificateIssuerFailure({
            error: errorMsg,
            certificate: certData
          })
        )
      );
      const isSagaFinished = issuerSaga.next().done;

      expect(isSagaFinished).toBe(true);
    });

    it("should put verifyingCertificateIssuerSuccess on success", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereAreMultipleEthereumAddressIssuers();
      const resolverReturnValue = ["test store", "test store 2"];
      const issuerSaga = verifyCertificateIssuer({ certificate: testCert });

      expect(issuerSaga.next().value).toEqual(
        call(lookupEthereumAddresses, ethereumAddresses)
      );
      const resolvedPut = issuerSaga.next(resolverReturnValue).value;

      expect(resolvedPut).toEqual(
        put(verifyingCertificateIssuerSuccess(resolverReturnValue))
      );
      const isSagaFinished = issuerSaga.next().done;

      expect(isSagaFinished).toBe(true);
    });

    it("should put verifyingCertificateIssuerFailure on failure", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereAreMultipleEthereumAddressIssuers();
      const msg = "bam!";
      const issuerSaga = verifyCertificateIssuer({ certificate: testCert });
      const certData = certificateData(testCert);

      expect(issuerSaga.next().value).toEqual(
        call(lookupEthereumAddresses, ethereumAddresses)
      );
      const resolvedPut = issuerSaga.throw(new Error(msg)).value;

      expect(resolvedPut).toEqual(
        put(
          verifyingCertificateIssuerFailure({
            error: msg,
            certificate: certData
          })
        )
      );
      const isSagaFinished = issuerSaga.next().done;

      expect(isSagaFinished).toBe(true);
    });
  });

  describe("analytics*", () => {
    beforeEach(() => {
      global.window.ga = sinon.stub();
    });

    afterEach(() => {
      global.window.ga = undefined;
    });

    it("analyticsIssuerFail should report to GA with errorType = 0", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereIsOneEthereumAddressIssuer();
      analyticsIssuerFail({ certificate: certificateData(testCert) }).next();

      expect(global.window.ga.args[0]).toEqual([
        "send",
        "event",
        "CERTIFICATE_ERROR",
        ethereumAddresses[0],
        "certificate-id",
        0
      ]);
    });

    it("analyticsHashFail should report to GA with errorType = 1", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereIsOneEthereumAddressIssuer();
      analyticsHashFail({ certificate: certificateData(testCert) }).next();

      expect(global.window.ga.args[0]).toEqual([
        "send",
        "event",
        "CERTIFICATE_ERROR",
        ethereumAddresses[0],
        "certificate-id",
        1
      ]);
    });

    it("analyticsIssuedFail should report to GA with errorType = 2", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereIsOneEthereumAddressIssuer();
      analyticsIssuedFail({ certificate: certificateData(testCert) }).next();

      expect(global.window.ga.args[0]).toEqual([
        "send",
        "event",
        "CERTIFICATE_ERROR",
        ethereumAddresses[0],
        "certificate-id",
        2
      ]);
    });

    it("analyticsRevocationFail should report to GA with errorType = 3", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereIsOneEthereumAddressIssuer();
      analyticsRevocationFail({
        certificate: certificateData(testCert)
      }).next();

      expect(global.window.ga.args[0]).toEqual([
        "send",
        "event",
        "CERTIFICATE_ERROR",
        ethereumAddresses[0],
        "certificate-id",
        3
      ]);
    });
  });

  describe("getIntermediateHashes", () => {
    it("should return targetHash only if there is no proof", () => {
      expect(getIntermediateHashes(targetHash)).toEqual([`0x${targetHash}`]);
    });
    it("should return all intermediate (and final) hash", () => {
      const intermediateHashes = getIntermediateHashes(targetHash, [
        proof0,
        proof1
      ]);
      expect(intermediateHashes.length).toBe(3);
      expect(intermediateHashes[0]).toEqual(`0x${targetHash}`);
      expect(intermediateHashes[2]).toEqual(`0x${rootHash}`);
    });
  });

  describe("verifyCertificateNotRevoked", () => {
    it("should return true and put success action if all the store returns false for all hashes", () => {
      const certificateStores = [mockStore(), mockStore(), mockStore()];
      const { testCert: certificate } = whenThereIsOneEthereumAddressIssuer();

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
        [`0x${targetHash}`],
        [`0x${intermediateHash}`],
        [`0x${rootHash}`]
      ];
      expect(certificateStores[0].stub.args).toEqual(hashCheckSequence);
      expect(certificateStores[1].stub.args).toEqual(hashCheckSequence);
      expect(certificateStores[2].stub.args).toEqual(hashCheckSequence);

      expect(doneWithVerification.value).toEqual(
        put(verifyingCertificateRevocationSuccess())
      );

      const generatorEnd = generator.next();
      expect(generatorEnd.value).toBe(true);
      expect(generatorEnd.done).toBe(true);
    });

    it("should return false and put failure action if any of the store returns true for the check", () => {
      const certificateStores = [mockStore(), mockStore(), mockStore()];
      const { testCert: certificate } = whenThereIsOneEthereumAddressIssuer();

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
      const doneWithVerification = generator.next([false, true, false]);

      // Assert that hashes is checked against all stores
      const hashCheckSequence = [
        [`0x${targetHash}`],
        [`0x${intermediateHash}`],
        [`0x${rootHash}`]
      ];
      expect(certificateStores[0].stub.args).toEqual(hashCheckSequence);
      expect(certificateStores[1].stub.args).toEqual(hashCheckSequence);
      expect(certificateStores[2].stub.args).toEqual(hashCheckSequence);

      expect(doneWithVerification.value).toEqual(
        put(
          verifyingCertificateRevocationFailure({
            certificate: certificateData(certificate),
            error:
              "Certificate has been revoked, revoked hash: 0xfcfce0e79adc002c1fd78a2a02c768c0fdc00e5b96f1da8ef80bed02876e18d1"
          })
        )
      );

      const generatorEnd = generator.next();
      expect(generatorEnd.value).toBe(false);
      expect(generatorEnd.done).toBe(true);
    });
  });

  describe("verifyCertificateHash", () => {
    beforeEach(() => {
      sinon.stub(openCertsApi, "verifySignature");
    });
    afterEach(() => {
      openCertsApi.verifySignature.restore();
    });
    it("should return true when verification is successful", () => {
      openCertsApi.verifySignature.returns(true);
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const generator = verifyCertificateHash({ certificate: testCert });
      expect(generator.next().value).toEqual(
        put(verifyingCertificateHashSuccess())
      );
      const res = generator.next();
      expect(res.value).toBe(true);
      expect(res.done).toBe(true);
    });

    it("should return false and puts verifyingCertificateHashFailure when verification fails", () => {
      openCertsApi.verifySignature.returns(false);
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const generator = verifyCertificateHash({ certificate: testCert });
      expect(generator.next().value).toEqual(
        put(
          verifyingCertificateHashFailure({
            certificate: certificateData(testCert),
            error: "Certificate data does not match target hash"
          })
        )
      );
      expect(generator.next().done).toBe(true);
    });
  });

  describe("verifyCertificateIssued", () => {
    it("should return true and puts success action when certificate is issued on all stores", () => {
      const certificateStores = [mockStore(), mockStore()];
      const { testCert: certificate } = whenThereIsOneEthereumAddressIssuer();
      const generator = verifyCertificateIssued({
        certificate,
        certificateStores
      });

      generator.next();

      expect(generator.next([true, true]).value).toEqual(
        put(verifyingCertificateIssuedSuccess())
      );

      const res = generator.next();
      expect(res.value).toBe(true);
      expect(res.done).toBe(true);
    });

    it("should return false and puts success action when certificate is not issued on any stores", () => {
      const certificateStores = [mockStore(), mockStore()];
      const { testCert: certificate } = whenThereIsOneEthereumAddressIssuer();
      const generator = verifyCertificateIssued({
        certificate,
        certificateStores
      });

      generator.next();

      expect(generator.next([true, false]).value).toEqual(
        put(
          verifyingCertificateIssuedFailure({
            certificate: certificateData(certificate),
            error: "Certificate has not been issued"
          })
        )
      );

      const res = generator.next();
      expect(res.value).toBe(false);
      expect(res.done).toBe(true);
    });
  });
});
