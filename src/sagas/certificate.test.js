import { put, call, select } from "redux-saga/effects";
import sinon from "sinon";
import * as openAttestation from "@govtechsg/open-attestation";
import {
  verifyCertificateNotRevoked,
  verifyCertificateIssuer,
  verifyCertificateHash,
  verifyCertificateIssued,
  isValidENSDomain,
  resolveEnsNamesToText,
  lookupEthereumAddresses,
  sendCertificate,
  analyticsIssuerFail,
  analyticsHashFail,
  analyticsIssuedFail,
  analyticsRevocationFail,
  getIntermediateHashes,
  verifyCertificateStore
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
  verifyingCertificateHashFailure,
  verifyingCertificateStoreSuccess,
  verifyingCertificateStoreFailure
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

jest.mock("@govtechsg/open-attestation", () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual("@govtechsg/open-attestation");

  return {
    __esModule: true,
    ...originalModule,
    verifySignature: jest.fn()
  };
});
const { getData } = openAttestation;

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

function whenThereIsOneValidCertStoreAddress() {
  const GOVTECH_VALID_CERT_STORE = "0x007d40224f6562461633ccfbaffd359ebb2fc9ba";

  const testCert = new MakeCertUtil()
    .addIssuer(GOVTECH_VALID_CERT_STORE)
    .finish();

  return { testCert, GOVTECH_VALID_CERT_STORE };
}

function whenThereIsOneInvalidCertStoreAddress() {
  const invalidAddress = "0x007d40224f6562461633ccfbaffd359ebb2fc9b";

  const invalidCert = new MakeCertUtil().addIssuer(invalidAddress).finish();

  return { invalidCert, invalidAddress };
}

function whenThereIsWrongSmartContract() {
  const invalidContract = "0x007d40224F6562461633ccFBaffd359EbB2FC9Ba";

  const invalidCert = new MakeCertUtil().addIssuer(invalidContract).finish();

  return { invalidCert, invalidContract };
}

function whenThereAreValidEnsNamesAndEthereumAddresses() {
  const ensNames = [
    "govtech-test.sg.opencerts.eth",
    "govtech-test2.sg.opencerts.eth"
  ];
  const ethereumAddresses = [
    "0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F",
    "0x0096Ca31c87771a2Ed212D4b2E689e712Bd938F9"
  ];

  const testCert = new MakeCertUtil()
    .addIssuer("govtech-test.sg.opencerts.eth")
    .addIssuer("govtech-test2.sg.opencerts.eth")
    .addIssuer("0x007d40224f6562461633ccfbaffd359ebb2fc9ba")
    .addIssuer("0xc36484efa1544c32ffed2e80a1ea9f0dfc517495")
    .finish();

  return { testCert, ensNames, ethereumAddresses };
}

function whenThereIsOneInvalidEnsNameAndOneValidEthereumAddress() {
  const ensName = "aardvark.eth";

  const ethereumAddress = "0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F";

  const invalidCert = new MakeCertUtil()
    .addIssuer(ensName)
    .addIssuer(ethereumAddress)
    .finish();

  return { invalidCert, ensName, ethereumAddress };
}

function whenThereIsOneInvalidEthereumAddressAndOneValidENS() {
  const ensName = "govtech-test.sg.opencerts.eth";

  const ethereumAddress = "0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4";

  const invalidCert = new MakeCertUtil()
    .addIssuer(ensName)
    .addIssuer(ethereumAddress)
    .finish();

  return { invalidCert, ensName, ethereumAddress };
}

function whenThereAreInvalidEnsNameAndEthereumAddress() {
  const ensName = "aardvark.eth";

  const ethereumAddress = "0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4";

  const invalidCert = new MakeCertUtil()
    .addIssuer(ensName)
    .addIssuer(ethereumAddress)
    .finish();

  return { invalidCert, ensName, ethereumAddress };
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
    test("should put SENDING_CERTIFICATE_SUCCESS on success", () => {
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

    test("should put SENDING_CERTIFICATE_SUCCESS on failure", () => {
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

    test("should put SENDING_CERTIFICATE_SUCCESS on error", () => {
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

  describe("verifyCertificateStore", () => {
    describe("single issuer", () => {
      describe("should put a verifying certificate store success when:", () => {
        test("the issuer has a document store contract at its specified ethereum address", () => {
          const { testCert } = whenThereIsOneValidCertStoreAddress();

          const verificationSaga = verifyCertificateStore({
            certificate: testCert
          });

          expect(verificationSaga.next().value).toEqual([]);
          verificationSaga.next();
          expect(verificationSaga.next().value).toEqual(
            put(verifyingCertificateStoreSuccess())
          );

          expect(verificationSaga.next().done).toBe(true);
        });
        test("the issuer has a document store contract at its specified ens address", () => {
          const { testCert, ensNames } = whenThereIsOnlyOneEnsName();

          const verificationSaga = verifyCertificateStore({
            certificate: testCert
          });

          expect(verificationSaga.next().value).toEqual([
            call(isValidENSDomain, ensNames[0])
          ]);

          verificationSaga.next();
          expect(verificationSaga.next().value).toEqual(
            put(verifyingCertificateStoreSuccess())
          );

          expect(verificationSaga.next().done).toBe(true);
        });
      });

      describe("should put a verifying certificate store failure when:", () => {
        test("the certificate issuer's document store has an invalid ethereum address and is not an ens address", () => {
          const { invalidCert } = whenThereIsOneInvalidCertStoreAddress();
          const certData = getData(invalidCert);
          const errorMsg = "Invalid ENS";

          const verificationSaga = verifyCertificateStore({
            certificate: invalidCert
          });

          verificationSaga.next();
          expect(verificationSaga.throw(new Error(errorMsg)).value).toEqual(
            put(
              verifyingCertificateStoreFailure({
                error: errorMsg,
                certificate: certData
              })
            )
          );

          expect(verificationSaga.next().done).toBe(true);
        });

        test("the certificate issuer's document store address has the wrong smart contract", () => {
          const { invalidCert } = whenThereIsWrongSmartContract();
          const certData = getData(invalidCert);
          const errorMsg = "Invalid Smart Contract";

          const verificationSaga = verifyCertificateStore({
            certificate: invalidCert
          });

          verificationSaga.next();
          verificationSaga.next();
          expect(verificationSaga.throw(new Error(errorMsg)).value).toEqual(
            put(
              verifyingCertificateStoreFailure({
                error: errorMsg,
                certificate: certData
              })
            )
          );

          expect(verificationSaga.next().done).toBe(true);
        });
      });
    });

    describe("multiple issuers", () => {
      describe("should put a verifying certificate store success when:", () => {
        test("the issuer has a 1 valid ethereum address and 1 valid ENS", () => {
          const {
            testCert,
            ensNames
          } = whenThereAreValidEnsNamesAndEthereumAddresses();

          const verificationSaga = verifyCertificateStore({
            certificate: testCert
          });

          expect(verificationSaga.next().value).toEqual([
            call(isValidENSDomain, ensNames[0]),
            call(isValidENSDomain, ensNames[1])
          ]);

          verificationSaga.next();
          expect(verificationSaga.next().value).toEqual(
            put(verifyingCertificateStoreSuccess())
          );

          expect(verificationSaga.next().done).toBe(true);
        });
      });
    });

    describe("should put a verifying certificate store failure when:", () => {
      test("the certificate has an invalid ENS but valid ethereum address", () => {
        const {
          invalidCert,
          ensName
        } = whenThereIsOneInvalidEnsNameAndOneValidEthereumAddress();
        const certData = getData(invalidCert);
        const errorMsg = "Invalid ENS";

        const verificationSaga = verifyCertificateStore({
          certificate: invalidCert
        });
        expect(verificationSaga.next().value).toEqual([
          call(isValidENSDomain, ensName)
        ]);
        verificationSaga.next();
        expect(verificationSaga.throw(new Error(errorMsg)).value).toEqual(
          put(
            verifyingCertificateStoreFailure({
              error: errorMsg,
              certificate: certData
            })
          )
        );
        expect(verificationSaga.next().done).toBe(true);
      });
      test("the certificate has an invalid ethereum address but valid ENS", () => {
        const {
          invalidCert,
          ensName,
          ethereumAddress
        } = whenThereIsOneInvalidEthereumAddressAndOneValidENS();
        const certData = getData(invalidCert);
        const errorMsg = "Invalid ENS";

        const verificationSaga = verifyCertificateStore({
          certificate: invalidCert
        });
        expect(verificationSaga.next().value).toEqual([
          call(isValidENSDomain, ensName),
          call(isValidENSDomain, ethereumAddress)
        ]);
        verificationSaga.next();
        expect(verificationSaga.throw(new Error(errorMsg)).value).toEqual(
          put(
            verifyingCertificateStoreFailure({
              error: errorMsg,
              certificate: certData
            })
          )
        );
        expect(verificationSaga.next().done).toBe(true);
      });

      test("the certificate issuer's has an invalid ethereum address and invalid ENS", () => {
        const {
          invalidCert,
          ensName,
          ethereumAddress
        } = whenThereAreInvalidEnsNameAndEthereumAddress();
        const certData = getData(invalidCert);
        const errorMsg = "Invalid ENS";

        const verificationSaga = verifyCertificateStore({
          certificate: invalidCert
        });
        expect(verificationSaga.next().value).toEqual([
          call(isValidENSDomain, ensName),
          call(isValidENSDomain, ethereumAddress)
        ]);
        verificationSaga.next();
        expect(verificationSaga.throw(new Error(errorMsg)).value).toEqual(
          put(
            verifyingCertificateStoreFailure({
              error: errorMsg,
              certificate: certData
            })
          )
        );
        expect(verificationSaga.next().done).toBe(true);
      });
    });
  });

  describe("verifyCertificateIssuer", () => {
    test("should resolve singular issuer ens name", () => {
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

    test("should resolve multiple issuer ens name", () => {
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

    test("should resolve issuer ethereum address", () => {
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

    test("should resolve issuer ethereum address", () => {
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

    test("should throw if there are no issuer identity", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereAreMultipleEthereumAddressIssuers();
      const resolverReturnValue = [];
      const errorMsg = "Issuer identity missing in certificate";
      const certData = getData(testCert);
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

    test("should put verifyingCertificateIssuerSuccess on success", () => {
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

    test("should put verifyingCertificateIssuerFailure on failure", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereAreMultipleEthereumAddressIssuers();
      const msg = "bam!";
      const issuerSaga = verifyCertificateIssuer({ certificate: testCert });
      const certData = getData(testCert);

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

    test("analyticsIssuerFail should report to GA with errorType = 0", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereIsOneEthereumAddressIssuer();
      analyticsIssuerFail({ certificate: getData(testCert) }).next();

      expect(global.window.ga.args[0]).toEqual([
        "send",
        "event",
        "CERTIFICATE_ERROR",
        ethereumAddresses[0],
        "certificate-id",
        0
      ]);
    });

    test("analyticsHashFail should report to GA with errorType = 1", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereIsOneEthereumAddressIssuer();
      analyticsHashFail({ certificate: getData(testCert) }).next();

      expect(global.window.ga.args[0]).toEqual([
        "send",
        "event",
        "CERTIFICATE_ERROR",
        ethereumAddresses[0],
        "certificate-id",
        1
      ]);
    });

    test("analyticsIssuedFail should report to GA with errorType = 2", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereIsOneEthereumAddressIssuer();
      analyticsIssuedFail({ certificate: getData(testCert) }).next();

      expect(global.window.ga.args[0]).toEqual([
        "send",
        "event",
        "CERTIFICATE_ERROR",
        ethereumAddresses[0],
        "certificate-id",
        2
      ]);
    });

    test("analyticsRevocationFail should report to GA with errorType = 3", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereIsOneEthereumAddressIssuer();
      analyticsRevocationFail({
        certificate: getData(testCert)
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
    test("should return targetHash only if there is no proof", () => {
      expect(getIntermediateHashes(targetHash)).toEqual([`0x${targetHash}`]);
    });
    test("should return all intermediate (and final) hash", () => {
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
    test("should return true and put success action if all the store returns false for all hashes", () => {
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

    test("should return false and put failure action if any of the store returns true for the check", () => {
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
            certificate: getData(certificate),
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
      openAttestation.verifySignature.mockClear();
    });
    it("should return true when verification is successful", () => {
      openAttestation.verifySignature.mockReturnValue(true);
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
      openAttestation.verifySignature.mockReturnValue(false);
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const generator = verifyCertificateHash({ certificate: testCert });
      expect(generator.next().value).toEqual(
        put(
          verifyingCertificateHashFailure({
            certificate: getData(testCert),
            error: "Certificate data does not match target hash"
          })
        )
      );
      expect(generator.next().done).toBe(true);
    });
  });

  describe("verifyCertificateIssued", () => {
    test("should return true and puts success action when certificate is issued on all stores", () => {
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

    test("should return false and puts success action when certificate is not issued on any stores", () => {
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
            certificate: getData(certificate),
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
