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

test("NUS-YALE-2019 degree scroll is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate/Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "National University of Singapore",
    "A0121779X, name",
    "Bachelor",
    "Arts",
    "Honours"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0121779X, name",
    "A0121779X",
    "01/01/1905",
    "20/08/2019",
    "BACHELOR OF ARTS WITH HONOURS",
    "COMPLETED PROGRAMME",
    "2014/2015 SEMESTER 1",
    "YCC1111",
    "Literature and Humanities 1",
    "2014/2015 SEMESTER 2",
    "YCC1112",
    "Literature and Humanities 2",
    "2014/2015 SPECIAL TERM (PART2)",
    "2015/2016 SEMESTER 1",
    "YCC2121",
    "Modern Social Thought",
    "2015/2016 SEMESTER 2",
    "YCC2132",
    "Foundations of Science 2",
    "2016/2017 SEMESTER 1",
    "YHU1202",
    "History and Culture of Southeast Asia",
    "2016/2017 SEMESTER 2",
    "2017/2018 SEMESTER 1",
    "EC3303",
    "Econometrics I",
    "2017/2018 SEMESTER 2",
    "YHU4206",
    "The History of History"
  ]);
});
