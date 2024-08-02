import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";
import { validateTextContent } from "./utils";

fixture("Multiple DNS Verified for Certificate Rendering using certificate store")
  .page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const Document = "./fixture/sample-multidns-verified-certificate-store.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");

test("Sample document is rendered correctly when multiple dns is verified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["SEPOLIA: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, ["OpenCerts Demo", "Mr Blockchain", "has successfully completed the"]);
});
