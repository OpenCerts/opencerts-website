import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

fixture("Contract Not Found").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const Certificate = "./sample-mainnet.opencert";

const RenderedCertificate = Selector("#certificate-dropzone");
const InvalidMessage = Selector(".invalid");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

// Contract not found means that the contract address is perfectly valid, but it does not exist on the network
test("Mainnet certificate should result in contract not found error message on ropsten", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await InvalidMessage.with({ visibilityCheck: true })();

  await validateTextContent(t, RenderedCertificate, [
    "This certificate is not valid",
    "Certificate store address cannot be found",
  ]);
});
