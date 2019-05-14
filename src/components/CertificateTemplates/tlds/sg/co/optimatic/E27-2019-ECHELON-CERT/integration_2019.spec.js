import { Selector } from "testcafe";

fixture("Optimatic Pte Ltd").page`http://localhost:3000`;

const Certificate = "./E27-TEST-2019-ECHELON-CERT.opencert";
const ButtonViewCertificateAnyway = Selector("#certificate-view-anyway");
const CertificateVerifyBlock = Selector("#certificate-verify-block");
const RenderedCertificate = Selector("#rendered-certificate");

test("E27-TEST-2019-ECHELON-CERT certificate is rendered correctly", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [Certificate]);
  await t.click(ButtonViewCertificateAnyway);
  await t
    .expect(CertificateVerifyBlock.textContent)
    .contains("Unknown Institution");

  await t.expect(RenderedCertificate.visible).ok();
  await t.expect(RenderedCertificate.textContent).contains("Mother of Dragons");
});
