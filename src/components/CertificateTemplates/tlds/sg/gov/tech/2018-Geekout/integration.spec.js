import { Selector } from "testcafe";

fixture("GovTech Geekout 2018").page`http://localhost:3000`;

const Certificate = "./certificate.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("sg/gov/tech/2018-Geekout is rendered correctly", async t => {
  // Uploads and click link certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");

  // SOR tab content
  await validateTextContent(t, RenderedCertificate, [
    "The Student Name",
    "Kok Ping Soon",
    "Chief Executive"
  ]);
});
