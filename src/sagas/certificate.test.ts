import Router from "next/router";
import { runSaga, stdChannel } from "redux-saga";
import { all, put, select } from "redux-saga/effects";
import {
  CERTIFICATE_VERIFICATION_GENERIC_MESSAGE,
  CERTIFICATE_VERIFICATION_NETWORK_MESSAGE,
} from "../constants/verificationMessages";
import { getCertificate } from "../reducers/certificate.selectors";
import {
  sendCertificateFailure,
  sendCertificateSuccess,
  updateCertificate,
  verifyingCertificateCompleted,
  verifyingCertificateErrored,
} from "../reducers/certificate.slice";
import { sagas, sendCertificateSaga, verifyCertificateSaga } from "./certificate";
import { MakeCertUtil } from "./testutils";

jest.mock("next/router", () => ({
  __esModule: true,
  default: {
    prefetch: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
  },
}));

const pendingVerifications: Array<(fragments: unknown) => void> = [];

jest.mock("@trustvc/trustvc", () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual("@trustvc/trustvc");

  return {
    __esModule: true,
    ...originalModule,
    verifySignature: jest.fn(),
    verificationBuilder: jest.fn(
      () => () =>
        new Promise((resolve) => {
          pendingVerifications.push(resolve);
        })
    ),
  };
});

function whenThereIsOneEthereumAddressIssuer() {
  const ethereumAddresses = ["0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F"];
  const testCert = new MakeCertUtil().addIssuer(ethereumAddresses[0]).finish();
  return { testCert, ethereumAddresses };
}

const validFragments = [
  { name: "OpenAttestationHash", type: "DOCUMENT_INTEGRITY", status: "VALID" },
  { name: "OpenAttestationEthereumDocumentStoreStatus", type: "DOCUMENT_STATUS", status: "VALID" },
  { name: "OpenAttestationDnsTxtIdentityProof", type: "ISSUER_IDENTITY", status: "VALID" },
];

describe("sagas/certificate", () => {
  it("cancels an older verification so only the latest certificate opens the viewer", async () => {
    pendingVerifications.length = 0;
    const channel = stdChannel();
    const dispatched: { type: string }[] = [];
    const task = runSaga(
      {
        channel,
        dispatch: (action) => {
          dispatched.push(action as { type: string });
        },
        getState: () => ({}),
      },
      function* watchVerifications() {
        yield all(sagas);
      }
    );

    const first = new MakeCertUtil().addIssuer("0xaaa").addDataField("id", "certificate-a").finish();
    const second = new MakeCertUtil().addIssuer("0xbbb").addDataField("id", "certificate-b").finish();
    channel.put(updateCertificate(first));
    await Promise.resolve();
    channel.put(updateCertificate(second));
    await Promise.resolve();

    pendingVerifications[0](validFragments);
    await Promise.resolve();

    expect(dispatched.filter((action) => action.type === verifyingCertificateCompleted.type)).toHaveLength(0);
    expect(Router.push).not.toHaveBeenCalled();

    pendingVerifications[1](validFragments);
    await Promise.resolve();

    expect(dispatched.filter((action) => action.type === verifyingCertificateCompleted.type)).toHaveLength(1);
    expect(Router.push).toHaveBeenCalledTimes(1);
    expect(Router.push).toHaveBeenCalledWith("/viewer");
    task.cancel();
  });

  it("stores the network message for a provider failure and leaves the raw error out", () => {
    const saga = verifyCertificateSaga({
      payload: new MakeCertUtil().addIssuer("0xaaa").finish(),
    });
    saga.next();

    expect(saga.throw(new Error("missing response (url=https://mainnet.infura.io/v3/secret)")).value).toStrictEqual(
      put(verifyingCertificateErrored(CERTIFICATE_VERIFICATION_NETWORK_MESSAGE))
    );
  });

  it("stores a generic message when verification fails for a non-network reason", () => {
    const saga = verifyCertificateSaga({
      payload: new MakeCertUtil().addIssuer("0xaaa").finish(),
    });
    saga.next();

    expect(saga.throw(new Error("Cannot read properties of undefined (reading 'proof')")).value).toStrictEqual(
      put(verifyingCertificateErrored(CERTIFICATE_VERIFICATION_GENERIC_MESSAGE))
    );
  });

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
