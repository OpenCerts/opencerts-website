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

test("NUS-K7MPAS-2019 degree scroll is rendered correctly", async t => {
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
    "A0005366L, NAME",
    "Graduate",
    "Diploma",
    "Maritime",
    "Port",
    "Management",
    "08 September 2006"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0005366L, name",
    "A0005366L",
    "01/01/1905",
    "27/08/2019",
    "GRADUATE DIPLOMA IN MARITIME AND PORT MANAGEMENT",
    "COMPLETED PROGRAMME",
    "2005/2006 SPECIAL TERM (PART1)",
    "MPA5017",
    "MARITIME MANAGEMENT & LAW",
    "MPA5018",
    "PORT TERMINAL MANAGEMENT",
    "MPA5019",
    "PORT PLANNING AND MARINE OPERATIONS MANAGAMENT",
    "MPA5027",
    "SHIPPING, PORTS AND DEVELOPMENT",
    "MPA5028",
    "PORT MANAGEMENT AND OPERATIONS",
    "MPA5029",
    "PORT ECONOMICS"
  ]);
});
