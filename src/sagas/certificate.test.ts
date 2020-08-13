import { OpenAttestationDocument, IdentityProofType } from "@govtechsg/open-attestation/dist/types/__generated__/schemaV2";
import { call, put, select } from "redux-saga/effects";
import { getCertificate } from "../reducers/certificate.selectors";
import { sendCertificate, getCertificateDetails, triggerErrorLogging } from "./certificate";
import { MakeCertUtil } from "./testutils";

jest.mock("@govtechsg/open-attestation", () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual("@govtechsg/open-attestation");

  return {
    __esModule: true,
    ...originalModule,
    verifySignature: jest.fn(),
  };
});

interface Window {
  ga: UniversalAnalytics.ga;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface Global {
      document: Document;
      window: Window;
      navigator: Navigator;
    }
  }
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function whenThereIsOneEthereumAddressIssuer() {
  const ethereumAddresses = ["0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F"];
  const testCert = new MakeCertUtil().addIssuer(ethereumAddresses[0]).finish();
  return { testCert, ethereumAddresses };
}

describe("sagas/certificate", () => {
  describe("sendCertificate", () => {
    let fetchStub: jest.SpyInstance;
    // eslint-disable-next-line jest/no-hooks
    beforeEach(() => {
      fetchStub = jest.spyOn(window, "fetch");
    });
    // eslint-disable-next-line jest/no-hooks
    afterEach(() => {
      fetchStub.mockRestore();
    });
    it("should put SENDING_CERTIFICATE_SUCCESS on success", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const saga = sendCertificate({ payload: { email, captcha } });
      fetchStub.mockResolvedValue({ status: 200 });

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      saga.next(testCert);
      expect(saga.next(true).value).toStrictEqual(
        put({
          type: "SENDING_CERTIFICATE_SUCCESS",
        })
      );
      expect(saga.next().done).toBe(true);
    });

    it("should put SENDING_CERTIFICATE_SUCCESS on failure", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const saga = sendCertificate({ payload: { email, captcha } });
      fetchStub.mockResolvedValue({ status: 200 });

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      saga.next(testCert);
      expect(saga.next(false).value).toStrictEqual(
        put({
          type: "SENDING_CERTIFICATE_FAILURE",
          payload: "Fail to send certificate",
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
      fetchStub.mockResolvedValue({ status: 200 });

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      saga.next(testCert);
      expect(saga.throw(new Error(errorMsg)).value).toStrictEqual(
        put({
          type: "SENDING_CERTIFICATE_FAILURE",
          payload: errorMsg,
        })
      );
      expect(saga.next().done).toBe(true);
    });
  });

  describe("analytics*", () => {
    // eslint-disable-next-line jest/no-hooks
    beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line jest/prefer-spy-on
      window.ga = jest.fn();
    });
    // eslint-disable-next-line jest/no-hooks
    afterEach(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      // eslint-disable-next-line jest/prefer-spy-on
      window.ga = undefined;
    });

    describe("triggerErrorLogging", () => {
      it("should get cert details (certificateStore), and send it over to Google Analytics with a CSV list of errors", () => {
        const analyticsGenerator = triggerErrorLogging([
          "CERTIFICATE_HASH", // Document has been tampered, naughty naughty!
          "UNISSUED_CERTIFICATE", // Document isn't issued by the given store
          "REVOKED_CERTIFICATE", // Document has been revoked by the given store
        ]);

        const callGetCertificateDetails = analyticsGenerator.next();
        expect(callGetCertificateDetails.value).toStrictEqual(call(getCertificateDetails));

        const certificate: OpenAttestationDocument = {
          id: "MyAwesomeCertID",
          issuers: [
            {
              name: "SEAB",
              certificateStore: "0xE4a94Ef9C26904A02Cd6735F7D4De1D840146a0f",
            },
          ],
        };
        analyticsGenerator.next(certificate);
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(window.ga).toHaveBeenCalledWith(
          "send",
          "event",
          "CERTIFICATE_ERROR",
          "ERROR - Singapore Examinations and Assessment Board",
          "CERTIFICATE_HASH,UNISSUED_CERTIFICATE,REVOKED_CERTIFICATE",
          undefined,
          {
            dimension1: "0xE4a94Ef9C26904A02Cd6735F7D4De1D840146a0f",
            dimension2: "MyAwesomeCertID",
            dimension3: "(not set)",
            dimension4: "(not set)",
            dimension5: "Singapore Examinations and Assessment Board",
            dimension6: "seab-registry",
            dimension7: "CERTIFICATE_HASH,UNISSUED_CERTIFICATE,REVOKED_CERTIFICATE",
            nonInteraction: true,
          }
        );
      });
      it("should get cert details (documentStore/DNS-TXT), and send it over to Google Analytics with a CSV list of errors", () => {
        const analyticsGenerator = triggerErrorLogging([
          "CERTIFICATE_HASH", // Document has been tampered, naughty naughty!
          "UNISSUED_CERTIFICATE", // Document isn't issued by the given store
          "REVOKED_CERTIFICATE", // Document has been revoked by the given store
        ]);

        const callGetCertificateDetails = analyticsGenerator.next();
        expect(callGetCertificateDetails.value).toStrictEqual(call(getCertificateDetails));

        const certificate: OpenAttestationDocument = {
          id: "MyAwesomeCertID",
          issuers: [
            {
              name: "My Awesome Document Store",
              documentStore: "0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
              identityProof: {
                type: IdentityProofType.DNSTxt,
                location: "example.openattestation.com",
              },
            },
          ],
        };
        analyticsGenerator.next(certificate);
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        expect(window.ga).toHaveBeenCalledWith(
          "send",
          "event",
          "CERTIFICATE_ERROR",
          "ERROR - example.openattestation.com",
          "CERTIFICATE_HASH,UNISSUED_CERTIFICATE,REVOKED_CERTIFICATE",
          undefined,
          {
            dimension1: "0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
            dimension2: "MyAwesomeCertID",
            dimension3: "(not set)",
            dimension4: "(not set)",
            dimension5: "example.openattestation.com",
            dimension6: "(not set)",
            dimension7: "CERTIFICATE_HASH,UNISSUED_CERTIFICATE,REVOKED_CERTIFICATE",
            nonInteraction: true,
          }
        );
      });
    });
  });
});
