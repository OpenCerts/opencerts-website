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

test("NUS K1 degree scroll is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("NUS Degree");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "NATIONAL UNIVERSITY",
    "OF SINGAPORE",
    "TAN BOON WU AARON",
    "BACHELOR OF APPLIED SCIENCE",
    "SECOND CLASS HONOURS (UPPER)",
    "28 February 2015",
    "Chair, Board of Trustees",
    "President"
  ]);
});
