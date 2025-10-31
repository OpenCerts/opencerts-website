import { Selector, ClientFunction } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";
import { validateTextContent } from "./utils";

fixture("Registry Certificate Rendering").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const Document = "./fixture/registry-verified.json";
const IframeBlock = Selector("#iframe");
const TranscriptButton = Selector("[data-testid='transcript']");
const MediaButton = Selector("[data-testid='media']");
const StatusButton = Selector("#certificate-status");
const SampleTemplate = Selector("#rendered-certificate");

test("Sample document is rendered correctly when single registry is verified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["SEPOLIA: OpenCerts"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "OpenCerts Demo",
    "Your Name",
    "has successfully completed the",
    "John Demo",
  ]);

  await t.switchToMainWindow();
  await t.click(TranscriptButton);
  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Govtech Demo Certificate",
    "Your Name",
    "Govtech Demo",
    "Object Oriented Programming in Java",
    "ECON 3120",
  ]);

  await t.switchToMainWindow();
  await t.click(MediaButton);
  await t.switchToIframe(IframeBlock);

  const getTemplateHtml = ClientFunction(() => SampleTemplate().innerHTML, {
    dependencies: { SampleTemplate },
  });

  await t.expect(getTemplateHtml()).contains('id="youtube-vid"');
});
