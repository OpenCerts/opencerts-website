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

test("NUS-JHUJDP-MUSIC-2019 degree scroll is rendered correctly", async t => {
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
    "A0075196W, NAME",
    "Bachelor",
    "Music",
    "30 June 2014"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0075196W, name",
    "A0075196W",
    "01/01/1905",
    "20/08/2019",
    "BACHELOR OF MUSIC",
    "COMPLETED PROGRAMME",
    "2010/2011 SEMESTER 1",
    "MUA1113",
    "Desktop Music Production 1",
    "2010/2011 SEMESTER 2",
    "MUA1114",
    "Desktop Music Production 2",
    "2011/2012 SEMESTER 1",
    "2011/2012 SEMESTER 2",
    "MUA2106",
    "Introduction To Computer Music 2",
    "2012/2013 SEMESTER 1",
    "2012/2013 SEMESTER 2",
    "2013/2014 SEMESTER 1",
    "MUA3105",
    "Conducting",
    "2013/2014 SEMESTER 2",
    "GEK3007",
    "Politics, Music and Society"
  ]);
});
