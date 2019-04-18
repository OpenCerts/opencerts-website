import { Selector } from "testcafe";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_FT_PHARM_2019.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("PHARM 2019 certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name PHARM Cert 2019",
    "Diploma",
    "Pharmacy Science",
    "Principal",
    "Council Chairman",
    "Ngee Ann Polytechnic",
    "Chief Executive Officer",
    "National University Hospital",
    "May 2019",
    "PHARM180005"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "PASS WITH MERIT",
    "0000005",
    "Student Name PHARM Cert 2019",
    "S1234567A",
    "APRIL 2014",
    "MOLECULAR BIOTECHNOLOGY",
    "MINDWORKS",
    "PHARMACY SCIENCE",
    "WORLD ISSUES: A SINGAPORE PERSPECTIVE",
    "allowed a transfer",
    "Graduating GPA: 3.7835",
    "Professional Preparation Programme",
    "The student has completed the full-time course in Diploma in Pharmacy Science",
    "DIRECTOR, ACADEMIC AFFAIRS"
  ]);
});
