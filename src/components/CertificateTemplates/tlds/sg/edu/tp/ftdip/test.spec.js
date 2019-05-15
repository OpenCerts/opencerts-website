import { Selector } from "testcafe";

fixture("Temasek Polytechnic").page`http://localhost:3000`;

const Certificate = "./sample.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Full-time Diploma is rendered correctly.", async t => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "DUMMY COURSE NAME",
    "WITH MERIT*",
    "by Temasek Polytechnic (Singapore)",
    "Exempted from satisfying the full range of assessment objectives of the diploma",
    "Principal",
    "Registrar"
  ]);

  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "999",
    "Dummy street name 1",
    "Dummy street name 2",
    "Dummy street name 3",
    "01",
    "Singapore",
    "999999",
    "S0000000A",
    "1234567A",
    "DUMMY COURSE NAME",
    "Dummy course type",
    "credit units were granted based on the following exemptions",
    "S001",
    "Dummy01 exempted subject name",
    "5",
    "Exempted",
    "AY9998/9999",
    "Dummy0 Semester",
    "S001",
    "Dummy01 subject name",
    "Dummy23 subject name *",
    "Dummy24 subject name #",
    "Cumulative Grade Point Average: 5.00",
    "Awarded the DUMMY COURSE NAME",
    "WITH MERIT",
    "# The candidate was granted partial exemption from the assessment objectives of this subject.",
    "* The candidate was granted full exemption from the assessment objectives of this subject.",
    "Grading System",
    "for REGISTRAR"
  ]);
});
