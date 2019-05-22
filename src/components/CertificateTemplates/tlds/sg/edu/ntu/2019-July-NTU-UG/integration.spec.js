// eslint-disable-next-line import/no-extraneous-dependencies
import { Selector } from "testcafe";

// eslint-disable-next-line
fixture("Nanyang Technological University (Undergrad)")
  .page`http://localhost:3000`;

const Certificate = "./ntu_cert_1.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("NTU Undergrad certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "NTU Student Name",
    "NTU Degree in EEE"
  ]);
});
