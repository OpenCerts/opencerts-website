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
    "27/08/2019",
    "BACHELOR OF MUSIC",
    "COMPLETED PROGRAMME",
    "2013/2014 SEMESTER 2",
    "MUA1154",
    "Noon Recital Series 1B",
    "MUA1162",
    "Major Study 1B",
    "MUA1163",
    "Introduction to Professional Development",
    "MUA1181",
    "First Year Brass Class B",
    "MUH1116",
    "Communicating About Music II",
    "MUT1122",
    "Musical Concepts and Materials II",
    "2014/2015 SEMESTER 1",
    "MUA1109",
    "Chamber Ensemble 1A",
    "MUA2107",
    "Large Ensembles 2A",
    "MUA2153",
    "Noon Recital Series 2A",
    "MUA2161",
    "Major Study 2A",
    "MUA2180",
    "Orchestral Repertoire for Brass 2A",
    "MUH2115",
    "Music and Context: Before 1800",
    "MUL2101",
    "Critical Thinking for Musicians",
    "MUT2117",
    "Musical Concepts and Materials III",
    "2014/2015 SEMESTER 2",
    "MUA1110",
    "Chamber Ensemble 1B",
    "MUA2108",
    "Large Ensembles 2B",
    "MUA2154",
    "Noon Recital Series 2B",
    "MUA2162",
    "Major Study 2B",
    "MUA2181",
    "Orchestral Repertoire for Brass 2B",
    "MUH2116",
    "Music and Context: After 1800",
    "MUT2118",
    "Musical Concepts and Materials IV",
    "SSY2223",
    "Western Music within a Singaporean Context",
    "2015/2016 SEMESTER 1",
    "GEK1519",
    "Science of Music",
    "MUA2109",
    "Chamber Ensemble 2A",
    "MUA3105",
    "Conducting",
    "MUA3107",
    "Large Ensembles 3A",
    "MUA3153",
    "Noon Recital Series 3A",
    "MUA3161",
    "Major Study 3A",
    "MUA3181",
    "Advanced Concepts in Orchestral Repertoire I",
    "MUA3205",
    "Materials of Jazz Music 1",
    "MUH3203",
    "History of Opera",
    "2015/2016 SEMESTER 2",
    "LAG1201",
    "German 1",
    "MUA2110",
    "Chamber Ensemble 2B",
    "MUA3108",
    "Large Ensembles 3B",
    "MUA3154",
    "Noon Recital Series 3B",
    "MUA3162",
    "Major Study 3B",
    "MUA3214",
    "Introduction to Pedagogy",
    "2016/2017 SEMESTER 1",
    "GEK1054",
    "Social and Cultural Studies through Music",
    "GEM1003",
    "Introduction to Theatre and Performance",
    "MUA4162",
    "Major Study 4B",
    "MUA4219",
    "Advanced Chamber Ensemble",
    "2016/2017 SEMESTER 2"
  ]);
});
