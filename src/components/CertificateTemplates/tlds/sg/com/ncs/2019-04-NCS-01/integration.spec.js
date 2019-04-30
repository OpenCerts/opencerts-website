import { Selector } from "testcafe";

fixture("2019-04-NCS-01").page`http://localhost:3000`;

const Certificate = "./1.5v_NCS-template1.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (tab, component, texts) =>
  texts.reduce(
    async (prev, curr) => tab.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("2019-04-NCS-01 certificate is rendered correctly", async tab => {
  // Uploads certificate via dropzone
  await tab.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await tab.expect(TemplateTabList.textContent).contains("Certificate");
  await tab.expect(TemplateTabList.textContent).contains("Transcript");
  await tab.expect(TemplateTabList.textContent).contains("Static-Details");

  // Certificate tab content
  await validateTextContent(tab, RenderedCertificate, [
    "Teo Zhewei, Isaac",
    "Blockchain Designing and Architecture",
    "Chair,Board of Trustees",
    "President",
    "05 May 2019",
    "159753"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await tab.click(transcriptTab);

  // Transcript tab content
  await validateTextContent(tab, RenderedCertificate, [
    "Academic Transcript",
    "Completed Program",
    "12345678A",
    "Teo Zhewei, Isaac",
    "Blockchain Designing and Architecture",
    "SPORTS & WELLNESS",
    "FUNDAMENTALS FOR CREATIVE PROFESSIONALS",
    "PARTICIPATED IN GLOBAL LEADERSHIP PROGRAM IN MIT IN MAY - AUG 2016",
    "05 May 2019"
  ]);

  // Navigate to Static-Details tab
  const staticDetailsTab = TemplateTabList.find(":nth-child(3)");
  await tab.click(staticDetailsTab);

  // Static-Details tab content
  await validateTextContent(tab, RenderedCertificate, [
    "GUIDE TO ACADEMIC TRANSCRIPT",
    "GRADING SYSTEM (for 2012 to 2016 intakes only)",
    "CLASSIFICATIONS OF HONOURS",
    "FOR UNDERGRADUATE PROGRAMME",
    "FOR MASTER OF ARCHITECTURE PROGRAMME"
  ]);
});
