import { Selector } from "testcafe";
import "isomorphic-fetch";
import { waitForReact } from "testcafe-react-selectors";

fixture("Load action from encrypted certificate").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");
const CertificateStatusBanner = Selector("#status-banner-container");
const CertificateDropzone = Selector("#certificate-dropzone");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

const key = "d1093e704689bcb3a1287daef7644751498b4cbf008d32373a567fe3a112a26e";

test("Load document from action should work when action is valid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/Nebulis/328b757c7b56aa5a7d537c88cd250f92/raw/2816aad4811846ee8cd554bd19e08706da19ae09/e2e.json`,
      key,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, StatusButton, ["ROPSTEN: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)"]);

  await validateTextContent(t, CertificateStatusBanner, [
    "Certificate issuer is in the SkillsFuture Singapore registry for Opencerts",
  ]);

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
      uri: `https://gist.githubusercontent.com/Nebulis/328b757c7b56aa5a7d537c88cd250f92/raw/2816aad4811846ee8cd554bd19e08706da19ae09/e2e.json`,
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

test("Load document from action should fail when key is invalid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/Nebulis/328b757c7b56aa5a7d537c88cd250f92/raw/2816aad4811846ee8cd554bd19e08706da19ae09/e2e.json`,
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
      uri: `https://gist.githubusercontent.com/Nebulis/328b757c7b56aa5a7d537c88cd250f92/raw/2816aad4811846ee8cd554bd19e08706da19ae09/e2e.json`,
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
      uri: `https://gist.githubusercontent.com/Nebulis/328b757c7b56aa5a7d537c88cd250f92/raw/2816aad4811846ee8cd554bd19e08706da19ae09/e2e.jsondasdasd`,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
      key,
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Unable to load the certificate from https://gist.githubusercontent.com/Nebulis/328b757c7b56aa5a7d537c88cd250f92/raw/2816aad4811846ee8cd554bd19e08706da19ae09/e2e.jsondasdasd",
  ]);
});
