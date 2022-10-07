import { Selector } from "testcafe";
import "isomorphic-fetch";
import { waitForReact } from "testcafe-react-selectors";

fixture("Load action from plain certificate").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");
const CertificateDropzone = Selector("#certificate-dropzone");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Load document from action should work when url is valid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/john-dot-oa/fc91eb8f98cd47224dd7339145d98561/raw/af909c7fd2f77a80bb856dae7172797d6a0853a7/opencerts-goerli-demo.json`,
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(
    `https://deploy-preview-686--opencerts-development.netlify.app/?q=${encodeURI(JSON.stringify(action))}`
  );
  await validateTextContent(t, StatusButton, ["DEMO-OPENCERTS.OPENATTESTATION.COM"]);

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

  await t.navigateTo(
    `https://deploy-preview-686--opencerts-development.netlify.app/?q=${encodeURI(JSON.stringify(action))}`
  );
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Unable to load the certificate from https://gist.githubusercontent.com/john-dot-oa/fc91eb8f98cd47224dd7339145d98561/raw/af909c7fd2f77a80bb856dae7172797d6a0853a7123/no-such-cert.json",
  ]);
});
