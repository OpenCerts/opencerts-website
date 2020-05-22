import { call, put, select } from "redux-saga/effects";
import sinon, { SinonStub } from "sinon";
import { getCertificate } from "../reducers/certificate.selectors";
import * as sendEmail from "../services/email";
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let emailStub: SinonStub<any>;
    // eslint-disable-next-line jest/no-hooks
    beforeEach(() => {
      emailStub = sinon.stub(sendEmail, "default");
    });
    // eslint-disable-next-line jest/no-hooks
    afterEach(() => {
      emailStub.restore();
    });
    it("should put SENDING_CERTIFICATE_SUCCESS on success", () => {
      const { testCert } = whenThereIsOneEthereumAddressIssuer();
      const email = "admin@opencerts.io";
      const captcha = "ABCD";
      const saga = sendCertificate({ payload: { email, captcha } });

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      expect(saga.next(testCert).value).toStrictEqual(
        emailStub({
          certificate: testCert,
          email,
          captcha,
        })
      );
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

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      expect(saga.next(testCert).value).toStrictEqual(
        emailStub({
          certificate: testCert,
          email,
          captcha,
        })
      );
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

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      expect(saga.next(testCert).value).toStrictEqual(
        emailStub({
          certificate: testCert,
          email,
          captcha,
        })
      );
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
      global.window.ga = sinon.stub();
    });

    // eslint-disable-next-line jest/no-hooks
    afterEach(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      global.window.ga = undefined;
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
      expect(global.window.ga.args[0]).toStrictEqual([
        "send",
        "event",
        "CERTIFICATE_ERROR",
        "storeAdd1,storeAdd2",
        "certificate-id",
        1337,
      ]);
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
