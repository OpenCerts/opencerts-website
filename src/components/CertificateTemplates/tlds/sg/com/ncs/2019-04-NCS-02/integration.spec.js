import { Selector } from "testcafe";

fixture("2019-04-NCS-02").page`http://localhost:3000`;

const Certificate = "./1.5v_NCS-template2.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("2019-04-NCS-02 certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");
  await t.expect(TemplateTabList.textContent).contains("Static-Details");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Teo Zhewei, Newton",
    "Blockchain Designing and Modelling",
    "Chair,Board of Trustees",
    "President",
    "05 Jun 2019",
    "159753"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "Academic Transcript",
    "Completed Program",
    "12345678B",
    "Teo Zhewei, Newton",
    "Blockchain Designing and Modelling",
    "SPORTS & WELLNESS",
    "FUNDAMENTALS FOR CREATIVE PROFESSIONALS",
    "PARTICIPATED IN GLOBAL LEADERSHIP PROGRAM IN MIT IN MAY - AUG 2016",
    "05 Jun 2019"
  ]);

  // Navigate to Static-Details tab
  const staticDetailsTab = TemplateTabList.find(":nth-child(3)");
  await t.click(staticDetailsTab);

  // Static-Details tab content
  await validateTextContent(t, RenderedCertificate, [
    "GUIDE TO ACADEMIC TRANSCRIPT",
    "GRADING SYSTEM (for 2012 to 2016 intakes only)",
    "CLASSIFICATIONS OF HONOURS",
    "FOR UNDERGRADUATE PROGRAMME",
    "FOR MASTER OF ARCHITECTURE PROGRAMME"
  ]);
});
