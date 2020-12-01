import { RequestMock, Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

fixture("Ethereum Provider HTTP Server Error").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const rateLimitMock = RequestMock()
  .onRequestTo({ url: "https://ropsten.infura.io/v3/bb46da3f80e040e8ab73c0a9ff365d18", method: "post" })
  .respond(null, 429);

const badGatewayMock = RequestMock()
  .onRequestTo({ url: "https://ropsten.infura.io/v3/bb46da3f80e040e8ab73c0a9ff365d18", method: "post" })
  .respond(null, 502);

const Certificate1 = "./unissued.opencert";
const Certificate2 = "./sample-ropsten.opencert";

const RenderedCertificate = Selector("#certificate-dropzone");
const DropzoneViewWrapper = Selector("[data-testid='dropzone-view-wrapper']");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

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
