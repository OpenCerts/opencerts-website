import sinon from "sinon";
import * as sendEmail from "./index";
import { EMAIL_API_URL } from "../../config";

describe("sagas/certificate", () => {
  const email = "admin@opencerts.io";
  const captcha = "ABCD";
  const certificate = { some: "data" };

  it("calls window.fetch with right args", async () => {
    const fetchStub = sinon.stub(window, "fetch").resolves({ status: 200 });

    await sendEmail.default({ certificate, captcha, email });

    expect(
      fetchStub.calledWith(EMAIL_API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: certificate,
          to: email,
          captcha
        })
      })
    ).toBe(true);
    fetchStub.restore();
  });

  it("resolves when 200 is returned", async () => {
    const fetchStub = sinon.stub(window, "fetch").resolves({ status: 200 });
    const res = await sendEmail.default({ certificate, captcha, email });
    expect(res).toBe(true);
    fetchStub.restore();
  });

  it("rejects when non-200 code is returned", async () => {
    const fetchStub = sinon.stub(window, "fetch").resolves({ status: 400 });
    const res = await sendEmail.default({ certificate, captcha, email });
    expect(res).toBe(false);
    fetchStub.restore();
  });
});
