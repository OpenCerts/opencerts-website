import { RequestMock, Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

fixture("Ethereum Provider HTTP Server Error").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const rateLimitMock = RequestMock()
  .onRequestTo({ url: "https://sepolia.infura.io/v3/84842078b09946638c03157f83405213", method: "post" })
  .respond(null, 429)
  .onRequestTo({ url: "https://eth-sepolia.g.alchemy.com/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC", method: "post" })
  .respond(null, 429);

const badGatewayMock = RequestMock()
  .onRequestTo({ url: "https://sepolia.infura.io/v3/84842078b09946638c03157f83405213", method: "post" })
  .respond(null, 502)
  .onRequestTo({ url: "https://eth-sepolia.g.alchemy.com/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC", method: "post" })
  .respond(null, 502);

const badGatewayMockInfuraOnly = RequestMock()
  .onRequestTo({ url: "https://sepolia.infura.io/v3/84842078b09946638c03157f83405213", method: "post" })
  .respond(null, 502);

const Certificate1 = "./unissued.opencert";
const Certificate2 = "./sample-sepolia.opencert";

const RenderedCertificate = Selector("#certificate-dropzone");
const DropzoneViewWrapper = Selector("[data-testid='dropzone-view-wrapper']");
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test.requestHooks(badGatewayMockInfuraOnly)(
  "Sample document is rendered correctly when only infura is down",
  async (t) => {
    await t.setFilesToUpload("input[type=file]", [Certificate2]);

    await validateTextContent(t, StatusButton, ["SEPOLIA: GOVERNMENT TECHNOLOGY AGENCY OF SINGAPORE (GOVTECH)"]);

    await t.switchToIframe(IframeBlock);

    await validateTextContent(t, SampleTemplate, [
      "OpenCerts Demo",
      "Your Name",
      "has successfully completed the",
      "John Demo",
    ]);
  }
);

// Certificate1 uses an unissued cert, but we should only show "Connection error" given a HTTP 429 response
test.requestHooks(rateLimitMock)(
  "Invalid certificate should only show connection error when Ethereum provider returns HTTP 429",
  async (t) => {
    await t.setFilesToUpload("input[type=file]", [Certificate1]);

    await DropzoneViewWrapper.with({ visibilityCheck: true })();

    await validateTextContent(t, RenderedCertificate, [
      "Connection error",
      "Unable to connect to the Ethereum network",
    ]);
  }
);

// Certificate1 uses an unissued cert, but we should only show "Connection error" given a HTTP 502 response
test.requestHooks(badGatewayMock)(
  "Invalid certificate should only show connection error when Ethereum provider returns HTTP 502",
  async (t) => {
    await t.setFilesToUpload("input[type=file]", [Certificate1]);

    await DropzoneViewWrapper.with({ visibilityCheck: true })();

    await validateTextContent(t, RenderedCertificate, [
      "Connection error",
      "Unable to connect to the Ethereum network",
    ]);
  }
);

// Certificate2 uses a perfectly valid cert, but we should only show "Connection error" given a HTTP 429 response
test.requestHooks(rateLimitMock)(
  "Valid certificate should show only connection error when Ethereum provider returns HTTP 429",
  async (t) => {
    await t.setFilesToUpload("input[type=file]", [Certificate2]);

    await DropzoneViewWrapper.with({ visibilityCheck: true })();

    await validateTextContent(t, RenderedCertificate, [
      "Connection error",
      "Unable to connect to the Ethereum network",
    ]);
  }
);

// Certificate2 uses a perfectly valid cert, but we should only show "Connection error" given a HTTP 502 response
test.requestHooks(badGatewayMock)(
  "Valid certificate should show only connection error when Ethereum provider returns HTTP 502",
  async (t) => {
    await t.setFilesToUpload("input[type=file]", [Certificate2]);

    await DropzoneViewWrapper.with({ visibilityCheck: true })();

    await validateTextContent(t, RenderedCertificate, [
      "Connection error",
      "Unable to connect to the Ethereum network",
    ]);
  }
);
