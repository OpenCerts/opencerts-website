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

test("NUS-UMJDP-2019 degree scroll is rendered correctly", async t => {
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
    "A0045456A, NAME",
    "Bachelor",
    "Engineering",
    "(Civil",
    "Engineering)",
    "30 June 2012"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0045456A, name",
    "A0045456A",
    "01/01/1905",
    "20/08/2019",
    "BACHELOR OF ENGINEERING (CIVIL ENGINEERING)",
    "COMPLETED PROGRAMME",
    "2008/2009 SEMESTER 1",
    "CS1101C",
    "Programming Methodology",
    "2008/2009 SEMESTER 2",
    "EG1109",
    "Statics And Mechanics Of Materials",
    "2009/2010 SEMESTER 1",
    "CE2134",
    "Hydraulics",
    "2009/2010 SEMESTER 2",
    "CE2112",
    "Soil Mechanics",
    "2009/2010 SPECIAL TERM (PART1)",
    "GEK1505",
    "Living with Mathematics",
    "2010/2011 SEMESTER 1",
    "2010/2011 SEMESTER 2",
    "2011/2012 SEMESTER 1",
    "2011/2012 SEMESTER 2",
    "CE4104",
    "B. Eng. Dissertation"
  ]);
});
