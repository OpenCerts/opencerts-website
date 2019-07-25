import { Selector } from "testcafe";

fixture("DNS and Registry Verified for Certificate Rendering")
  .page`http://localhost:3000`;

const Document = "./fixture/sample-registry-dns-verified.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Sample document is rendered correctly when dns and registry is verfied", async t => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["Accredited by SSG"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Rendered with custom template",
    "Master of Blockchain",
    "CUSTOM_TEMPLATE",
    "Blockchain Academy",
    "Bitcoin"
  ]);
});
