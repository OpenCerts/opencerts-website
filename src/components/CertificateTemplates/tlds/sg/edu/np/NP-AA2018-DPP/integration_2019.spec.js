import { Selector } from "testcafe";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_DPP_2019.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("DPP 2019 certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name DPP Cert 2019",
    "Diploma Plus Certificate",
    "French",
    "Principal",
    "Council Chairman",
    "May 2019",
    "CIF191001"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "Student Name DPP Cert 2019",
    "S1234567A",
    "MAY 2019",
    "CERTIFICATE IN FRENCH",
    "MINDWORKS",
    "DRAWING & PERSPECTIVE",
    "The student has completed the Diploma Plus Certificate in French.",
    "DIRECTOR, ACADEMIC AFFAIRS"
  ]);
});
