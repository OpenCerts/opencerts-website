import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

fixture("Alternate Network Cert").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const Certificate = "./sample-amoy.opencert";

const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Sample amoy document is rendered correctly", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await validateTextContent(t, StatusButton, ["DEMO-OPENCERTS.OPENATTESTATION.COM"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "OpenCerts Demo",
    "Your Name",
    "has successfully completed the",
    "John Demo",
  ]);
});
