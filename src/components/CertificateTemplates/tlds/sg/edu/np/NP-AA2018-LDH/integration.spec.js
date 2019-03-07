// eslint-disable-next-line import/no-extraneous-dependencies
import { Selector } from "testcafe";

// eslint-disable-next-line
fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_FT_LDH.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("LDH certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name LDH Cert",
    "Diploma with Merit",
    "Landscape Design & Hort",
    "Principal",
    "Council Chairman",
    "Chief Executive Officer",
    "National Parks Board"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "Student Name LDH Cert",
    "3D FORM & SPACE",
    "S1234888A",
    "Graduating GPA: 3.7635 (Graduating GPA is computed based on passed modules and has a maximum value of 4)",
    "Professional Preparation Programme",
    "Director, Academic Affairs"
  ]);
});
