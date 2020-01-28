import { Selector } from "testcafe";
import "isomorphic-fetch";
import ROPSTEN from "../HomePageContent/Ropsten-Demo";

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

let storedId;
let storedKey;

// use a shared function to load only one document for the whole test suite
const storeCertificate = async () => {
  if (!storedId && !storedKey) {
    // eslint-disable-next-line no-undef
    const { id, key } = await fetch(
      `https://api-ropsten.opencerts.io/storage`,
      {
        method: "POST",
        body: JSON.stringify({
          document: ROPSTEN
        })
      }
    ).then(res => res.json());
    storedId = id;
    storedKey = key;
  }
  return {
    id: storedId,
    key: storedKey
  };
};

test("Load document from action should work when action is valid", async t => {
  const { id, key } = await storeCertificate();

  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://api-ropsten.opencerts.io/storage/${id}`,
      key,
      permittedAction: ["STORE"],
      redirect: "https://tradetrust.io/"
    }
  };

  await t.navigateTo(
    `http://localhost:3000/?action=${encodeURI(JSON.stringify(action))}`
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
  const { id, key } = await storeCertificate();

  const action = {
    type: "DOCUM",
    payload: {
      uri: `https://api-ropsten.opencerts.io/storage/${id}`,
      key,
      permittedAction: ["STORE"],
      redirect: "https://tradetrust.io/"
    }
  };

  await t.navigateTo(
    `http://localhost:3000/?action=${encodeURI(JSON.stringify(action))}`
  );
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "The type DOCUM provided from the action is not supported"
  ]);
});

test("Load document from action should fail when key is invalid", async t => {
  const { id } = await storeCertificate();

  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://api-ropsten.opencerts.io/storage/${id}`,
      permittedAction: ["STORE"],
      redirect: "https://tradetrust.io/",
      key: "2a237b35cb50544a2c9a4b4a629e7c547bd1ff4a0137489700891532001e83f6" // random key, must have correct length
    }
  };

  await t.navigateTo(
    `http://localhost:3000/?action=${encodeURI(JSON.stringify(action))}`
  );
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Error decrypting message"
  ]);
});

test("Load document from action should fail when the required key is not provided", async t => {
  const { id } = await storeCertificate();

  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://api-ropsten.opencerts.io/storage/${id}`,
      permittedAction: ["STORE"],
      redirect: "https://tradetrust.io/"
    }
  };

  await t.navigateTo(
    `http://localhost:3000/?action=${encodeURI(JSON.stringify(action))}`
  );
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Unable to decrypt certificate with key=undefined and type=OPEN-ATTESTATION-TYPE-1"
  ]);
});

test("Load document from action should fail when url is invalid", async t => {
  const { key } = await storeCertificate();

  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://api-ropsten.opencerts.io/storage/abcd`,
      permittedAction: ["STORE"],
      redirect: "https://tradetrust.io/",
      key
    }
  };

  await t.navigateTo(
    `http://localhost:3000/?action=${encodeURI(JSON.stringify(action))}`
  );
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Unable to load the certificate from https://api-ropsten.opencerts.io/storage/abcd"
  ]);
});
