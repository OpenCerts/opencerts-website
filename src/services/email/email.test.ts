import { EMAIL_API_URL } from "../../config";
import { WrappedOrSignedOpenCertsDocument } from "../../shared";
import { sendEmail } from "./index";

// A fetch Response stand-in: just the status and a body read through text(), which is all sendEmail uses.
// A string body is sent as-is (non-JSON pages, empty bodies); anything else is serialised.
const response = (status: number, body: unknown = "") => ({
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

  it("resolves ok when 200 is returned", async () => {
    fetchStub.mockResolvedValue(response(200, { success: true }));
    await expect(send()).resolves.toStrictEqual({ ok: true });
  });

  it.each([
    ["Recipient must be a single valid email address", "invalid_recipient"],
    ["Invalid captcha or missing API key", "invalid_captcha"],
    ["Invalid certificate", "invalid_certificate"],
    ["Invalid request body", "invalid_request"],
    ["Invalid API key", "invalid_request"],
    ["Something the client has never heard of", "invalid_request"],
  ])("maps a 400 with %j to %s", async (error, reason) => {
    fetchStub.mockResolvedValue(response(400, { error, requestId: "req-123" }));
    await expect(send()).resolves.toStrictEqual({ ok: false, status: 400, reason, apiMessage: error });
  });

  it.each([
    ["a non-JSON body", "<html>Bad Request</html>"],
    ["an empty body", ""],
    ["JSON without an error string", { error: { nested: true } }],
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
    await expect(send()).resolves.toStrictEqual({
      ok: false,
      status: 500,
      reason: "server_error",
      apiMessage: "An unexpected error occurred",
    });
  });

  it.each([502, 503, 504])("maps %i to server_error", async (status) => {
    fetchStub.mockResolvedValue(response(status, "Bad Gateway"));
    await expect(send()).resolves.toStrictEqual({ ok: false, status, reason: "server_error" });
  });

  it("maps a non-200 success-range or redirect status to unknown", async () => {
    fetchStub.mockResolvedValue(response(302));
    await expect(send()).resolves.toStrictEqual({ ok: false, status: 302, reason: "unknown" });
  });

  it("maps a rejected fetch (network error or CORS-less WAF block) to network_error", async () => {
    fetchStub.mockRejectedValue(new TypeError("Failed to fetch"));
    await expect(send()).resolves.toStrictEqual({ ok: false, status: null, reason: "network_error" });
  });

  it("drops an API message that echoes the recipient, so the result never carries the address", async () => {
    fetchStub.mockResolvedValue(response(400, { error: `Cannot send to ${email.toUpperCase()}` }));
    const result = await send();
    expect(result).toStrictEqual({ ok: false, status: 400, reason: "invalid_request" });
    expect(JSON.stringify(result).toLowerCase()).not.toContain(email);
  });
});
