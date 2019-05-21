import { Selector, ClientFunction } from "testcafe";

fixture("Govtech DemoCert").page`http://localhost:3000`;

const Certificate =
  "../../components/CertificateTemplates/example/Demo-CertTemplate/DEMO_2019.opencert";

//  const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("DEMO certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  //   await t.expect(TemplateTabList.textContent).contains("Certificate");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Your Name",
    "MINDWORKS",
    "SPORTS & WELLNESS",
    "https://tech.gov.sg",
    "DEMO STORE",
    "PRINCIPLES OF ANIMATION",
    "MIND QUEST FOR EXCELLENCE",
    "TRF",
    "2",
    "PX",
    "C+"
  ]);

  await ClientFunction(() => window.history.back())();
  await t.setFilesToUpload("input[type=file]", [Certificate]);
  //   await t.expect(TemplateTabList.textContent).contains("Certificate");
  await validateTextContent(t, RenderedCertificate, [
    "Your Name",
    "MINDWORKS",
    "SPORTS & WELLNESS",
    "https://tech.gov.sg",
    "DEMO STORE",
    "PRINCIPLES OF ANIMATION",
    "MIND QUEST FOR EXCELLENCE",
    "TRF",
    "2",
    "PX",
    "C+"
  ]);
});
