import { Selector } from "testcafe";
import "isomorphic-fetch";
import { waitForReact } from "testcafe-react-selectors";
import { validateTextContent } from "./utils";

fixture("Load action from plain certificate").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");
const CertificateDropzone = Selector("#certificate-dropzone");

test("Load document from action should work when url is valid (OA v2.0)", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/john-dot-oa/3069a02fe96445bc71ff7eb15a7f93c0/raw/98488d7e478ac7072d9210d8615aed8bb37506e4/opencerts-website-sepolia-demo.json`,
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, StatusButton, ["SEPOLIA: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "OpenCerts Demo",
    "Your Name",
    "has successfully completed the",
    "John Demo",
  ]);
});

test("Load document from action should work when url is valid (OA v4.0)", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/john-dot-oa/320778f9e9d93c80e03fe18040b399d0/raw/19d099d51fde74234b72bf4f555c65f6954b956c/opencerts-website-did-demo-v4.json`,
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, StatusButton, ["EXAMPLE.OPENATTESTATION.COM"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "OpenCerts Demo",
    "Your Name",
    "has successfully completed the",
    "John Demo",
  ]);
});

test("Load document from action should fail when url is invalid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/john-dot-oa/fc91eb8f98cd47224dd7339145d98561/raw/af909c7fd2f77a80bb856dae7172797d6a0853a7123/no-such-cert.json`,
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Unable to load the certificate from https://gist.githubusercontent.com/john-dot-oa/fc91eb8f98cd47224dd7339145d98561/raw/af909c7fd2f77a80bb856dae7172797d6a0853a7123/no-such-cert.json",
  ]);
});
