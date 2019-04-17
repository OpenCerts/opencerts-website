import { Selector } from "testcafe";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_FT_LDH_2018.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("LDH 2018 certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name LDH Cert 2018",
    "Diploma",
    "Landscape Design & Hort",
    "Principal",
    "Council Chairman",
    "Ngee Ann Polytechnic",
    "Chief Executive Officer",
    "National Parks Board",
    "May 2018",
    "LDH180004"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "PASS WITH MERIT",
    "0000004",
    "Student Name LDH Cert 2018",
    "S1234567A",
    "APRIL 2014",
    "MOLECULAR BIOTECHNOLOGY",
    "MINDWORKS",
    "LANDSCAPE DESIGN & HORT",
    "WORLD ISSUES: A SINGAPORE PERSPECTIVE",
    "allowed a transfer",
    "National Physical Fitness Award",
    "Graduating GPA: 3.7835",
    "Professional Preparation Programme",
    "The student has completed the full-time course in Diploma in Landscape Design & Hort",
    "DIRECTOR, ACADEMIC AFFAIRS"
  ]);
});
