import { Selector } from "testcafe";

fixture("Temasek Polytechnic").page`http://localhost:3000`;

const Certificate = "./sample.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");
const TpLogo = Selector('img[title="Temasek Polytechnic"]');
const CertisLogo = Selector('img[title="Certis"]');

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Part-time Joint Diploma with Certis is rendered correctly.", async t => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  await t.expect(TpLogo.exists).ok();
  await t.expect(CertisLogo.exists).ok();
  
  // certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "DUMMY COURSE NAME",
    "Temasek Polytechnic",
    "Principal",
    "Registrar"
  ]);


  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "ACADEMIC TRANSCRIPT",
    "DUMMY STUDENT NAME",
    "S0000000A",
    "1234567A",
    "DUMMY COURSE NAME",
    "Dummy Modular Certificate Name 1",
    "S001",
    "Dummy01 subject name",
    "Cumulative Grade Point Average",
    "5.00",
    "Certificate/Diploma Awarded",
    "Dummy Modular Certificate Name 1",
    "Dummy Modular Certificate Name 2",
    "Dummy Modular Certificate Name 3",
    "Dummy Post Diploma Certificate Name 4",
    "Dummy Post Diploma Certificate Name 5",
    "DUMMY COURSE NAME",
    "WITH MERIT",
    "Grading System"
  ]);
});
