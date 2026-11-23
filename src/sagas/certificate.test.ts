import { captureException, captureMessage } from "@sentry/nextjs";
import { runSaga } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { getCertificate } from "../reducers/certificate.selectors";
import { sendCertificateFailure, sendCertificateSuccess } from "../reducers/certificate.slice";
import { sendEmail } from "../services/email";
import { EMAIL_RETRY_LATER_MESSAGE, sendCertificateSaga } from "./certificate";
import { MakeCertUtil } from "./testutils";

jest.mock("@trustvc/trustvc", () => {
  // Require the original module to not be mocked...
  const originalModule = jest.requireActual("@trustvc/trustvc");

  return {
    __esModule: true,
    ...originalModule,
    verifySignature: jest.fn(),
  };
});

jest.mock("@sentry/nextjs", () => ({
  ...jest.requireActual("@sentry/nextjs"),
  captureException: jest.fn(),
  captureMessage: jest.fn(),
}));

// Everything the app logs through utils/logger lands in one recorder, so the leak check can read it.
jest.mock("../utils/logger", () => {
  const log = jest.fn();
  return { getLogger: () => ({ trace: log, error: log }), trace: () => log, error: () => log, mockLog: log };
});

const mockCaptureMessage = captureMessage as jest.MockedFunction<typeof captureMessage>;
const mockCaptureException = captureException as jest.MockedFunction<typeof captureException>;
const { mockLog } = jest.requireMock("../utils/logger") as { mockLog: jest.Mock };

function whenThereIsOneEthereumAddressIssuer() {
  const ethereumAddresses = ["0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F"];
  const testCert = new MakeCertUtil().addIssuer(ethereumAddresses[0]).finish();
  return { testCert, ethereumAddresses };
}

// A fetch Response stand-in: just the status and a body read through text(), which is all sendEmail uses.
const response = (status: number, body: unknown = "") =>
  Promise.resolve({ status, text: async () => (typeof body === "string" ? body : JSON.stringify(body)) });

const runSendCertificate = async ({ email, certificate }: { email: string; certificate: unknown }) => {
  const dispatched: unknown[] = [];
  await runSaga(
    {
      dispatch: (action: unknown) => {
        dispatched.push(action);
      },
      getState: () => ({ certificate: { rawModified: certificate } }),
    },
    sendCertificateSaga,
    { payload: { email, captcha: "ABCD" } }
  ).toPromise();
  return dispatched;
};

interface FailureCase {
  respond: () => Promise<unknown>;
  status: string;
  reason: string;
  level: "warning" | "error";
  message: string;
}

const FAILURES: [string, FailureCase][] = [
  [
    "400 invalid recipient",
    {
      respond: () => response(400, { error: "Recipient must be a single valid email address", requestId: "r" }),
      status: "400",
      reason: "invalid_recipient",
      level: "warning",
      message: "Please enter a single valid email address.",
    },
  ],
  [
    "400 invalid captcha",
    {
      respond: () => response(400, { error: "Invalid captcha or missing API key", requestId: "r" }),
      status: "400",
      reason: "invalid_captcha",
      level: "warning",
      message: "The captcha check failed or expired. Please complete the captcha again and retry.",
    },
  ],
  [
    "400 invalid certificate",
    {
      respond: () => response(400, { error: "Invalid certificate", requestId: "r" }),
      status: "400",
      reason: "invalid_certificate",
      level: "warning",
      message: "This certificate could not be verified, so it can't be emailed.",
    },
  ],
  [
    "400 invalid request body",
    {
      respond: () => response(400, { error: "Invalid request body", requestId: "r" }),
      status: "400",
      reason: "invalid_request",
      level: "warning",
      message: EMAIL_RETRY_LATER_MESSAGE,
    },
  ],
  [
    "403 WAF rate limit",
    {
      respond: () => response(403, "<html>Forbidden</html>"),
      status: "403",
      reason: "rate_limited",
      level: "warning",
      message: "Too many emails have been sent from your network. Please wait a few minutes and try again.",
    },
  ],
  [
    "429 gateway throttle",
    {
      respond: () => response(429, { message: "Too Many Requests" }),
      status: "429",
      reason: "rate_limited",
      level: "warning",
      message: "Too many emails have been sent from your network. Please wait a few minutes and try again.",
    },
  ],
  [
    "500 server error",
    {
      respond: () => response(500, { error: "An unexpected error occurred", requestId: "r" }),
      status: "500",
      reason: "server_error",
      level: "error",
      message: EMAIL_RETRY_LATER_MESSAGE,
    },
  ],
  [
    "network error",
    {
      respond: () => Promise.reject(new TypeError("Failed to fetch")),
      status: "null",
      reason: "network_error",
      level: "error",
      message: EMAIL_RETRY_LATER_MESSAGE,
    },
  ],
  [
    "unexpected status",
    {
      respond: () => response(302),
      status: "302",
      reason: "unknown",
      level: "error",
      message: EMAIL_RETRY_LATER_MESSAGE,
    },
  ],
];

describe("sagas/certificate", () => {
  describe("sendCertificate", () => {
    const { testCert } = whenThereIsOneEthereumAddressIssuer();
    const email = "admin@opencerts.io";
    const captcha = "ABCD";
    let fetchStub: jest.SpyInstance;
    // eslint-disable-next-line jest/no-hooks
    beforeEach(() => {
      fetchStub = jest.spyOn(window, "fetch");
    });
    // eslint-disable-next-line jest/no-hooks
    afterEach(() => {
      fetchStub.mockRestore();
    });

    it("sends the selected certificate with the email and captcha, then puts success", () => {
      const saga = sendCertificateSaga({ payload: { email, captcha } });

      expect(saga.next().value).toStrictEqual(select(getCertificate));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(saga.next(testCert).value).toStrictEqual(call(sendEmail, { certificate: testCert, email, captcha }));
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      expect(saga.next({ ok: true }).value).toStrictEqual(put(sendCertificateSuccess()));
      expect(saga.next().done).toBe(true);
    });

    it("puts success and reports nothing to Sentry when the API returns 200", async () => {
      fetchStub.mockImplementation(() => response(200, { success: true }));

      await expect(runSendCertificate({ email, certificate: testCert })).resolves.toStrictEqual([
        sendCertificateSuccess(),
      ]);
      expect(mockCaptureMessage).not.toHaveBeenCalled();
      expect(mockCaptureException).not.toHaveBeenCalled();
    });

    it.each(FAILURES)(
      "on %s puts its user message and reports status and reason only",
      async (_label, { respond, status, reason, level, message }) => {
        fetchStub.mockImplementation(respond);

        await expect(runSendCertificate({ email, certificate: testCert })).resolves.toStrictEqual([
          sendCertificateFailure(message),
        ]);
        expect(mockCaptureMessage).toHaveBeenCalledTimes(1);
        expect(mockCaptureMessage).toHaveBeenCalledWith("Email certificate failed", {
          level,
          tags: { saga: "sendCertificate", email_status: status, email_reason: reason },
          fingerprint: ["opencerts-email-failed", reason],
        });
        expect(mockCaptureException).not.toHaveBeenCalled();
      }
    );

    it("gives each actionable failure its own message, distinct from the generic one", () => {
      const messages = ["invalid_recipient", "invalid_captcha", "invalid_certificate", "rate_limited"].map(
        (reason) => FAILURES.find(([, failure]) => failure.reason === reason)?.[1].message
      );
      expect(new Set([...messages, EMAIL_RETRY_LATER_MESSAGE]).size).toBe(5);
    });

    it("captures an exception without any payload and shows the generic message when there is no certificate", async () => {
      await expect(runSendCertificate({ email, certificate: null })).resolves.toStrictEqual([
        sendCertificateFailure(EMAIL_RETRY_LATER_MESSAGE),
      ]);
      expect(fetchStub).not.toHaveBeenCalled();
      expect(mockCaptureException).toHaveBeenCalledTimes(1);
      expect(mockCaptureException).toHaveBeenCalledWith(new Error("No certificate"), {
        tags: { saga: "sendCertificate" },
      });
      expect(mockCaptureMessage).not.toHaveBeenCalled();
    });

    it("captures an unexpected exception without any payload and shows the generic message", async () => {
      const certificate: Record<string, unknown> = { ...testCert };
      certificate.self = certificate; // cannot be serialised into the request body

      await expect(runSendCertificate({ email, certificate })).resolves.toStrictEqual([
        sendCertificateFailure(EMAIL_RETRY_LATER_MESSAGE),
      ]);
      expect(fetchStub).not.toHaveBeenCalled();
      expect(mockCaptureException).toHaveBeenCalledTimes(1);
      expect(mockCaptureException).toHaveBeenCalledWith(expect.any(TypeError), { tags: { saga: "sendCertificate" } });
      expect(mockCaptureMessage).not.toHaveBeenCalled();
    });

    describe("never leaks the recipient address", () => {
      const LEAK_EMAIL = "leak-check-isa5@example.com";
      const LEAK_LOCAL_PART = "leak-check-isa5";
      const CONSOLE_METHODS = ["log", "info", "warn", "error", "debug", "trace"] as const;
      let consoleSpies: jest.SpyInstance[];
      // eslint-disable-next-line jest/no-hooks
      beforeEach(() => {
        consoleSpies = CONSOLE_METHODS.map((method) => jest.spyOn(console, method).mockImplementation(() => undefined));
      });
      // eslint-disable-next-line jest/no-hooks
      afterEach(() => {
        consoleSpies.forEach((spy) => spy.mockRestore());
      });

      // Errors serialise to "{}" by default, which would hide a leak in a message or stack.
      const serialise = (value: unknown) =>
        JSON.stringify(value, (_key, v) =>
          v instanceof Error ? { name: v.name, message: v.message, stack: v.stack } : v
        );

      const recorded = () =>
        serialise({
          captureMessage: mockCaptureMessage.mock.calls,
          captureException: mockCaptureException.mock.calls,
          logger: mockLog.mock.calls,
          console: consoleSpies.map((spy) => spy.mock.calls),
        });

      const circular: Record<string, unknown> = { ...testCert };
      circular.self = circular;

      // [label, fetch behaviour, certificate in the store, Sentry reports expected]
      type LeakPath = [string, () => Promise<unknown>, unknown, number];
      const PATHS: LeakPath[] = [
        ...FAILURES.map(([label, { respond }]): LeakPath => [label, respond, testCert, 1]),
        [
          "400 whose API message echoes the recipient",
          () => response(400, { error: `Recipient ${LEAK_EMAIL} rejected`, requestId: "r" }),
          testCert,
          1,
        ],
        [
          "500 whose API message echoes the recipient",
          () => response(500, { error: `Failed for ${LEAK_EMAIL}`, requestId: "r" }),
          testCert,
          1,
        ],
        ["no certificate", () => response(200), null, 1],
        ["unexpected exception", () => response(200), circular, 1],
        ["success", () => response(200, { success: true }), testCert, 0],
      ];

      it.each(PATHS)("on %s", async (_label, respond, certificate, reports) => {
        fetchStub.mockImplementation(respond);

        const dispatched = await runSendCertificate({ email: LEAK_EMAIL, certificate });

        // every failure path did report to Sentry, so the check below is not vacuous
        expect(mockCaptureMessage.mock.calls.length + mockCaptureException.mock.calls.length).toBe(reports);
        expect(recorded()).not.toContain(LEAK_LOCAL_PART);
        // the message shown to the user is ours, never the API's text
        expect(serialise(dispatched)).not.toContain(LEAK_LOCAL_PART);
      });
    });
  });
});
