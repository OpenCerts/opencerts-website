import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

fixture("Tampered Cert").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const Certificate = "./tampered.opencert";

const RenderedCertificate = Selector("#certificate-dropzone");
const InvalidMessage = Selector(".invalid");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Tampered certificate's error message is correct", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await InvalidMessage.with({ visibilityCheck: true })();

  await validateTextContent(t, RenderedCertificate, [
    "This certificate is not valid",
    "Certificate has been tampered with",
  ]);
});
