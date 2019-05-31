import { Selector } from "testcafe";

fixture("Temasek Polytechnic").page`http://localhost:3000`;

const Certificate = "./sample.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");
const TpLogo = Selector('img[title="Temasek Polytechnic"]');

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Part-time Post Diploma Certificate is rendered correctly.", async t => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await t.expect(TemplateTabList.textContent).contains("Certificate");

  await t.expect(TpLogo.exists).ok();

  // certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "Dummy Post Diploma Certificate Name 4",
    "DUMMY COURSE NAME",
    "Registrar"
  ]);
});
