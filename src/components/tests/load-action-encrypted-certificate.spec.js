import { Selector } from "testcafe";
import "isomorphic-fetch";
import { waitForReact } from "testcafe-react-selectors";

fixture("Load action from encrypted certificate").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status", { timeout: 30000 });
const CertificateDropzone = Selector("#certificate-dropzone");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

const key = "894c5b45a61d79fe46835e2c2b363875f0a1240db447bb3db77c2cf79568e279";

test("Load document from action should work when action is valid (key from anchor)", async (t) => {
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
  await validateTextContent(t, StatusButton, ["SEPOLIA: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "OpenCerts Demo",
    "Your Name",
    "has successfully completed the",
    "John Demo",
  ]);
});

test("Load document from action should work when action is valid", async (t) => {
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
  await validateTextContent(t, StatusButton, ["SEPOLIA: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)"]);

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
      uri: `https://gist.githubusercontent.com/john-dot-oa/0dfa4b0decedc120ef19cd4d6643e315/raw/a0da74ad4568826dc90e9e865dac1ec00f68b124/opencerts-website-e2e.json`,
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
      uri: `https://gist.githubusercontent.com/john-dot-oa/0dfa4b0decedc120ef19cd4d6643e315/raw/a0da74ad4568826dc90e9e865dac1ec00f68b124/opencerts-website-e2e.json`,
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
      uri: `https://gist.githubusercontent.com/john-dot-oa/0dfa4b0decedc120ef19cd4d6643e315/raw/a0da74ad4568826dc90e9e865dac1ec00f68b124/opencerts-website-e2e.json`,
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
      uri: `https://gist.githubusercontent.com/john-dot-oa/0dfa4b0decedc120ef19cd4d6643e315/raw/a0da74ad4568826dc90e9e865dac1ec00f68b124/opencerts-website-e2e.json`,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Unable to decrypt certificate with key=undefined and type=OPEN-ATTESTATION-TYPE-1",
  ]);
});

test("Load document from action should fail when url is invalid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/john-dot-oa/0dfa4b0decedc120ef19cd4d6643e315/raw/a0da74ad4568826dc90e9e865dac1ec00f68b124/opencerts-website-e2e.jsondasdasd`,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
      key,
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Unable to load the certificate from https://gist.githubusercontent.com/john-dot-oa/0dfa4b0decedc120ef19cd4d6643e315/raw/a0da74ad4568826dc90e9e865dac1ec00f68b124/opencerts-website-e2e.jsondasdasd",
  ]);
});
