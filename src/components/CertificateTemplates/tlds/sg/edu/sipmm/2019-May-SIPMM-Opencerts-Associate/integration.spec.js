import { Selector } from "testcafe";

fixture("SIPMM").page`http://localhost:3000`;

const Certificate = "./2019-May-SIPMM-Opencerts-Associate.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("2019-May-SIPMM certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Advanced Diploma in Logistics and Supply Management",
    "Student Name",
    "Advanced Diploma in Logistics and Supply Management",
    "Merit",
    "ADLSM",
    "19001234",
    "10 May 2019",
    "President",
    "Registrar"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "10 May 2019",
    "Student Name",
    "S1234567H",
    "Advanced Diploma in Logistics and Supply Management",
    "2019",
    "LPS402",
    "Logistics Strategy",
    "B",
    "Credit",
    "Advanced Diploma in Logistics and Supply Management",
    "Merit",
    "Registrar"
  ]);
});
