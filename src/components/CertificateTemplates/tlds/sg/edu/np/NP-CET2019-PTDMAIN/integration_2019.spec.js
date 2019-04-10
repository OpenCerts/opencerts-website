import { Selector } from "testcafe";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_PTD_MAIN_2019.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("PTD-MAIN 2019 certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name PTD Main 2019",
    "Diploma with Merit",
    "Early Childhood Care & Education",
    "Principal",
    "Council Chairman",
    "MAY 2019",
    "DCET119M2001"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "SUCCESSFULLY COMPLETED",
    "00002001",
    "Student Name PTD Main 2019",
    "S1234567A",
    "APRIL 2015",
    "DIPLOMA IN COMMUNITY GERONTOLOGY NURSING",
    "ANATOMY & PHYSIOLOGY 1",
    "DIPLOMA IN EARLY CHILDHOOD CARE & EDUCATION (TEACHING)",
    "PREPARATION (NURSING)",
    "allowed a transfer",
    "Graduating GPA: 2.8276",
    "The student has completed the course in DIPLOMA IN EARLY CHILDHOOD CARE & EDUCATION (TEACHING)",
    "DIRECTOR, CET ACADEMY"
  ]);
});
