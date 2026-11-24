import { captureException, captureMessage } from "@sentry/nextjs";
import { runSaga } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { getCertificate } from "../reducers/certificate.selectors";
import { sendCertificateFailure, sendCertificateSuccess } from "../reducers/certificate.slice";
import { type EmailFailureReason, sendEmail } from "../services/email";
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

// A fetch Response stand-in: just ok, the status and a body read through text(), which is all sendEmail uses.
const response = (status: number, body: unknown = "") =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
  });

// The API rejecting with its usual { error, requestId } body.
const apiError = (status: number, error: unknown) => () => response(status, { error, requestId: "r" });

// How a send ends: how fetch answers (the real sendEmail then classifies it), or, for a result sendEmail
// itself can't produce, what the saga is handed in its place.
type Answer = (() => Promise<unknown>) | { sendEmailResult: unknown };

const runSendCertificate = async ({
  email,
  certificate,
  sendEmailResult,
}: {
  email: string;
  certificate: unknown;
  sendEmailResult?: unknown;
}) => {
  const dispatched: unknown[] = [];
  await runSaga(
    {
      dispatch: (action: unknown) => {
        dispatched.push(action);
      },
      getState: () => ({ certificate: { rawModified: certificate } }),
      // With sendEmailResult, the call to sendEmail resolves to it instead of running.
      effectMiddlewares: [
        (next) => (effect) => next(sendEmailResult && effect?.payload?.fn === sendEmail ? sendEmailResult : effect),
      ],
    },
    sendCertificateSaga,
    { payload: { email, captcha: "ABCD" } }
  ).toPromise();
  return dispatched;
};

// The page has just shown the certificate as verified, so these must not suggest it isn't.
const DOWNLOAD_INSTEAD = "We couldn't email this certificate right now. You can still download it.";

// The Sentry level and the message shown to the user, for each failure reason.
const EXPECTED_BY_REASON: Record<EmailFailureReason, { level: "warning" | "error"; message: string }> = {
  invalid_recipient: { level: "warning", message: "Please enter a single valid email address." },
  invalid_captcha: {
    level: "warning",
    message: "The captcha check failed or expired. Please complete the captcha again and retry.",
  },
  invalid_certificate: { level: "error", message: DOWNLOAD_INSTEAD },
  verification_unavailable: { level: "error", message: DOWNLOAD_INSTEAD },
  missing_document: { level: "error", message: DOWNLOAD_INSTEAD },
  rate_limited: {
    level: "warning",
    message: "Too many emails have been sent from your network. Please wait a few minutes and try again.",
  },
  invalid_request: { level: "warning", message: EMAIL_RETRY_LATER_MESSAGE },
  server_error: { level: "error", message: EMAIL_RETRY_LATER_MESSAGE },
  network_error: { level: "error", message: EMAIL_RETRY_LATER_MESSAGE },
  unknown: { level: "error", message: EMAIL_RETRY_LATER_MESSAGE },
};

// The `error` in a 400's body and the reason it is reported as. Object.prototype names and non-strings
// aren't messages the API sends, so they are just an invalid request.
const API_400_ERRORS: [unknown, EmailFailureReason][] = [
  ["Recipient must be a single valid email address", "invalid_recipient"],
  ["Invalid captcha or missing API key", "invalid_captcha"],
  ["Invalid certificate", "invalid_certificate"],
  ["Invalid document", "verification_unavailable"],
  ["Missing document", "missing_document"],
  ["Invalid request body", "invalid_request"],
  ["constructor", "invalid_request"],
  ["toString", "invalid_request"],
  ["__proto__", "invalid_request"],
  ["hasOwnProperty", "invalid_request"],
  [123, "invalid_request"],
];

// [label, how the send ends, expected email_status tag, expected email_reason tag]
type FailureCase = [string, Answer, string, EmailFailureReason];
const FAILURES: FailureCase[] = [
  ...API_400_ERRORS.map(
    ([error, reason]): FailureCase => [`400 with error ${JSON.stringify(error)}`, apiError(400, error), "400", reason]
  ),
  ["403 WAF rate limit", () => response(403, "<html>Forbidden</html>"), "403", "rate_limited"],
  ["429 gateway throttle", () => response(429, { message: "Too Many Requests" }), "429", "rate_limited"],
  ["500 server error", apiError(500, "An unexpected error occurred"), "500", "server_error"],
  ["network error", () => Promise.reject(new TypeError("Failed to fetch")), "null", "network_error"],
  ["unexpected status", () => response(302), "302", "unknown"],
  // sendEmail can't return these, but the saga must not trust that: a reason it doesn't know (such as an
  // Object.prototype name) is reported and shown as unknown instead of being thrown on.
  ...["constructor", "toString", "__proto__", "hasOwnProperty", 42].map(
    (reason): FailureCase => [
      `sendEmail result with reason ${JSON.stringify(reason)}`,
      { sendEmailResult: { ok: false, status: 400, reason } },
      "400",
      "unknown",
    ]
  ),
];

describe("sagas/certificate", () => {
  describe("sendCertificate", () => {
    const { testCert } = whenThereIsOneEthereumAddressIssuer();
    const email = "admin@opencerts.io";
    const captcha = "ABCD";
    const circular: Record<string, unknown> = { ...testCert };
    circular.self = circular; // cannot be serialised into the request body
    let fetchStub: jest.SpyInstance;
    // eslint-disable-next-line jest/no-hooks
    beforeEach(() => {
      fetchStub = jest.spyOn(window, "fetch");
    });
    // eslint-disable-next-line jest/no-hooks
    afterEach(() => {
      fetchStub.mockRestore();
    });

    type SendOptions = { answer?: Answer; certificate?: unknown; to?: string };
    // Runs the saga for `to` with `certificate` in the store, the send ending as `answer` says, and
    // returns the actions it put.
    const send = ({ answer, certificate = testCert, to = email }: SendOptions) => {
      if (typeof answer === "function") fetchStub.mockImplementation(answer);
      const sendEmailResult = typeof answer === "object" ? answer.sendEmailResult : undefined;
      return runSendCertificate({ email: to, certificate, sendEmailResult });
    };

    // Runs the saga and expects it to put exactly `action`.
    const expectSagaToPut = (options: SendOptions, action: unknown) =>
      expect(send(options)).resolves.toStrictEqual([action]);

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

    it.each([200, 204])("puts success and reports nothing to Sentry when the API returns %i", async (status) => {
      await expectSagaToPut({ answer: () => response(status, { success: true }) }, sendCertificateSuccess());
      expect(mockCaptureMessage).not.toHaveBeenCalled();
      expect(mockCaptureException).not.toHaveBeenCalled();
    });

    it.each(FAILURES)(
      "on %s puts its user message and reports status and reason only",
      async (_label, answer, status, reason) => {
        const { level, message } = EXPECTED_BY_REASON[reason];

        await expectSagaToPut({ answer }, sendCertificateFailure(message));
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
      const actionable = ["invalid_recipient", "invalid_captcha", "invalid_certificate", "rate_limited"] as const;
      const messages = actionable.map((reason) => EXPECTED_BY_REASON[reason].message);
      expect(new Set([...messages, EMAIL_RETRY_LATER_MESSAGE]).size).toBe(5);
    });

    it("has a failure case for every reason", () => {
      expect(new Set(FAILURES.map(([, , , reason]) => reason))).toStrictEqual(new Set(Object.keys(EXPECTED_BY_REASON)));
    });

    it("never tells the user the certificate failed verification", () => {
      expect(Object.values(EXPECTED_BY_REASON).filter(({ message }) => /verif/i.test(message))).toStrictEqual([]);
    });

    // [when, certificate in the store, exception expected in Sentry]
    it.each<[string, unknown, unknown]>([
      ["when there is no certificate", null, new Error("No certificate")],
      ["when the certificate cannot be serialised (unexpected exception)", circular, expect.any(TypeError)],
    ])(
      "captures an exception without any payload and shows the generic message %s",
      async (_when, certificate, exception) => {
        await expectSagaToPut({ certificate }, sendCertificateFailure(EMAIL_RETRY_LATER_MESSAGE));
        expect(fetchStub).not.toHaveBeenCalled();
        expect(mockCaptureException).toHaveBeenCalledTimes(1);
        expect(mockCaptureException).toHaveBeenCalledWith(exception, { tags: { saga: "sendCertificate" } });
        expect(mockCaptureMessage).not.toHaveBeenCalled();
      }
    );

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

      // [label, how the send ends, certificate in the store, Sentry reports expected]
      type LeakPath = [string, Answer, unknown, number];
      const PATHS: LeakPath[] = [
        ...FAILURES.map(([label, answer]): LeakPath => [label, answer, testCert, 1]),
        ["400 whose API message echoes the recipient", apiError(400, `Recipient ${LEAK_EMAIL} rejected`), testCert, 1],
        ["500 whose API message echoes the recipient", apiError(500, `Failed for ${LEAK_EMAIL}`), testCert, 1],
        ["no certificate", () => response(200), null, 1],
        ["unexpected exception", () => response(200), circular, 1],
        ["success", () => response(200, { success: true }), testCert, 0],
      ];

      it.each(PATHS)("on %s", async (_label, answer, certificate, reports) => {
        const dispatched = await send({ answer, certificate, to: LEAK_EMAIL });

        // every failure path did report to Sentry, so the check below is not vacuous
        expect(mockCaptureMessage.mock.calls.length + mockCaptureException.mock.calls.length).toBe(reports);
        expect(recorded()).not.toContain(LEAK_LOCAL_PART);
        // the message shown to the user is ours, never the API's text
        expect(serialise(dispatched)).not.toContain(LEAK_LOCAL_PART);
      });
    });
  });
});
