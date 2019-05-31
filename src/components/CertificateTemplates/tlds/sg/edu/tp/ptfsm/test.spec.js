import { Selector } from "testcafe";

fixture("Temasek Polytechnic").page`http://localhost:3000`;

const Certificate = "./sample.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");
const TpLogo = Selector('img[title="Temasek Polytechnic"]');
const ScdfLogo = Selector('img[title="Singapore Civil Defence Force"]');

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Part-time Joint Certificate with SCDF is rendered correctly.", async t => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await t.expect(TemplateTabList.textContent).contains("Certificate");

  await t.expect(TpLogo.exists).ok();
  await t.expect(ScdfLogo.exists).ok();

  // certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Accredited Training Institution Scheme",
    "Fire Safety Manager",
    "DUMMY STUDENT NAME",
    "Dummy Subject Certificate Name 1",
    "DUMMY COURSE NAME",
    "Director",
    "Civil Defence Academy",
    "Registrar",
    "Temasek Polytechnic"
  ]);
});
