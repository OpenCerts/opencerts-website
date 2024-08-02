import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";
import { validateTextContent } from "../../components/tests/utils";

fixture("Wrong Merkle Cert").page`http://localhost:3000`.beforeEach(async (t) => {
  await t.wait(1000);
  await waitForReact();
});

const Certificate1 = "./wrong-merkle-odd-length.opencert";
const Certificate2 = "./wrong-merkle-incorrect-length.opencert";
const Certificate3 = "./wrong-merkle-arrayify-value.opencert";

const RenderedCertificate = Selector("#certificate-dropzone");
const InvalidMessage = Selector('[data-testid="invalid-message"]');

test("Merkle root that is of odd-length should result in correct error message", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Certificate1]);

  await InvalidMessage.with({ visibilityCheck: true })();

  // Internally, Ethers would return INVALID_ARGUMENT with "hex data is odd-length"
  await validateTextContent(t, RenderedCertificate, [
    "This certificate is not valid",
    "Certificate has been tampered with",
    "Certificate's merkle root is invalid",
  ]);
});

test("Merkle root that is of incorrect length should result in correct error message", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Certificate2]);

  await InvalidMessage.with({ visibilityCheck: true })();

  // Internally, Ethers would return INVALID_ARGUMENT with "incorrect data length" as merkle roots should be 64 char
  await validateTextContent(t, RenderedCertificate, [
    "This certificate is not valid",
    "Certificate has been tampered with",
    "Certificate's merkle root is invalid",
  ]);
});

test("Merkle root that contains non-hexadecimal characters should result in correct error message", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Certificate3]);

  await InvalidMessage.with({ visibilityCheck: true })();

  // Internally, Ethers would return INVALID_ARGUMENT with "invalid arraryify value"
  // as merkle root should only contain hexadecimal values
  await validateTextContent(t, RenderedCertificate, [
    "This certificate is not valid",
    "Certificate has been tampered with",
    "Certificate's merkle root is invalid",
  ]);
});
