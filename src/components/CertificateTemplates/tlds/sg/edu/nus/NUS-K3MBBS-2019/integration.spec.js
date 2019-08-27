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

test("NUS-K3MBBS-2019 degree scroll is rendered correctly", async t => {
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
    "A0119114R, NAME",
    "Bachelor",
    "Medicine",
    "Bachelor",
    "Surgery",
    "30 April 2018"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0119114R, name",
    "A0119114R",
    "01/01/1905",
    "27/08/2019",
    "BACHELOR OF MEDICINE AND BACHELOR OF SURGERY",
    "COMPLETED PROGRAMME",
    "2013/2014",
    "MD1140",
    "Normal Structure and Function",
    "2014/2015",
    "MD2140",
    "Abnormal Structure and Function",
    "MD2150",
    "Clinical Skills Foundation Programme",
    "2015/2016",
    "MD3140",
    "Core Clinical Practice",
    "2016/2017",
    "MD4140",
    "Acute and Specialty Clinical Practice",
    "MD4150",
    "Community Health Posting",
    "2017/2018",
    "MD4150",
    "Community Health Posting",
    "MD5140",
    "Medicine",
    "MD5150",
    "Surgery",
    "MD5160",
    "Electives"
  ]);
});
