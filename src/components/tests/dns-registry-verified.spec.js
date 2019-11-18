import { Selector } from "testcafe";

fixture("DNS and Registry Verified for Certificate Rendering")
  .page`http://localhost:3000`;

const Document = "./fixture/sample-registry-dns-verified.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");
const CertificateStatusBanner = Selector("#status-banner-container");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Sample document is rendered correctly when dns and registry is verified", async t => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, [
    "Certificate issued by ROPSTEN: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)"
  ]);

  await validateTextContent(t, CertificateStatusBanner, [
    "Certificate issuer is in the SkillsFuture Singapore registry for Opencerts"
  ]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "OpenCerts Demo",
    "Mr Blockchain",
    "has successfully completed the"
  ]);
});
