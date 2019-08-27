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

test("NUS-K4MBACN-2019 degree scroll is rendered correctly", async t => {
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
    "A0049058Y, NAME",
    "Master",
    "Business",
    "Administration",
    "30 June 2011"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0049058Y, name",
    "A0049058Y",
    "01/01/1905",
    "27/08/2019",
    "MASTER OF BUSINESS ADMINISTRATION (CONDUCTED IN CHINESE)",
    "COMPLETED PROGRAMME",
    "2009/2010 SEMESTER 1",
    "BMC5001",
    "LEADERSHIP AND MANAGERIAL SKILLS",
    "BMC5002",
    "Corporate Strategy For 21st-Century Organisations",
    "BMC5003",
    "DECISION MAKING USING THE INFORMATION AGE TECHNOLOGIES",
    "BMC5004",
    "Business Environment In Asia",
    "2009/2010 SEMESTER 2",
    "BMC5006",
    "THE ASIAN CONSUMER AND MARKETING MANAGEMENT",
    "BMC5007",
    "ACCOUNTING AND MANAGEMENT OF FINANCIAL RESOURCES",
    "BMC5009",
    "SYSTEM OPERATION AND PRODUCTION MANAGEMENT",
    "2010/2011 SEMESTER 1",
    "BMC5008",
    "Cross-Cultural Human Resource Management",
    "BMC5010",
    "Corporate Finance And Corporate Governance",
    "2010/2011 SEMESTER 2",
    "BMC5005",
    "INTERNATIONAL BUSINESS AND LAW",
    "BMC5011",
    "SPECIAL TOPIC",
    "BMC5012",
    "ADVANCED STUDY PROJECT"
  ]);

});
