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

test("NUS-MUSIC-2019 degree scroll is rendered correctly", async t => {
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
    "A0117560L, NAME",
    "Bachelor",
    "Music",
    "31 January 2018"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0117560L, name",
    "A0117560L",
    "01/01/1905",
    "20/08/2019",
    "BACHELOR OF MUSIC",
    "COMPLETED PROGRAMME",
    "2013/2014 SEMESTER 2",
    "MUA1154",
    "Noon Recital Series 1B",
    "2014/2015 SEMESTER 1",
    "MUA1109",
    "Chamber Ensemble 1A",
    "2014/2015 SEMESTER 2",
    "MUA1110",
    "Chamber Ensemble 1B",
    "2015/2016 SEMESTER 1",
    "GEK1519",
    "Science of Music",
    "2015/2016 SEMESTER 2",
    "LAG1201",
    "German 1",
    "2016/2017 SEMESTER 1",
    "GEK1054",
    "Social and Cultural Studies through Music",
    "2016/2017 SEMESTER 2"
  ]);
});
