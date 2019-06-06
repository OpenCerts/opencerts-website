import { Selector } from "testcafe";

fixture("Republic Polytechnic").page`http://localhost:3000`;

const Certificate = "./RP_MCJP_15060278.opencert";

const TemplateTabList = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("MC certificate Joint Poly is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TemplateTabList.textContent).contains("Certificate");
  await t.expect(TemplateTabList.textContent).contains("Transcript");

  // Certificate tab content
  await validateTextContent(t, RenderedCertificate, [
    "LYON LIM",
    "Modular Certificate",
    "Diploma",
    "PRINCIPAL OF THE POLYTECHNIC",
    "RPCETD18/01632"
  ]);

  // Navigate to Transcript tab
  const transcriptTab = TemplateTabList.find(":nth-child(2)");
  await t.click(transcriptTab);

  // Transcript tab content
  await validateTextContent(t, RenderedCertificate, [
    "TRANSCRIPT",
    "LYON LIM",
    "S0002434A",
    "15060278",
    "Director"
  ]);
});
