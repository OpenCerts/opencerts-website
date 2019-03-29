import { Selector } from "testcafe";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_FT_NIEC_2019.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("NIEC 2019 certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name ECH Cert 2019",
    "Diploma",
    "Early Childhood Development & Education",
    "Principal",
    "Council Chairman",
    "Ngee Ann Polytechnic",
    "Director",
    "National Institute of Early Childhood Development",
    "MAY 2019",
    "ECH190003"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "PASS WITH MERIT",
    "0000003",
    "Student Name ECH Cert 2019",
    "S1234567A",
    "APRIL 2014",
    "EARLY CHILDHOOD EDUCATION",
    "MINDWORKS",
    "WORLD ISSUES: A SINGAPORE PERSPECTIVE",
    "Graduating GPA: 3.7835",
    "Professional Preparation Programme",
    "The student has completed the full-time course in Diploma in Early Childhood Development & Education",
    "REGISTRAR",
    "NATIONAL INSTITUTE OF EARLY CHILDHOOD DEVELOPMENT",
    "DIRECTOR, ACADEMIC AFFAIRS",
    "NGEE ANN POLYTECHNIC"
  ]);
});
