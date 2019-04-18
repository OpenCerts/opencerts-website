import { Selector } from "testcafe";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_PDP_SDPCN_2019.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("PDP-SGPCN 2019 certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name PDP SDPCN 2019",
    "Specialist Diploma",
    "Palliative Care Nursing",
    "Principal",
    "Council Chairman",
    "Ngee Ann Polytechnic",
    "Director",
    "National Cancer Centre Singapore",
    "Medical Director",
    "Dover Park Hospice",
    "May 2019",
    "SDPCN193003"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "SUCCESSFULLY COMPLETED",
    "0003003",
    "Student Name PDP SDPCN 2019",
    "S1234567A",
    "APRIL 2015",
    "SPECIALIST DIPLOMA IN PALLIATIVE CARE NURSING",
    "PDC IN ESSENTIAL CLINICAL KNOWLEDGE IN PALLIATIVE CARE",
    "ANATOMY & PHYSIOLOGY 1",
    "PDC IN ESSENTIAL CLINICAL SKILLS IN PALLIATIVE CARE",
    "CLINICAL ATTACHMENT 1.1",
    "Graduating GPA: 2.8276",
    "The student has completed the course in SPECIALIST DIPLOMA IN PALLIATIVE CARE NURSING",
    "CET ACADEMY"
  ]);
});
