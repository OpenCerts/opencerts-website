import fs from "fs";
import downloadsFolder from "downloads-folder";
import { Selector } from "testcafe";

fixture("Download Certificate").page`http://localhost:3000`;

const Document = "./fixture/sample-dns-verified.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const StatusButton = Selector("#certificate-status");
const CertificateStatusBanner = Selector("#status-banner-container");
const DownloadLink = Selector("a").withAttribute("download");
const DownloadButton = Selector("#btn-download");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Sample document with no special characters is downloaded correctly", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["Certificate issued by EXAMPLE.OPENATTESTATION.COM"]);

  const fileName = await DownloadLink.getAttribute("download");
  const filePath = `${downloadsFolder()}\\${fileName}`;
  await t.click(DownloadButton);
  await t.wait(5000);
  await t.expect(fs.exists(filePath)).eql(true);
  console.log(filePath);

  await fs.readFile(filePath);
  // await t.expect(fs.readFileSync(filePath)).eql(Document);
});
