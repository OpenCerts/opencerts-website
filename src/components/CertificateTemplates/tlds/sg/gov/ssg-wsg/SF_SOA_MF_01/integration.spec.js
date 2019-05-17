import { Selector } from "testcafe";

fixture("ROPSTEN : Skillsfuture Singapore").page`http://localhost:3000`;

const Certificate = "./SF_SOA_MF_01.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("SF_SOA_MF_01 certificate is rendered correctly", async t => {
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
    "for successfully meeting the requirements of the above programme and attainment of the competencies in the following modules of the Generic Manufacturing Skills WSQ Framework:",
    "Develop strategies for total remuneration (HR-PRB-503E-1)",
    "at SINGAPORE NATIONAL EMPLOYERS FEDERATION",
    "01 Dec 2018"
  ]);
});
