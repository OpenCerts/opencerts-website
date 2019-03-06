// eslint-disable-next-line import/no-extraneous-dependencies
import { Selector } from "testcafe";

// eslint-disable-next-line
fixture("Default Certificate Template").page`http://localhost:3000`;

const Certificate = "./NP_Certs_FT_BMS.opencert";

const ButtonViewCertificateAnyway = Selector("#certificate-view-anyway");
const TabListTemplate = Selector("#template-tabs-list");
const RenderedCertificate = Selector("#rendered-certificate");

test.only("Default certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  // Certificate tabs rendered
  await t.expect(TabListTemplate.textContent).contains("Certificate");
  await t.expect(TabListTemplate.textContent).contains("Transcript");

  // Certificate tab content
  await t
    .expect(RenderedCertificate.textContent)
    .contains("Student Name BMS Cert");
  await t
    .expect(RenderedCertificate.textContent)
    .contains("Diploma with Merit");
  await t
    .expect(RenderedCertificate.textContent)
    .contains("Biomedical Science");
  await t.expect(RenderedCertificate.textContent).contains("Principal");
  await t.expect(RenderedCertificate.textContent).contains("Council Chairman");
  await t
    .expect(RenderedCertificate.textContent)
    .contains("Chief Executive Officer");
  await t
    .expect(RenderedCertificate.textContent)
    .contains("National University Hospital");
  /*
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
  */
  await t.wait(10000);
});
