import sinon from "sinon";
import { generateLink, getCertificateById } from "./index";
import { SHARE_LINK_API_URL } from "../../config";

describe("sagas/certificate", () => {
  describe("generateLink", () => {
    const document = { data: "data" };

    it("calls window.fetch with right args", async () => {
      const fetchStub = sinon.stub(window, "fetch").resolves({ status: 200 });

      await generateLink(document);
      expect(
        fetchStub.calledWith(`${SHARE_LINK_API_URL}/create`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ttl: 900,
            document
          })
        })
      ).toBe(true);
      fetchStub.restore();
    });

    it("resolves when 200 is returned", async () => {
      const fetchStub = sinon.stub(window, "fetch").resolves({ status: 200 });
      const res = await generateLink(document);
      expect(res).toBe(true);
      fetchStub.restore();
    });

    it("rejects when non-200 code is returned", async () => {
      const fetchStub = sinon.stub(window, "fetch").resolves({ status: 400 });
      const res = await generateLink(document);
      expect(res).toBe(false);
      fetchStub.restore();
    });
  });

  describe("getCertificateById", () => {
    const certificateId = "00000000-0000-0000-0000-000000000000";

    it("calls window.fetch with right args", async () => {
      const fetchStub = sinon.stub(window, "fetch").resolves({ status: 200 });

      await getCertificateById(certificateId);
      expect(
        fetchStub.calledWith(`${SHARE_LINK_API_URL}/get/${certificateId}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
      ).toBe(true);
      fetchStub.restore();
    });

    it("resolves when 200 is returned", async () => {
      const fetchStub = sinon.stub(window, "fetch").resolves({ status: 200 });
      const res = await getCertificateById(certificateId);
      expect(res).toBe(true);
      fetchStub.restore();
    });

    it("rejects when non-200 code is returned", async () => {
      const fetchStub = sinon.stub(window, "fetch").resolves({ status: 400 });
      const res = await getCertificateById(certificateId);
      expect(res).toBe(false);
      fetchStub.restore();
    });
  });
});
