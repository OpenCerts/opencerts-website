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

test("Polytechnic Foundation Programme is rendered correctly.", async t => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "Polytechnic",
    "Foundation Programme"
  ]);

  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "DUMMY STUDENT NAME",
    "S0000000A",
    "1234567A",
    "S001",
    "Dummy01 subject name",
    "COMPLETED POLYTECHNIC FOUNDATION PROGRAMME",
    "Grading System"
  ]);
});
