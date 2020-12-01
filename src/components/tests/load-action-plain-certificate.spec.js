import { Selector } from "testcafe";
import "isomorphic-fetch";
import { waitForReact } from "testcafe-react-selectors";

fixture("Load action from plain certificate").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");
const CertificateStatusBanner = Selector("#status-banner-container");
const CertificateDropzone = Selector("#certificate-dropzone");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Load document from action should work when url is valid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/Nebulis/dc32c107fc5112ecf863b1dfa25995a9/raw/9aed3bfbbddaaa23d453cfbb9ee42d9efffaf2b8/opencerts-ropsten-demo.json`,
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
test("Load document from action should fail when url is invalid", async (t) => {
  const action = {
    type: "DOCUMENT",
    payload: {
      uri: `https://gist.githubusercontent.com/Nebulis/dc32c107fc5112ecf863b1dfa25995a9/raw/9aed3bfbbdd2b8/opencerts-ropsten-demo.json`,
      redirect: "https://opencerts.io/",
    },
  };

  await t.navigateTo(`http://localhost:3000/?q=${encodeURI(JSON.stringify(action))}`);
  await validateTextContent(t, CertificateDropzone, [
    "The certificate can't be loaded",
    "Unable to load certificate with the provided parameters",
    "Unable to load the certificate from https://gist.githubusercontent.com/Nebulis/dc32c107fc5112ecf863b1dfa25995a9/raw/9aed3bfbbdd2b8/opencerts-ropsten-demo.json",
  ]);
});
