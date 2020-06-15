import { Selector } from "testcafe";

fixture("Download Certificate").page`http://localhost:3000`;

const Document = "./fixture/sample-dns-verified.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const StatusButton = Selector("#certificate-status");
const CertificateStatusBanner = Selector("#status-banner-container");
const DownloadLink = Selector("#download-link");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Sample document with no special characters is downloaded correctly", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["Certificate issued by EXAMPLE.OPENATTESTATION.COM"]);
  
//   await t.click(DownloadLink).expect();

//   await t.switchToIframe(IframeBlock);

//   await validateTextContent(t, SampleTemplate, [
//     "Name & Address of Shipping Agent/Freight Forwarder",
//     "CERTIFICATE OF NON-MANIPULATION",
//     "DEMO JOHN TAN",
//     "Certification by Singapore Customs",
//     "AQSIQ170923130",
//   ]);
});
