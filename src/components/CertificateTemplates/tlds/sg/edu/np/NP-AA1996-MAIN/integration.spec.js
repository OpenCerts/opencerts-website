import { Selector } from "testcafe";

fixture("Ngee Ann Polytechnic").page`http://localhost:3000`;

const Certificate = "./NP_Certs_FT_MAIN_1996.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("FT-MAIN 1996 certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Student Name MAIN Cert 1996",
    "Animation & 3D Arts",
    "having duly completed the approved course of study",
    "Diploma",
    "Animation & 3D Arts",
    "Principal",
    "Council Chairman",
    "MAY 1996",
    "001"
  ]);
});
