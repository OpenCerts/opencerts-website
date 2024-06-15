import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

fixture("Any one of DNS or Registry Verified for Certificate Rendering").page`http://localhost:3000/viewer`.beforeEach(
  async () => {
    await waitForReact();
  }
);

const Document = "./fixture/verified-unverified-issuer.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Sample doc is rendered correctly when any one of dns or registry is verified and doc store mismatch in domain", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["SEPOLIA: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, ["OpenCerts Demo", "Mr Blockchain", "has successfully completed the"]);
});
