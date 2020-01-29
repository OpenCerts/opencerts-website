import { Selector } from "testcafe";
import "isomorphic-fetch";

fixture("Load action from encrypted certificate").page`http://localhost:3000`;

const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");
const CertificateStatusBanner = Selector("#status-banner-container");
const CertificateDropzone = Selector("#certificate-dropzone");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

const key = "1b8c334a38f9ff96108303a4ba0cc592f1559eb24f5b48b70c9300c60a34d5e9";

test("Load document from action should work when action is valid", async t => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://api.myjson.com/bins/1a9acm`,
      key,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/"
    }
  };

  await t.navigateTo(
    `http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`
  );
  await validateTextContent(t, StatusButton, [
    "Certificate issued by ROPSTEN: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)"
  ]);

  await validateTextContent(t, CertificateStatusBanner, [
    "Certificate issuer is in the SkillsFuture Singapore registry for Opencerts"
  ]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "OpenCerts Demo",
    "Your Name",
    "has successfully completed the",
    "John Demo"
  ]);
});

test("Load document from action should fail when action type is invalid", async t => {
  const action = {
    type: "DOCUM",
    payload: {
      uri: `https://api.myjson.com/bins/1a9acm`,
      key,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/"
    }
  };

  await t.navigateTo(
    `http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`
  );
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "The type DOCUM provided from the action is not supported"
  ]);
});

test("Load document from action should fail when key is invalid", async t => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://api.myjson.com/bins/1a9acm`,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
      key: "2a237b35cb50544a2c9a4b4a629e7c547bd1ff4a0137489700891532001e83f6" // random key, must have correct length
    }
  };

  await t.navigateTo(
    `http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`
  );
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Error decrypting message"
  ]);
});

test("Load document from action should fail when the required key is not provided", async t => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://api.myjson.com/bins/1a9acm`,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/"
    }
  };

  await t.navigateTo(
    `http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`
  );
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Unable to decrypt certificate with key=undefined and type=OPEN-ATTESTATION-TYPE-1"
  ]);
});

test("Load document from action should fail when url is invalid", async t => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://api.myjson.com/bins/1a9acmdasdasd`,
      permittedAction: ["STORE"],
      redirect: "https://opencerts.io/",
      key
    }
  };

  await t.navigateTo(
    `http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`
  );
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Unable to load the certificate from https://api.myjson.com/bins/1a9acmdasdasd"
  ]);
});
