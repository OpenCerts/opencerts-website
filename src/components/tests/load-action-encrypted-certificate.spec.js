import { Selector } from "testcafe";
import "isomorphic-fetch";
import { waitForReact } from "testcafe-react-selectors";
import { validateTextContent } from "./utils";

fixture("Load action from encrypted certificate").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");
const CertificateDropzone = Selector("#certificate-dropzone");

const key = "894c5b45a61d79fe46835e2c2b363875f0a1240db447bb3db77c2cf79568e279";

test("Load OA v2.0 document from action should work when action is valid (key from anchor)", async (t) => {
  const anchor = { key };
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/john-dot-oa/3069a02fe96445bc71ff7eb15a7f93c0/raw/98488d7e478ac7072d9210d8615aed8bb37506e4/opencerts-website-sepolia-e2e.json`,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(
    `http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}#${encodeURI(JSON.stringify(anchor))}`
  );
  await validateTextContent(t, StatusButton, ["SEPOLIA: OPENCERTS"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "OpenCerts Demo",
    "Your Name",
    "has successfully completed the",
    "John Demo",
  ]);
});

test("Load OA v4.0 document from action should work when action is valid (key from anchor)", async (t) => {
  const anchor = { key };
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/john-dot-oa/320778f9e9d93c80e03fe18040b399d0/raw/19d099d51fde74234b72bf4f555c65f6954b956c/opencerts-website-did-demo-encrypted-v4.json`,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(
    `http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}#${encodeURI(JSON.stringify(anchor))}`
  );
  await validateTextContent(t, StatusButton, ["EXAMPLE.OPENATTESTATION.COM"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "OpenCerts Demo",
    "Your Name",
    "has successfully completed the",
    "John Demo",
  ]);
});

// Note: This is a deprecated way of including the key. The key should be part of the anchor (#): https://github.com/Open-Attestation/adr/blob/master/universal_actions.md#proposed-solution
test("Load document from action should work when action is valid (key from query param to maintain backwards compatibility)", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/john-dot-oa/3069a02fe96445bc71ff7eb15a7f93c0/raw/98488d7e478ac7072d9210d8615aed8bb37506e4/opencerts-website-sepolia-e2e.json`,
      key,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, StatusButton, ["SEPOLIA: OPENCERTS"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "OpenCerts Demo",
    "Your Name",
    "has successfully completed the",
    "John Demo",
  ]);
});

test("Load document from action should fail when action type is invalid", async (t) => {
  const action = {
    type: "DOCUM",
    payload: {
      uri: `https://example.com/sample.json`, // Not important as invalid action.type will throw error first
      key,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "The type DOCUM provided from the action is not supported",
  ]);
});

test("Load document from action should fail when key is invalid (key from anchor)", async (t) => {
  const anchor = { key: "2a237b35cb50544a2c9a4b4a629e7c547bd1ff4a0137489700891532001e83f6" }; // random key, must have correct length
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/john-dot-oa/3069a02fe96445bc71ff7eb15a7f93c0/raw/98488d7e478ac7072d9210d8615aed8bb37506e4/opencerts-website-sepolia-e2e.json`,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(
    `http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}#${encodeURI(JSON.stringify(anchor))}`
  );
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Error decrypting message",
  ]);
});

test("Load document from action should fail when key is invalid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/john-dot-oa/3069a02fe96445bc71ff7eb15a7f93c0/raw/98488d7e478ac7072d9210d8615aed8bb37506e4/opencerts-website-sepolia-e2e.json`,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
      key: "2a237b35cb50544a2c9a4b4a629e7c547bd1ff4a0137489700891532001e83f6", // random key, must have correct length
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Error decrypting message",
  ]);
});

test("Load document from action should fail when the required key is not provided", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/john-dot-oa/3069a02fe96445bc71ff7eb15a7f93c0/raw/98488d7e478ac7072d9210d8615aed8bb37506e4/opencerts-website-sepolia-e2e.json`,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Key is required to decrypt certificate but received key=undefined and type=OPEN-ATTESTATION-TYPE-1",
  ]);
});

test("Load document from action should fail when url is invalid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/john-dot-oa/1234/raw/5678/non-existent.json`, // random url, must follow Gist URL format
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
      key,
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Unable to load the certificate from https://gist.githubusercontent.com/john-dot-oa/1234/raw/5678/non-existent.json",
  ]);
});
