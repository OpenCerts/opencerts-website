import { Selector } from "testcafe";

fixture("Unissued Cert").page`http://localhost:3000`;

const Certificate = "./unissued.opencert";

const RenderedCertificate = Selector("#certificate-dropzone");
const InvalidMessage = Selector(".invalid");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Unissued certificate's error message is correct'", async t => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await InvalidMessage.with({ visibilityCheck: true })();

  await validateTextContent(t, RenderedCertificate, [
    "Certificate not issued",
    "This certificate cannot be found. Please contact your issuing institution for help or issue the certificate before trying again."
  ]);
});
