import { Selector } from "testcafe";
import { readFileSync } from "fs";
import { join } from "path";

fixture("Frameless Viewer").page`http://localhost:3000/frameless-viewer`;

const Certificate = "./NP_CERT_FT_MAIN_2018.opencert";

const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Default certificate is rendered correctly", async t => {
  // Inject javascript and execute window.renderCertificate
  const certificateContent = JSON.parse(
    readFileSync(join(__dirname, Certificate)).toString()
  );
  await t.eval(() => window.renderCertificate(certificateContent), {
    dependencies: { certificateContent }
  });

  // Check content of window.templates
  await t.wait(500);
  const templates = await t.eval(() => window.templates());
  await t
    .expect(templates)
    .eql([
      { id: "certificate", label: "Certificate", template: undefined },
      { id: "transcript", label: "Transcript", template: undefined }
    ]);

  // Validate content of first tab
  await validateTextContent(t, RenderedCertificate, [
    "Student Name MAIN Cert 2018",
    "Diploma with Merit",
    "Animation & 3D Arts",
    "Principal",
    "Council Chairman",
    "MAY 2018",
    "A3DA180001"
  ]);

  // Navigate to next tab using window.selectTemplateTab
  await t.eval(() => window.selectTemplateTab(1));

  // Validate content of second tab
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "PASS WITH MERIT",
    "0000001",
    "Student Name MAIN Cert 2018",
    "S1234567A",
    "APRIL 2014",
    "MOLECULAR BIOTECHNOLOGY",
    "MINDWORKS",
    "ANIMATION & 3D ARTS",
    "WORLD ISSUES: A SINGAPORE PERSPECTIVE",
    "National Physical Fitness Award",
    "allowed a transfer",
    "National Physical Fitness Award",
    "Graduating GPA: 3.7835",
    "Professional Preparation Programme",
    "The student has completed the full-time course in Diploma in Biomedical Science",
    "DIRECTOR, ACADEMIC AFFAIRS"
  ]);
});
