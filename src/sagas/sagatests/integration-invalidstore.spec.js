import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";
import { validateTextContent } from "../../components/tests/utils";

fixture("Invalid Store Cert").page`http://localhost:3000`.beforeEach(async (t) => {
  await t.wait(1000);
  await waitForReact();
});

const Certificate = "./invalidstore.opencert";

const RenderedCertificate = Selector("#certificate-dropzone");
const InvalidMessage = Selector('[data-testid="invalid-message"]');

test("Invalid Store certificate's error message is correct", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await InvalidMessage.with({ visibilityCheck: true })();

  await validateTextContent(t, RenderedCertificate, [
    "This certificate is not valid",
    "Certificate store address is invalid",
  ]);
});
