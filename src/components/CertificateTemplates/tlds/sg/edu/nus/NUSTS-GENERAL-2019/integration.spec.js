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

test("NUSTS-GENERAL-2019 degree scroll is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate/Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "A0056627Y, NAME",
    "A0056627Y",
    "01/01/1905",
    "11/07/2019",
    "BACHELOR OF ENGINEERING (MECHANICAL ENGINEERING)",
    "COMPLETED PROGRAMME",
    "2009/2010 SEMESTER 1",
    "MA1301",
    "Introductory Mathematics",
    "2009/2010 SEMESTER 2",
    "MA1505",
    "Mathematics I",
    "2010/2011 SEMESTER 1",
    "MA1505",
    "Mathematics I",
    "2010/2011 SEMESTER 2",
    "ME2114",
    "Mechanics Of Materials II",
    "2011/2012 SEMESTER 1",
    "MA1505",
    "Mathematics I",
    "2011/2012 SEMESTER 2",
    "EG2401",
    "Engineering Professionalism",
    "2012/2013 SEMESTER 1",
    "GEK1521",
    "Physics in the Life Sciences",
    "2012/2013 SEMESTER 2",
    "LAK1201",
    "Korean 1"
  ]);
});
