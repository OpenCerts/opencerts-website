import { Selector } from "testcafe";

fixture("Ropsten : Skillsfuture Singapore").page`http://localhost:3000`;

const Certificate = "./Trans_S0000000A_18T000000012381.OPENCERT";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Transcript certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "Healthcare Support",
    "Name: Lee1",
    "ID No.: S0000000A",
    "Qualification:",
    "Healthcare Support",
    "CONFERMENT: CONFERRED THE Healthcare Support on 20 Nov 2018",
    "REMARKS:"
  ]);
});
