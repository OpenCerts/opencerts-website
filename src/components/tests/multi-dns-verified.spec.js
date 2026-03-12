import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";
import { validateTextContent } from "./utils";

fixture("Multiple DNS Verified for Certificate Rendering").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const Document = "./fixture/sample-multidns-verified.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");

// SKIPPED: The fixture uses document store 0x71D28767662cB233F887aD2Bb65d048d760bA694 for demo-tradetrust.openattestation.com,
// which is not listed in the DNS TXT records.
test.skip("Sample document is rendered correctly when multiple dns is verified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["SEPOLIA: OPENCERTS"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, ["OpenCerts Demo", "Mr Blockchain", "has successfully completed the"]);
});
