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

test("Part-time Modular Certificate of Modular Courses is rendered correctly.", async t => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Statement of Results");

  await t.expect(TpLogo.exists).ok();

  // certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "DUMMY MODULAR COURSE NAME",
    "Temasek Polytechnic",
    "Registrar"
  ]);

  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "STATEMENT OF RESULTS",
    "DUMMY STUDENT NAME",
    "S0000000A",
    "1234567A",
    "DUMMY MODULAR COURSE NAME",
    "S001",
    "Dummy01 subject name",
    "Cumulative Grade Point Average",
    "5.00",
    "Certificate Awarded",
    "DUMMY MODULAR COURSE NAME",
    "WITH MERIT",
    "Grading System"
  ]);
});
