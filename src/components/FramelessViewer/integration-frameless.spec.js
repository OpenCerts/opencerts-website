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
  // Inject javascript and execute window.opencerts.renderCertificate
  const certificateContent = JSON.parse(
    readFileSync(join(__dirname, Certificate)).toString()
  );
  await t.eval(() => window.opencerts.renderCertificate(certificateContent), {
    dependencies: { certificateContent }
  });

  // Check content of window.opencerts.templates
  await t.wait(500);
  const templates = await t.eval(() => window.opencerts.templates());
  await t
    .expect(templates)
    .eql([
      { id: "certificate", label: "Certificate", template: undefined },
      { id: "transcript", label: "Transcript", template: undefined }
    ]);

  // Validate content of first tab
  await validateTextContent(t, RenderedCertificate, [
    "Principal",
    "Council Chairman",
    "A3DA180001"
  ]);

  // Navigate to next tab using window.opencerts.selectTemplateTab
  await t.eval(() => window.opencerts.selectTemplateTab(1));

  // Validate content of second tab
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT OF ACADEMIC RECORD",
    "DIRECTOR, ACADEMIC AFFAIRS"
  ]);
});
