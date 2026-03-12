import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";
import { validateTextContent } from "./utils";

fixture("Multiple Registry Verified for Certificate Rendering").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const Document = "./fixture/sample-multiregistry-verified.json";
const StatusButton = Selector("#certificate-status");

// SKIPPED: The fixture uses document store 0x71D28767662cB233F887aD2Bb65d048d760bA694 for demo-tradetrust.openattestation.com,
// which is not listed in the DNS TXT records.
test.skip("Sample document is rendered correctly when multiple registry is verified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["SEPOLIA: OPENCERTS"]);
});
