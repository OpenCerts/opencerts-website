import { Selector } from "testcafe";

fixture("National University of Singapore").page`http://localhost:3000`;

const Certificate = "./sample.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("NUS-K6CAAS-2019 degree scroll is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate/Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "NATIONAL",
    "UNIVERSITY",
    "OF SINGAPORE",
    "A0006190U, NAME",
    "Graduate",
    "Diploma",
    "Aviation",
    "Management",
    "26 November 2008"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0006190U, name",
    "A0006190U",
    "01/01/1905",
    "27/08/2019",
    "GRADUATE DIPLOMA IN AVIATION MANAGEMENT",
    "COMPLETED PROGRAMME",
    "2007/2008 SPECIAL TERM (PART1)",
    "AM5011",
    "AIRPORT ADMINISTRATION, FINANCE & LAW",
    "AM5012",
    "AIRPORT OPERATIONS",
    "AM5013",
    "AIRPORT PLANNING, DESIGN & ENGINEERING",
    "AM5021",
    "TRANSPORTATION ECONOMICS",
    "AM5022",
    "TRANSPORTATION & DEVELOPMENT",
    "AM5023",
    "MANAGEMENT IN TRANSPORTATION"
  ]);
});
