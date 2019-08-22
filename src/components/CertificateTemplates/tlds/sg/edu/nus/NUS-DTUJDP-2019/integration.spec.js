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

test("NUS-DTUJDP-2019 degree scroll is rendered correctly", async t => {
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
    "A0080715J, NAME",
    "Doctor",
    "Philosophy",
    "30 September 2015"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0080715J, name",
    "A0080715J",
    "01/01/1905",
    "20/08/2019",
    "DOCTOR OF PHILOSOPHY",
    "COMPLETED PROGRAMME",
    "2010/2011 SEMESTER 2",
    "BPS5102",
    "Climate Change and the Built Environment",
    "2011/2012 SEMESTER 1",
    "BPS5103",
    "Green Building Integration and Evaluation Studio",
    "2011/2012 SEMESTER 2",
    "BPS5103",
    "Green Building Integration and Evaluation Studio",
    "2012/2013 SEMESTER 1",
    "BS6770",
    "PHD SEMINAR",
    "2012/2013 SEMESTER 2",
    "BS6770",
    "PHD SEMINAR",
    "2013/2014 SEMESTER 1",
    "2013/2014 SEMESTER 2"
  ]);
});
