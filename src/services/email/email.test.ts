import { EMAIL_API_URL } from "../../config";
import { sendEmail } from "./index";

describe("sagas/certificate", () => {
  const email = "admin@opencerts.io";
  const captcha = "ABCD";
  const certificate = { some: "data" };
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
    fetchStub.mockResolvedValue({ status: 200 });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await sendEmail({ certificate, captcha, email });

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

  it("resolves when 200 is returned", async () => {
    fetchStub.mockResolvedValue({ status: 200 });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await sendEmail({ certificate, captcha, email });
    expect(res).toBe(true);
  });

  it("rejects when non-200 code is returned", async () => {
    fetchStub.mockResolvedValue({ status: 400 });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await sendEmail({ certificate, captcha, email });
    expect(res).toBe(false);
  });
});
