import { Selector } from "testcafe";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_OPTION_NIEC_2019.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("OPTION-NIEC 2019 certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name Option Cert NIEC 2019",
    "an option in",
    "Business Studies",
    "as part of the course of study in the",
    "Diploma",
    "Early Childhood Development & Education",
    "Registrar, NIEC",
    "Registrar, NP",
    "May 2019",
    "ECH190006"
  ]);
});
