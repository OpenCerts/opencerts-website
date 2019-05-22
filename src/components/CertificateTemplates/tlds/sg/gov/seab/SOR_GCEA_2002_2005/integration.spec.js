import { Selector } from "testcafe";

fixture("Singapore Examinations and Assessment Board (SOR_GCEA_2002_2005)")
  .page`http://localhost:3000`;

const Certificate = "./SOR_ALL-2002_GCEA_30111602.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("sg/gov/seab/SOR_GCEA_2002_2005 is rendered correctly", async t => {
  // Uploads and click link certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Statement of Results");
  await t.expect(TemplateTabList.textContent).contains("Explanatory Notes");

  // SOR tab content
  await validateTextContent(t, RenderedCertificate, [
    "I certify that in the",
    "Examination held in the year",
    "Candidate",
    "NRIC/Foreign Identification No.",
    "Index No.",
    "obtained the grades for the subjects stated below:",
    "SUBJECT",
    "GRADE",
    "LEVEL",
    "Total number of subjects recorded:",
    "This statement is issued to",
    "Singapore Examinations and Assessment Board",
    "SINGAPORE-CAMBRIDGE GENERAL CERTIFICATE OF EDUCATION ADVANCED LEVEL",
    "3011/1602",
    "ONE",
    "Chief Executive"
  ]);

  // Navigate to Explanatory Notes tab
  const explanatoryNotesTab = TemplateTabList.find(":nth-child(2)");
  await t.click(explanatoryNotesTab);

  // Explanatory Notes tab content
  await validateTextContent(t, RenderedCertificate, [
    "EXPLANATORY NOTES",
    "REMARKS",
    "As of 2002, subjects taken under access arrangements are annotated with the following symbols:",
    "Fail"
  ]);
});
