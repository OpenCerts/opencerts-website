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
    "27/08/2019",
    "BACHELOR OF MUSIC",
    "COMPLETED PROGRAMME",
    "2010/2011 SEMESTER 1",
    "MUA1113",
    "Desktop Music Production 1",
    "MUA1153",
    "Noon Recital Series 1A",
    "MUA1161",
    "Major Study 1A",
    "MUA2255",
    "Applied Secondary A",
    "MUH1115",
    "Communicating About Music I",
    "MUT1121",
    "Musical Concepts and Materials I",
    "2010/2011 SEMESTER 2",
    "MUA1114",
    "Desktop Music Production 2",
    "MUA1154",
    "Noon Recital Series 1B",
    "MUA1162",
    "Major Study 1B",
    "MUA1163",
    "Introduction to Professional Development",
    "MUA2256",
    "Applied Secondary B",
    "MUH1116",
    "Communicating About Music II",
    "MUT1122",
    "Musical Concepts and Materials II",
    "2011/2012 SEMESTER 1",
    "2011/2012 SEMESTER 2",
    "MUA2106",
    "Introduction To Computer Music 2",
    "MUA2154",
    "Noon Recital Series 2B",
    "MUA2162",
    "Major Study 2B",
    "MUH2116",
    "Music and Context: After 1800",
    "MUT2118",
    "Musical Concepts and Materials IV",
    "SSA1202",
    "Southeast Asia: A Changing Region",
    "2012/2013 SEMESTER 1",
    "2012/2013 SEMESTER 2",
    "2013/2014 SEMESTER 1",
    "MUA3105",
    "Conducting",
    "MUA4153",
    "Noon Recital Series 4A",
    "MUA4161",
    "Major Study 4A",
    "MUH3205",
    "Chamber Music Since 1700",
    "MUL2102",
    "Patrons of the Arts",
    "MUT3201C",
    "Compositional Approaches since WWII",
    "MUT3210",
    "Late Beethoven Style",
    "2013/2014 SEMESTER 2",
    "GEK3007",
    "Politics, Music and Society",
    "MUA3210",
    "Chamber Singers 1",
    "MUA4162",
    "Major Study 4B",
    "MUH4202",
    "Musical Intertextuality:Mozart to Tippett"
  ]);

});
