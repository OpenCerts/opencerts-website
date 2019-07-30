import { Selector } from "testcafe";

fixture("Multiple DNS Verified for Certificate Rendering")
  .page`http://localhost:3000`;

const Document = "./fixture/sample-multidns-verified.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Sample document is rendered correctly when multiple dns is verfied", async t => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, [
    "Issued by EXAMPLE.OPENATTESTATION.COM"
  ]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Rendered with custom template",
    "Master of Blockchain",
    "CUSTOM_TEMPLATE",
    "Blockchain Academy",
    "Bitcoin"
  ]);
});
