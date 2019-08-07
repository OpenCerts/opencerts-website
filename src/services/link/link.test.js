import sinon from "sinon";
import * as generateLink from "./index";
import { SHARE_LINK_API_URL } from "../../config";

describe("sagas/certificate", () => {
  const certificate = { some: "data" };

  it("calls window.fetch with right args", async () => {
    const fetchStub = sinon.stub(window, "fetch").resolves({ status: 200 });

    await generateLink.default({ certificate });

    expect(
      fetchStub.calledWith(SHARE_LINK_API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          document: certificate
        })
      })
    ).toBe(true);
    fetchStub.restore();
  });

  it("resolves when 200 is returned", async () => {
    const fetchStub = sinon.stub(window, "fetch").resolves({ status: 200 });
    const res = await generateLink.default({ certificate });
    expect(res).toBe(true);
    fetchStub.restore();
  });

  it("rejects when non-200 code is returned", async () => {
    const fetchStub = sinon.stub(window, "fetch").resolves({ status: 400 });
    const res = await generateLink.default({
      certificate
    });
    expect(res).toBe(false);
    fetchStub.restore();
  });
});
