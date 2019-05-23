import { Selector } from "testcafe";

fixture("Demo Cert Govtech").page`http://localhost:3000`;

const Certificate = "./DEMO_CERT.json";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Demo certificate is rendered correctly", async t => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  await validateTextContent(t, RenderedCertificate, [
    "Your Name",
    "XYZ Course",
    "has successfully completed the",
    "certification through training administered by"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "001",
    "ABCXXXXYZ",
    "MOLECULAR BIOTECHNOLOGY",
    "ANIMATION & 3D ARTS",
    "TRF",
    "DRAWING & PERSPECTIVE",
    "PRINCIPLES OF ANIMATION",
    "B+",
    "CAREER AND PROFESSIONAL PREPARATION II"
  ]);
});
