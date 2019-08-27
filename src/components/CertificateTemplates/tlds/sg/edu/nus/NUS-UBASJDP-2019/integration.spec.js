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

test("NUS-UBASJDP-2019 degree scroll is rendered correctly", async t => {
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
    "A0119893N, NAME",
    "Master",
    "Science",
    "30 September 2015"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0119893N, name",
    "A0119893N",
    "01/01/1905",
    "27/08/2019",
    "MASTER OF SCIENCE",
    "COMPLETED PROGRAMME",
    "DOCTOR OF PHILOSOPHY",
    "ACTIVE IN PROGRAMME",
    "2014/2015 SEMESTER 1",
    "MDG5211",
    "ANTI-INFECTIVE DRUG DISCOVERY",
    "2018/2019 SEMESTER 1",
    "MDG5108",
    "BIOSTATISTICS FOR BASIC RESEARCH",
    "MDG5771",
    "Graduate Research Seminar and Workshop"
  ]);
});
