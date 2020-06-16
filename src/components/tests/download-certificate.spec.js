import { existsSync, readFileSync, unlinkSync } from "fs";
import downloadsFolder from "downloads-folder";
import { Selector } from "testcafe";
import TestDocument1 from "./fixture/sample-dns-verified.json";
import TestDocument2 from "./fixture/sample-dns-verified-special-characters.json";

fixture("Download Certificate").page`http://localhost:3000`;

const Document1 = "./fixture/sample-dns-verified.json";
const Document2 = "./fixture/sample-dns-verified-special-characters.json";
const StatusButton = Selector("#certificate-status");
const DownloadLink = Selector("a").withAttribute("download");
const DownloadButton = Selector("#btn-download");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Sample document is downloaded correctly", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document1]);

  await validateTextContent(t, StatusButton, ["Certificate issued by EXAMPLE.OPENATTESTATION.COM"]);

  // Simulate an OpenCert file download
  const fileName = await DownloadLink.getAttribute("download");
  const filePath = `${downloadsFolder()}\\${fileName}`;
  await t.click(DownloadButton);
  await t.wait(5000);
  await t.expect(existsSync(filePath)).eql(true);

  // We expect the contents of the input to match the downloaded file
  await t.expect(JSON.parse(readFileSync(filePath, "utf8"))).eql(TestDocument1);

  // Clean up
  await unlinkSync(filePath);
});

test("Sample document with special characters is downloaded correctly", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document2]);

  await validateTextContent(t, StatusButton, ["Certificate issued by EXAMPLE.OPENATTESTATION.COM"]);

  // Simulate an OpenCert file download
  const fileName = await DownloadLink.getAttribute("download");
  const filePath = `${downloadsFolder()}\\${fileName}`;
  await t.click(DownloadButton);
  await t.wait(5000);
  await t.expect(existsSync(filePath)).eql(true);

  // We expect the contents of the input to match the downloaded file
  await t.expect(JSON.parse(readFileSync(filePath, "utf8"))).eql(TestDocument2);

  // Clean up
  await unlinkSync(filePath);
});
