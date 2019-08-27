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

test("NUS-ICLJDP-2019 degree scroll is rendered correctly", async t => {
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
    "A0107691A, NAME",
    "Doctor",
    "Philosophy",
    "31 January 2018"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0107691A, name",
    "A0107691A",
    "01/01/1905",
    "27/08/2019",
    "DOCTOR OF PHILOSOPHY",
    "COMPLETED PROGRAMME",
    "2012/2013 SEMESTER 2",
    "BL5198",
    "GRADUATE SEMINAR MODULE IN BIOLOGICAL SCIENCES",
    "BL5233",
    "Modeling in Environmental Biology with R",
    "GE5216",
    "GEOGRAPHY AND SOCIAL THEORY",
    "2012/2013 SPECIAL TERM (PART2)",
    "BL5212",
    "Critical Thinking in Biological Sciences",
    "2014/2015 SEMESTER 1",
    "BL5231",
    "Writing in the Biological Sciences",
    "2014/2015 SEMESTER 2",
    "2015/2016 SEMESTER 1",
    "2015/2016 SEMESTER 2"
  ]);

});
