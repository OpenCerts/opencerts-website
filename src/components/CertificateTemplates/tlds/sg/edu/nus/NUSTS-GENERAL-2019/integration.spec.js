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

test("NUSTS-GENERAL-2019 degree scroll is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate/Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "A0056627Y, NAME",
    "A0056627Y",
    "01/01/1905",
    "27/08/2019",
    "BACHELOR OF ENGINEERING (MECHANICAL ENGINEERING)",
    "COMPLETED PROGRAMME",
    "2009/2010 SEMESTER 1",
    "MA1301",
    "Introductory Mathematics",
    "ME2103",
    "Engineering Visualization & Modeling",
    "ME2113",
    "Mechanics Of Materials I",
    "ME2134",
    "Fluid Mechanics I",
    "PC1222",
    "Fundamentals of Physics II",
    "2009/2010 SEMESTER 2",
    "MA1505",
    "Mathematics I",
    "ME2101",
    "Fundamentals Of Mechanical Design",
    "ME2135",
    "Fluid Mechanics II",
    "MLE1101",
    "Introductory Materials Science And Engineering",
    "PC1431",
    "Physics IE",
    "2010/2011 SEMESTER 1",
    "MA1505",
    "Mathematics I",
    "MA1506",
    "Mathematics II",
    "ME2121",
    "Engineering Thermodynamics",
    "ME2151",
    "Principles of Mechanical Eng. Materials",
    "ME3101",
    "Mechanical Systems Design I",
    "ME3112",
    "Mechanics Of Machines",
    "2010/2011 SEMESTER 2",
    "ME2114",
    "Mechanics Of Materials II",
    "ME2135",
    "Fluid Mechanics II",
    "ME2142",
    "Feedback Control Systems",
    "ME2143",
    "Sensors & Actuators",
    "ME3102",
    "Mechanical Systems Design II",
    "ME3241",
    "Microprocessor Applications",
    "2011/2012 SEMESTER 1",
    "MA1505",
    "Mathematics I",
    "ME2121",
    "Engineering Thermodynamics",
    "ME3122",
    "Heat Transfer",
    "ME3162",
    "Manufacturing Processes",
    "ME3242",
    "Industrial Automation",
    "2011/2012 SEMESTER 2",
    "EG2401",
    "Engineering Professionalism",
    "ME2135",
    "Fluid Mechanics II",
    "ME3281",
    "Microsystems Design And Applications",
    "ME4101A",
    "Bachelor Of Engineering Dissertation",
    "ME4262",
    "Automation In Manufacturing",
    "ME4284",
    "Micro Sensors & Micro Actuators",
    "2012/2013 SEMESTER 1",
    "GEK1521",
    "Physics in the Life Sciences",
    "ME3261",
    "Computer-Aided Design And Manufacturing",
    "ME4101A",
    "Bachelor Of Engineering Dissertation",
    "SSA2204",
    "Nation-Building in Singapore",
    "2012/2013 SEMESTER 2",
    "LAK1201",
    "Korean 1",
    "ME2135",
    "Fluid Mechanics II",
    "ME4262",
    "Automation In Manufacturing"
  ]);

});
