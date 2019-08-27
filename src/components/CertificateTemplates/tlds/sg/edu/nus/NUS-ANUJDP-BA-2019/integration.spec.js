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

test("NUS-ANUJDP-BA-2019 degree scroll is rendered correctly", async t => {
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
    "A0036825A, NAME",
    "Master",
    "Arts",
    "(Southeast",
    "Asian",
    "Studies)",
    "31 August 2016"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0036825A, name",
    "A0036825A",
    "01/01/1905",
    "27/08/2019",
    "MASTER OF ARTS (SOUTHEAST ASIAN STUDIES)",
    "COMPLETED PROGRAMME",
    "2015/2016 SEMESTER 1",
    "SE4218",
    "Majorities and Minorities in SE Asia",
    "SE4227",
    "Nationalism in Southeast Asia",
    "SE5151",
    "APPROACHES TO THE STUDY OF SOUTHEAST ASIA",
    "SE5213",
    "REVOLT AND REVOLUTION IN SOUTHEAST ASIA",
    "SE5242",
    "Country Studies: Thailand",
    "2015/2016 SEMESTER 2",
    "SE5101",
    "RESEARCH PROJECT",
    "2015/2016 SPECIAL TERM(PART 1)",
    "SE5101",
    "RESEARCH PROJECT",
    "2015/2016 SPECIAL TERM(PART 2)"
  ]);
});
