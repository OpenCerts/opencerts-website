import { Selector } from "testcafe";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_FT_MAIN_2018.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("FT-MAIN 2018 certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name MAIN Cert 2018",
    "Diploma with Merit",
    "Animation & 3D Arts",
    "Principal",
    "Council Chairman",
    "May 2018",
    "A3DA180001"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "PASS WITH MERIT",
    "0000001",
    "Student Name MAIN Cert 2018",
    "S1234567A",
    "APRIL 2014",
    "MOLECULAR BIOTECHNOLOGY",
    "MINDWORKS",
    "ANIMATION & 3D ARTS",
    "WORLD ISSUES: A SINGAPORE PERSPECTIVE",
    "National Physical Fitness Award",
    "allowed a transfer",
    "National Physical Fitness Award",
    "Graduating GPA: 3.7835",
    "Professional Preparation Programme",
    "The student has completed the full-time course in Diploma in Biomedical Science",
    "DIRECTOR, ACADEMIC AFFAIRS"
  ]);
});
