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

test("NUS-K2SMA-2019 degree scroll is rendered correctly", async t => {
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
    "A0010255Y, NAME",
    "Master",
    "Science",
    "(Advanced",
    "Materials",
    "for",
    "Micro-",
    "Nano-",
    "Systems)",
    "13 March 2007"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0010255Y, name",
    "A0010255Y",
    "01/01/1905",
    "20/08/2019",
    "MASTER OF SCIENCE (ADVANCED MATERIALS FOR MICRO- AND NANO- SYSTEMS)",
    "COMPLETED PROGRAMME",
    "2005/2006 SEMESTER 1",
    "SMA5120",
    "FUNDAMENTALS OF SEMICONDUCTOR DEVICE PHYSICS",
    "2005/2006 SEMESTER 2",
    "2005/2006 SEMESTER 3",
    "EE5202",
    "NANOMETER SCALE INFORMATION STORAGE",
    "2006/2007 SMA SEMESTER 2",
    "EE5514",
    "IC YIELD, RELIABILITY & FAILURE ANALYSIS"
  ]);
});
