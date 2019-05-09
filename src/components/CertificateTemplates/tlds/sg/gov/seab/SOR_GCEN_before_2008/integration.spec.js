import { Selector } from "testcafe";

fixture("Singapore Examinations and Assessment Board (SOR_GCEN_before_2008)")
  .page`http://localhost:3000`;

const Certificate = "./SOR_ALL-1985_GCEN_10090111.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("sg/gov/seab/SOR_GCEN_before_2008 is rendered correctly", async t => {
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
    "SINGAPORE-CAMBRIDGE GENERAL CERTIFICATE OF EDUCATION NORMAL LEVEL",
    "1985",
    "S6840298",
    "1009/0111",
    "FOUR",
    "Chief Executive"
  ]);

  // Navigate to Explanatory Notes tab
  const explanatoryNotesTab = TemplateTabList.find(":nth-child(2)");
  await t.click(explanatoryNotesTab);

  // Explanatory Notes tab content
  await validateTextContent(t, RenderedCertificate, [
    "EXPLANATORY NOTES",
    "New Name",
    "Chinese as a Second Language"
  ]);
});
