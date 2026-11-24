import { EMAIL_API_URL } from "../../config";
import { WrappedOrSignedOpenCertsDocument } from "../../shared";
import { sendEmail } from "./index";

// A fetch Response stand-in: just ok, the status and a body read through text(), which is all sendEmail uses.
// A string body is sent as-is (non-JSON pages, empty bodies); anything else is serialised.
const response = (status: number, body: unknown = "") => ({
  ok: status >= 200 && status < 300,
  status,
  text: async () => (typeof body === "string" ? body : JSON.stringify(body)),
});

describe("services/email", () => {
  const email = "admin@opencerts.io";
  const captcha = "ABCD";
  const certificate = { some: "data" } as unknown as WrappedOrSignedOpenCertsDocument;
  const send = () => sendEmail({ certificate, captcha, email });
  let fetchStub: jest.SpyInstance;
  // eslint-disable-next-line jest/no-hooks
  beforeEach(() => {
    fetchStub = jest.spyOn(window, "fetch");
  });
  // eslint-disable-next-line jest/no-hooks
  afterEach(() => {
    fetchStub.mockRestore();
  });

  it("calls window.fetch with right args", async () => {
    fetchStub.mockResolvedValue(response(200, { success: true }));

    await send();

    expect(fetchStub).toHaveBeenCalledWith(EMAIL_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: certificate,
        to: email,
        captcha,
      }),
    });
  });

  // 201 and 204 count too: the email has gone, so the user must not be told it failed.
  it.each([200, 201, 204])("resolves ok when %i is returned", async (status) => {
    fetchStub.mockResolvedValue(response(status, { success: true }));
    await expect(send()).resolves.toStrictEqual({ ok: true });
  });

  it.each([
    ["Recipient must be a single valid email address", "invalid_recipient"],
    ["Invalid captcha or missing API key", "invalid_captcha"],
    ["Invalid certificate", "invalid_certificate"],
    ["Invalid document", "verification_unavailable"],
    ["Missing document", "missing_document"],
    ["Invalid request body", "invalid_request"],
    ["Invalid API key", "invalid_request"],
    ["Something the client has never heard of", "invalid_request"],
  ])("maps a 400 with %j to %s", async (error, reason) => {
    fetchStub.mockResolvedValue(response(400, { error, requestId: "req-123" }));
    await expect(send()).resolves.toStrictEqual({ ok: false, status: 400, reason });
  });

  // A plain-object lookup would find these on Object.prototype and hand back a function or object as the reason.
  it.each(["constructor", "toString", "__proto__", "hasOwnProperty", "valueOf"])(
    "maps a 400 whose error is the Object.prototype name %j to invalid_request",
    async (error) => {
      fetchStub.mockResolvedValue(response(400, { error, requestId: "req-123" }));
      await expect(send()).resolves.toStrictEqual({ ok: false, status: 400, reason: "invalid_request" });
    }
  );

  it.each([
    ["a non-JSON body", "<html>Bad Request</html>"],
    ["an empty body", ""],
    ["JSON without an error string", { error: { nested: true } }],
    ["a numeric error", { error: 123 }],
    // would be coerced to the "Invalid certificate" key by a plain-object lookup
    ["an array error holding a known message", { error: ["Invalid certificate"] }],
    ["a null error", { error: null }],
    ["a JSON null body", "null"],
  ])("maps a 400 with %s to invalid_request without throwing", async (_label, body) => {
    fetchStub.mockResolvedValue(response(400, body));
    await expect(send()).resolves.toStrictEqual({ ok: false, status: 400, reason: "invalid_request" });
  });

  it("maps a 400 whose body cannot be read to invalid_request without throwing", async () => {
    fetchStub.mockResolvedValue({
      status: 400,
      text: () => Promise.reject(new TypeError("body stream already read")),
    });
    await expect(send()).resolves.toStrictEqual({ ok: false, status: 400, reason: "invalid_request" });
  });

  it.each([403, 429])("maps %i to rate_limited", async (status) => {
    fetchStub.mockResolvedValue(response(status, "<html>Forbidden</html>"));
    await expect(send()).resolves.toStrictEqual({ ok: false, status, reason: "rate_limited" });
  });

  it.each([401, 404, 413])("maps any other 4xx (%i) to invalid_request", async (status) => {
    fetchStub.mockResolvedValue(response(status));
    await expect(send()).resolves.toStrictEqual({ ok: false, status, reason: "invalid_request" });
  });

  it("maps 500 to server_error", async () => {
    fetchStub.mockResolvedValue(response(500, { error: "An unexpected error occurred", requestId: "req-123" }));
    await expect(send()).resolves.toStrictEqual({ ok: false, status: 500, reason: "server_error" });
  });

  it.each([502, 503, 504])("maps %i to server_error", async (status) => {
    fetchStub.mockResolvedValue(response(status, "Bad Gateway"));
    await expect(send()).resolves.toStrictEqual({ ok: false, status, reason: "server_error" });
  });

  it("maps a redirect status to unknown", async () => {
    fetchStub.mockResolvedValue(response(302));
    await expect(send()).resolves.toStrictEqual({ ok: false, status: 302, reason: "unknown" });
  });

  it("maps a rejected fetch (network error or CORS-less WAF block) to network_error", async () => {
    fetchStub.mockRejectedValue(new TypeError("Failed to fetch"));
    await expect(send()).resolves.toStrictEqual({ ok: false, status: null, reason: "network_error" });
  });

  // The second address is the fuzz run's F2 case: its upper-cased echo doesn't lower-case back to it.
  it.each([email, "fuzz-pii-927ς@example.com"])(
    "never hands back the API's message, so an echo of %j can't reach the result",
    async (to) => {
      fetchStub.mockResolvedValue(response(400, { error: `Cannot send to ${to.toUpperCase()}` }));
      // exactly these keys: no message, so nothing that could carry the address
      await expect(sendEmail({ certificate, captcha, email: to })).resolves.toStrictEqual({
        ok: false,
        status: 400,
        reason: "invalid_request",
      });
    }
  );
});
