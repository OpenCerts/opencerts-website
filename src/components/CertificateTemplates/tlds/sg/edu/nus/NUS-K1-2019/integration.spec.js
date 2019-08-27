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

test("NUS-K1-2019 degree scroll is rendered correctly", async t => {
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
    "A0127136L, NAME",
    "Bachelor",
    "Business",
    "Administration",
    "30 June 2018"
  ]);
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);
  await validateTextContent(t, RenderedCertificate, [
    "A0127136L, name",
    "A0127136L",
    "01/01/1905",
    "27/08/2019",
    "BACHELOR OF BUSINESS ADMINISTRATION",
    "COMPLETED PROGRAMME",
    "2014/2015 SEMESTER 1",
    "BFS1001",
    "Personal Development & Career Management",
    "BSP1005",
    "Managerial Economics",
    "DSC1007",
    "Business Analytics - Models & Decisions",
    "ES2002",
    "Business Communication",
    "GEK1540",
    "Modern Technology in Medicine and Health",
    "MKT1003",
    "Marketing",
    "2014/2015 SEMESTER 2",
    "ACC1002",
    "Financial Accounting",
    "BSP1004",
    "Legal Environment Of Business",
    "DSC2006",
    "Operations Management",
    "GEK1055",
    "The Theatre Experience",
    "MNO1001",
    "Management And Organisation",
    "2015/2016 SEMESTER 1",
    "ACC2002",
    "Managerial Accounting",
    "DSC2008",
    "Business Analytics - Data & Decisions",
    "HY1101E",
    "Asia and the Modern World",
    "MNO2007",
    "Leadership and Ethics",
    "NM1101E",
    "Communications, New Media and Society",
    "PL1101E",
    "Introduction to Psychology",
    "2015/2016 SEMESTER 2",
    "BFS2001",
    "Personal Development and Career Management II",
    "BSP2001",
    "Macro And International Economics",
    "CH2293",
    "Introduction to Chinese Art (taught in English)",
    "FIN2004",
    "Finance",
    "MKT2401B",
    "Asian Markets And Marketing Management",
    "MNO2009",
    "Entrepreneurship",
    "2015/2016 SPECIAL TERM(PART 2)",
    "2016/2017 SEMESTER 1",
    "BSP2005",
    "Asian Business Environments",
    "CH2291",
    "Chinese Tradition (taught in English)",
    "MKT2412",
    "Global Marketing",
    "MKT3402A",
    "Consumer Behaviour",
    "TS2232",
    "Introduction to Asian Theatre",
    "2016/2017 SPECIAL TERM(PART 2)",
    "2017/2018 SEMESTER 1",
    "GEK1007",
    "Chinese Heritage: History and Literature",
    "LAJ1201",
    "Japanese 1",
    "MKT3428",
    "Wealth Management Marketing",
    "MKT4412",
    "Marketing Theory: Cultivating Critical Thinking",
    "MKT4420",
    "Marketing Analytics",
    "MUH2203",
    "Music of the Church and State",
    "2017/2018 SEMESTER 2",
    "FSP4003",
    "Field Service Project",
    "GEK1018",
    "Economic Issues in the Developing World",
    "GEK1900",
    "Public Health in Action",
    "MKT4413",
    "Pricing Strategy",
    "SSA1206",
    "Representing Singapore"
  ]);

});
