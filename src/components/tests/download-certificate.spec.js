import { existsSync, readFileSync, unlinkSync } from "fs";
import { join } from "path";
import downloadsFolder from "downloads-folder";
import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";
import TestDocument2 from "./fixture/sample-dns-verified-special-characters.json";
import TestDocument1 from "./fixture/sample-dns-verified.json";

import { validateTextContent } from "./utils";

fixture("Download Certificate").page`http://localhost:3000`
  .afterEach(async (t) => {
    // Clean up files after each test
    const filePath = t.ctx.filePath;
    await unlinkSync(filePath);
  })
  .beforeEach(async () => {
    await waitForReact();
  });

const Document1 = "./fixture/sample-dns-verified.json";
const Document2 = "./fixture/sample-dns-verified-special-characters.json";
const StatusButton = Selector("#certificate-status");
const DownloadLink = Selector("a").withAttribute("download");
const DownloadButton = Selector("#btn-download");

// From https://stackoverflow.com/a/57624660/950462
const waitForFileDownload = async (t, filePath) => {
  // Timeout after 10 seconds
  for (let i = 0; i < 100; i++) {
    if (existsSync(filePath)) return true;
    await t.wait(100);
  }
  return existsSync(filePath);
};

// From https://gist.github.com/AlexKamaev/8c1eb8a5fb638fa366b44447f6d7c5a4?permalink_comment_id=3616449#gistcomment-3616449
async function enableDownloadForHeadlessChrome(t) {
  if (t.browser.alias !== "chrome:headless") return;
  const browserConnection = t.testRun.browserConnection;
  const browser = browserConnection.provider.plugin.openedBrowsers[browserConnection.id];
  const client = await browser.browserClient.getActiveClient();
  const { Network, Page } = client;

  await Promise.all([Network.enable(), Page.enable()]);

  await Page.setDownloadBehavior({
    behavior: "allow",
    downloadPath: downloadsFolder(),
  });
}

test("Sample document is downloaded correctly", async (t) => {
  await enableDownloadForHeadlessChrome(t);
  await t.setFilesToUpload("input[type=file]", [Document1]);

  await validateTextContent(t, StatusButton, ["EXAMPLE.OPENATTESTATION.COM"]);

  // Simulate an OpenCert file download
  const fileName = await DownloadLink.getAttribute("download");
  await t.click(DownloadButton);
  const filePath = join(downloadsFolder(), fileName); // Caters to both Windows and Linux devs
  t.ctx.filePath = filePath; // For use in cleanup
  await t.expect(await waitForFileDownload(t, filePath)).eql(true);

  const downloadedFile = await JSON.parse(readFileSync(filePath, "utf8"));
  // We expect the contents of the input to match the downloaded file
  await t.expect(downloadedFile).eql(TestDocument1);
});

test("Sample document with special characters is downloaded correctly", async (t) => {
  await enableDownloadForHeadlessChrome(t);
  await t.setFilesToUpload("input[type=file]", [Document2]);

  await validateTextContent(t, StatusButton, [
    "DEMO-OPENCERTS.OPENATTESTATION.COM",
    "SEPOLIA: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)",
  ]);

  // Simulate an OpenCert file download
  const fileName = await DownloadLink.getAttribute("download");
  await t.click(DownloadButton);
  const filePath = join(downloadsFolder(), fileName); // Caters to both Windows and Linux devs
  t.ctx.filePath = filePath; // For use in cleanup
  await t.expect(await waitForFileDownload(t, filePath)).eql(true);

  const downloadedFile = await JSON.parse(readFileSync(filePath, "utf8"));
  // We expect the contents of the input to match the downloaded file
  await t.expect(downloadedFile).eql(TestDocument2);
});
