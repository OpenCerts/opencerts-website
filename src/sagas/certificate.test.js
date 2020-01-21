import { call, put, select } from "redux-saga/effects";
import sinon from "sinon";
import {
  analyticsHashFail,
  analyticsIssuedFail,
  analyticsIssuerFail,
  analyticsRevocationFail,
  getAnalyticsDetails,
  sendCertificate,
  triggerAnalytics
} from "./certificate";
import { getCertificate } from "../reducers/certificate";
import { MakeCertUtil } from "./testutils";
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
jest.mock("@govtechsg/dnsprove", () => {
  const originalModule = jest.requireActual("@govtechsg/dnsprove");

  return {
    __esModule: true,
    ...originalModule,
    getDocumentStoreRecords: jest.fn().mockReturnValue([
      {
        addr: "0x0c9d5E6C766030cc6f0f49951D275Ad0701F81E2"
      }
    ])
  };
});
function whenThereIsOneEthereumAddressIssuer() {
  const ethereumAddresses = ["0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F"];
  const testCert = new MakeCertUtil().addIssuer(ethereumAddresses[0]).finish();
  return { testCert, ethereumAddresses };
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

  describe("analytics*", () => {
    beforeEach(() => {
      global.window.ga = sinon.stub();
    });

    afterEach(() => {
      global.window.ga = undefined;
    });

    test("triggerAnalytics should get details and fire the analytics event with correct error code", () => {
      const analyticsGenerator = triggerAnalytics(1337);

      const callGetAnalyticsDetails = analyticsGenerator.next();
      expect(callGetAnalyticsDetails.value).toEqual(call(getAnalyticsDetails));
      analyticsGenerator.next({
        storeAddresses: "storeAdd1,storeAdd2",
        id: "certificate-id"
      });

      expect(global.window.ga.args[0]).toEqual([
        "send",
        "event",
        "CERTIFICATE_ERROR",
        "storeAdd1,storeAdd2",
        "certificate-id",
        1337
      ]);
    });

    test("analyticsIssuerFail should report to GA with errorType = 0", () => {
      const analyticsGenerator = analyticsIssuerFail();

      const callGetAnalyticsDetails = analyticsGenerator.next();
      expect(callGetAnalyticsDetails.value).toEqual(call(triggerAnalytics, 0));
    });

    test("analyticsHashFail should report to GA with errorType = 1", () => {
      const analyticsGenerator = analyticsHashFail();

      const callGetAnalyticsDetails = analyticsGenerator.next();
      expect(callGetAnalyticsDetails.value).toEqual(call(triggerAnalytics, 1));
    });

    test("analyticsIssuedFail should report to GA with errorType = 2", () => {
      const analyticsGenerator = analyticsIssuedFail();

      const callGetAnalyticsDetails = analyticsGenerator.next();
      expect(callGetAnalyticsDetails.value).toEqual(call(triggerAnalytics, 2));
    });

    test("analyticsRevocationFail should report to GA with errorType = 3", () => {
      const analyticsGenerator = analyticsRevocationFail();

      const callGetAnalyticsDetails = analyticsGenerator.next();
      expect(callGetAnalyticsDetails.value).toEqual(call(triggerAnalytics, 3));
    });
  });
});
