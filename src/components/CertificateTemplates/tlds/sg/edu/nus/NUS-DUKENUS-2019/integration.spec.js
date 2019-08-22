import { Selector } from "testcafe";

fixture("National University of Singapore").page`http://localhost:3000`;

const Certificate = "./sample.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("NUS-DUKENUS-2019 degree scroll is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate/Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "NATIONAL",
    "UNIVERSITY",
    "OF SINGAPORE",
    "A0053942E, NAME",
    "Doctor",
    "Medicine"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0053942E, name",
    "A0053942E",
    "01/01/1905",
    "20/08/2019",
    "DOCTOR OF MEDICINE",
    "COMPLETED PROGRAMME",
    "2014/2015",
    "GMS6100",
    "Foundations Course",
    "2015/2016",
    "GMS6200",
    "Orientation to Clinical Year",
    "2016/2017",
    "GMS6225D",
    "Basic Radiology",
    "2017/2018",
    "GMS6223B",
    "Paediatric Radiology"
  ]);
});
