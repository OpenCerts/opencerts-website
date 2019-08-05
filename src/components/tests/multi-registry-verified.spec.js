import { Selector } from "testcafe";

fixture("Multiple Registry Verified for Certificate Rendering")
  .page`http://localhost:3000`;

const Document = "./fixture/sample-multiregistry-verified.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Sample document is rendered correctly when multiple registry is verfied", async t => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["Accredited by SSG"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Sample Certificate",
    "Your Name",
    "Issuer Info",
    "Transcript",
    "CAREER AND PROFESSIONAL PREPARATION II"
  ]);
});
