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

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "the National University of Singapore",
    "the College",
    "Bachelor of Arts With Honours with Magna Cum Laude",
    "this thirtieth day of June two thousand and eighteen"
  ]);
});
