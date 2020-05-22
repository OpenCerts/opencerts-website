import { call, put, select } from "redux-saga/effects";
import { getCertificate } from "../reducers/certificate.selectors";
import {
  analyticsHashFail,
  analyticsIssuedFail,
  analyticsIssuerFail,
  analyticsRevocationFail,
  getAnalyticsDetails,
  sendCertificate,
  triggerAnalytics,
} from "./certificate";
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

    it("triggerAnalytics should get details and fire the analytics event with correct error code", () => {
      const analyticsGenerator = triggerAnalytics(1337);

      const callGetAnalyticsDetails = analyticsGenerator.next();
      expect(callGetAnalyticsDetails.value).toStrictEqual(call(getAnalyticsDetails));
      analyticsGenerator.next({
        storeAddresses: "storeAdd1,storeAdd2",
        id: "certificate-id",
      });

      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      expect(window.ga).toHaveBeenCalledWith(
        "send",
        "event",
        "CERTIFICATE_ERROR",
        "storeAdd1,storeAdd2",
        "certificate-id",
        1337
      );
    });

    it("analyticsIssuerFail should report to GA with errorType = 0", () => {
      const analyticsGenerator = analyticsIssuerFail();

      const callGetAnalyticsDetails = analyticsGenerator.next();
      expect(callGetAnalyticsDetails.value).toStrictEqual(call(triggerAnalytics, 0));
    });

    it("analyticsHashFail should report to GA with errorType = 1", () => {
      const analyticsGenerator = analyticsHashFail();

      const callGetAnalyticsDetails = analyticsGenerator.next();
      expect(callGetAnalyticsDetails.value).toStrictEqual(call(triggerAnalytics, 1));
    });

    it("analyticsIssuedFail should report to GA with errorType = 2", () => {
      const analyticsGenerator = analyticsIssuedFail();

      const callGetAnalyticsDetails = analyticsGenerator.next();
      expect(callGetAnalyticsDetails.value).toStrictEqual(call(triggerAnalytics, 2));
    });

    it("analyticsRevocationFail should report to GA with errorType = 3", () => {
      const analyticsGenerator = analyticsRevocationFail();

      const callGetAnalyticsDetails = analyticsGenerator.next();
      expect(callGetAnalyticsDetails.value).toStrictEqual(call(triggerAnalytics, 3));
    });
  });
});
