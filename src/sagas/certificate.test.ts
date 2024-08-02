import { put, select } from "redux-saga/effects";
import { getCertificate } from "../reducers/certificate.selectors";
import { sendCertificateFailure, sendCertificateSuccess } from "../reducers/certificate.slice";
import { sendCertificateSaga } from "./certificate";
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
      const saga = sendCertificateSaga({ payload: { email, captcha } });
      fetchStub.mockResolvedValue({ status: 200 });

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      saga.next(testCert);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(saga.next(true).value).toStrictEqual(put(sendCertificateSuccess()));
      expect(saga.next().done).toBe(true);
    });

    it("should put SENDING_CERTIFICATE_SUCCESS on failure", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const saga = sendCertificateSaga({ payload: { email, captcha } });
      fetchStub.mockResolvedValue({ status: 200 });

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      saga.next(testCert);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(saga.next(false).value).toStrictEqual(put(sendCertificateFailure("Fail to send certificate")));
      expect(saga.next().done).toBe(true);
    });

    it("should put SENDING_CERTIFICATE_SUCCESS on error", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const errorMsg = "Some unknown error has occured";
      const saga = sendCertificateSaga({ payload: { email, captcha } });
      fetchStub.mockResolvedValue({ status: 200 });

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      saga.next(testCert);
      expect(saga.throw(new Error(errorMsg)).value).toStrictEqual(put(sendCertificateFailure(errorMsg)));
      expect(saga.next().done).toBe(true);
    });
  });
});
