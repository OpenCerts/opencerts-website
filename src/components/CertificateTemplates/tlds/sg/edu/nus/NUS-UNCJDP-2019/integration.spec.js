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

test("NUS-UNCJDP-2019 degree scroll is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate/Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "National University of Singapore",
    "a0130104h, name",
    "Bachelor",
    "Arts"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0130104H, name",
    "A0130104H",
    "01/01/1905",
    "20/08/2019",
    "BACHELOR OF ARTS",
    "COMPLETED PROGRAMME",
    "2014/2015 SEMESTER 1",
    "EL1101E",
    "The Nature of Language",
    "2014/2015 SEMESTER 2",
    "GE2101",
    "Methods and Practices in Geography",
    "2015/2016 SEMESTER 1",
    "2015/2016 SEMESTER 2",
    "2016/2017 SEMESTER 1",
    "GE2215",
    "Introduction to GIS & Remote Sensing",
    "2016/2017 SEMESTER 2",
    "GE3240",
    "Geographical Research: Developing Ideas",
    "2017/2018 SEMESTER 1",
    "GE4204",
    "Urban Space:Critical Perspectives",
    "2017/2018 SEMESTER 2",
    "GE4102",
    "Geography in the Contemporary World"
  ]);
});
