import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

fixture("Unverified Certificate Rendering").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const Certificate = "./fixture/unverified-issuer.json";

const RenderedCertificate = Selector("#certificate-dropzone");
const InvalidMessage = Selector(".invalid");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Error view rendered when certificate issuers are unverified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await InvalidMessage.with({ visibilityCheck: true })();

  await validateTextContent(t, RenderedCertificate, [
    "Certificate issuer identity is invalid",
    "This certificate was issued by an invalid issuer.",
  ]);
});
