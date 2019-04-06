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

test("Certificate is rendered correctly.", async t => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "CHARLES MOHAMED MD NANWANI",
    "Diploma in Computer Engineering"
  ]);

  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "CHARLES MOHAMED MD NANWANI",
    "S0367893H",
    "0833994G",
    "DIPLOMA IN COMPUTER ENGINEERING",
    "GCD1001",
    "Applied Principles for Effective Living 1",
    "Cumulative Grade Point Average: 1.9",
    "Awarded the DIPLOMA IN COMPUTER ENGINEERING",
    "Grading System"
  ]);
});
