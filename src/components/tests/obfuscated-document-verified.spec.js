import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

fixture("Obfuscate Note Rendering").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const Document = "./fixture/obfuscated-document.json";
const IframeBlock = Selector("#iframe");
const StatusButton = Selector("#certificate-status");
const SampleTemplate = Selector("#rendered-certificate");
const CertificateStatusBanner = Selector("#status-banner-container");
const ObfuscationNote = Selector("#obfuscation-note");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Sample document is rendered correctly when single registry is verified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["ROPSTEN: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)"]);

  await validateTextContent(t, CertificateStatusBanner, [
    "Certificate issuer is in the SkillsFuture Singapore registry for Opencerts",
  ]);
  await validateTextContent(t, ObfuscationNote, [
    "The owner of this certificate have chosen not to share certain information in the certificate with you. Please note that this does not affect the authenticity of the certificate.",
  ]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "OpenCerts Demo",
    "Your Name",
    "has successfully completed the",
    "John Demo",
  ]);
});
