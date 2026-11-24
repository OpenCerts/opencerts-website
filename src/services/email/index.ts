import "isomorphic-fetch";
import { EMAIL_API_URL } from "../../config";
import { WrappedOrSignedOpenCertsDocument } from "../../shared";

export type EmailFailureReason =
  | "invalid_recipient"
  | "invalid_captcha"
  | "invalid_certificate"
  | "verification_unavailable"
  | "missing_document"
  | "rate_limited"
  | "invalid_request"
  | "server_error"
  | "network_error"
  | "unknown";

export type SendEmailResult =
  | { ok: true }
  // status is null when no response was received (network error / blocked request)
  | { ok: false; status: number | null; reason: EmailFailureReason };

// ClientError messages that opencerts-functions returns with a 400, from its email handler (src/email)
// and its shared verifier (src/shared/verify.js: "Invalid document" when verifying the certificate
// fails on its side, "Missing document" when the request carries none).
// "Invalid API key" is not listed: the website never sends an API key, so seeing it means the request
// itself is wrong, and it falls through to invalid_request like any other unrecognised 400.
// A Map rather than a plain object, so a message such as "constructor" or "__proto__" can't match an
// Object.prototype member.
const CLIENT_ERROR_REASONS = new Map<string, EmailFailureReason>([
  ["Recipient must be a single valid email address", "invalid_recipient"],
  ["Invalid captcha or missing API key", "invalid_captcha"],
  ["Invalid certificate", "invalid_certificate"],
  ["Invalid document", "verification_unavailable"],
  ["Missing document", "missing_document"],
  ["Invalid request body", "invalid_request"],
]);

// Reads the API's `{ error }` message without ever throwing: the body may be empty, not JSON
// (e.g. a WAF or gateway page), or unreadable.
const readApiMessage = async (res: Response): Promise<string | undefined> => {
  try {
    const body: unknown = JSON.parse(await res.text());
    if (body && typeof body === "object" && typeof (body as { error?: unknown }).error === "string") {
      return (body as { error: string }).error;
    }
  } catch (_e) {
    // not JSON or no body; the status alone decides the reason
  }
  return undefined;
};

const reasonFor = (status: number, apiMessage: string | undefined): EmailFailureReason => {
  // AWS WAF rate-based rules block with 403; API Gateway throttling answers 429.
  if (status === 403 || status === 429) return "rate_limited";
  if (status === 400) return (apiMessage && CLIENT_ERROR_REASONS.get(apiMessage)) || "invalid_request";
  if (status >= 400 && status < 500) return "invalid_request";
  if (status >= 500 && status < 600) return "server_error";
  return "unknown";
};

export async function sendEmail({
  certificate,
  email,
  captcha,
}: {
  certificate: WrappedOrSignedOpenCertsDocument;
  email: string;
  captcha: string;
}): Promise<SendEmailResult> {
  const body = JSON.stringify({
    data: certificate,
    to: email,
    captcha,
  });
  let res: Response;
  try {
    res = await window.fetch(EMAIL_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    });
  } catch (_e) {
    // A WAF block without CORS headers also lands here: the browser hides the response from us.
    return { ok: false, status: null, reason: "network_error" };
  }

  if (res.ok) return { ok: true };

  // Only the status and our own reason code go back: the API's message is never passed on.
  return { ok: false, status: res.status, reason: reasonFor(res.status, await readApiMessage(res)) };
}
