import { Selector, ClientFunction } from "testcafe";

fixture("Govtech DemoCert").page`http://localhost:3000`;

const Certificate =
  "../../components/CertificateTemplates/tlds/sg/gov/tech/Govtech-Demo-Cert/Ropsten-Demo.json";

const RenderedCertificate = Selector("#rendered-certificate");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("DEMO certificate is rendered correctly", async t => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await validateTextContent(t, RenderedCertificate, [
    "Your Name",
    "SXXXXXXXY",
    "123456",
    "53b75bbe",
    "CS 1110",
    "Introduction to Programming",
    "A+",
    "3"
  ]);

  await ClientFunction(() => window.history.back())();
  await t.setFilesToUpload("input[type=file]", [Certificate]);
  await validateTextContent(t, RenderedCertificate, [
    "Your Name",
    "SXXXXXXXY",
    "123456",
    "53b75bbe",
    "CS 1110",
    "Introduction to Programming",
    "A+",
    "3"
  ]);
});
