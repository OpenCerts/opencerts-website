import { Selector } from "testcafe";

fixture("ROPSTEN : Skillsfuture Singapore").page`http://localhost:3000`;

const Certificate = "./Trans.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Trans_Reprint certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "OFFICIAL TRANSCRIPT",
    "Name: Lee1",
    "ID No.: S0000000A",
    "Qualification:",
    "Higher Certificate in Healthcare Support - Podiatry Support",
    "CONFERMENT: CONFERRED THE Higher Certificate in Healthcare Support - Podiatry Support on 20 Nov 2018"
  ]);
});
