import { Selector } from "testcafe";

fixture("Registry Certificate Rendering").page`http://localhost:3000`;

const Document = "../HomePageContent/Ropsten-Demo.json";
const IframeBlock = Selector("#iframe");
const TranscriptButton = Selector(".nav-item").withText("TRANSCRIPT");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Sample document is rendered correctly when single registry is verfied", async t => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["Accredited by SSG"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "OpenCerts Demo",
    "Your Name",
    "has successfully completed the",
    "John Demo"
  ]);

  await t.switchToMainWindow();
  await t.click(TranscriptButton);
  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Govtech Demo Certificate",
    "Your Name",
    "Govtech Demo",
    "Object Oriented Programming in Java",
    "ECON 3120"
  ]);
});
