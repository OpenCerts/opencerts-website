import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

fixture("Multiple Registry Verified for Certificate Rendering").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const Document = "./fixture/sample-multiregistry-verified.json";
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Sample document is rendered correctly when multiple registry is verified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["SEPOLIA: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)"]);
});
