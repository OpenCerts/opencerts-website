import { Selector } from "testcafe";

fixture("SSG_ACN_DEV").page`http://localhost:3000`;

const Certificate = "./S0000000A_180000000226558.OPENCERT";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("SOA001 certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Industry and Generic Skills SOA",
    "is awarded to",
    "A",
    "ID No: S0000000A",
    "for successful attainment of the following industry approved competencies",
    "at SSG_ACN_DEV",
    "5 NOV 2018"
  ]);
});
