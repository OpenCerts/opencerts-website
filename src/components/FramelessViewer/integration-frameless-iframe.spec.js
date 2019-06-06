import { Selector } from "testcafe";

// iframe.html is copied in scripts/integration-headless.sh
fixture("Frameless Viewer").page`http://localhost:3000/demo-iframe.html`;

const RenderButton = Selector("#render-certificate");
const IFrame = Selector("#frameless-iframe");
const RenderedCertificate = Selector("#rendered-certificate");
const TranscriptButton = Selector("#selector-transcript");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Default certificate is rendered correctly", async t => {
  // Render loaded certificate defined in the html
  await t.click(RenderButton);

  // Switch context to within iframe
  await t.switchToIframe(IFrame);

  // Validate content of first tab
  await validateTextContent(t, RenderedCertificate, [
    "Principal",
    "Council Chairman",
    "A3DA180001"
  ]);

  // Click on transcript button
  await t.switchToMainWindow();
  await t.click(TranscriptButton);
  await t.switchToIframe(IFrame);

  // Validate content of second tab
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "DIRECTOR, ACADEMIC AFFAIRS"
  ]);
});
