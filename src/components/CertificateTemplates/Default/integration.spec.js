import { Selector } from "testcafe";

fixture("Default Certificate Template").page`http://localhost:3000`;

const Certificate = "./DEFAULT_CERTIFICATE.opencert";

const CertificateVerifyBlock = Selector("#certificate-verify-block");
const ButtonPrint = Selector("#btn-print");
const ButtonEmail = Selector("#btn-email");
const ButtonDownload = Selector("#btn-download");
const ButtonViewAnother = Selector("#btn-view-another");
const TabListTemplate = Selector("#template-tabs-list");
const BannerPrivacyFilter = Selector("#banner-privacy-filter");
const RenderedCertificate = Selector("#rendered-certificate");

test("Default certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Validates rendering of the certificate
  // Header items rendered
  await t
    .expect(CertificateVerifyBlock.textContent)
    .contains("Institution not in our registry");
  await t.expect(ButtonPrint.visible).ok();
  await t.expect(ButtonEmail.visible).ok();
  await t.expect(ButtonDownload.visible).ok();
  await t.expect(ButtonViewAnother.visible).ok();

  // Certificate tabs rendered
  await t.expect(TabListTemplate.textContent).contains("Certificate");

  // Privacy filter notice rendered
  await t.expect(BannerPrivacyFilter.visible).ok();
  await t
    .expect(BannerPrivacyFilter.textContent)
    .contains("OpenCerts Privacy Filter Enabled");

  // Certificate rendered
  await t.expect(RenderedCertificate.visible).ok();
  await t
    .expect(RenderedCertificate.textContent)
    .contains("Sample Certificate");
  await t
    .expect(RenderedCertificate.textContent)
    .contains("A_SAMPLE_CERTIFICATE");
  await t.expect(RenderedCertificate.textContent).contains("Issuer Info");
  await t.expect(RenderedCertificate.textContent).contains("Transcript");
});
