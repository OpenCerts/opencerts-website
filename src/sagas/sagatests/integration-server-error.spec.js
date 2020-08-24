import { RequestMock, Selector } from "testcafe";

fixture("Server error").page`http://localhost:3000`;

const rateLimitMock = RequestMock()
  .onRequestTo({ url: "https://ropsten.infura.io/v3/bb46da3f80e040e8ab73c0a9ff365d18", method: "post" })
  .respond({}, 429);

const badGatewayMock = RequestMock()
  .onRequestTo({ url: "https://ropsten.infura.io/v3/bb46da3f80e040e8ab73c0a9ff365d18", method: "post" })
  .respond({}, 502);

const Certificate = "./unissued.opencert";
// to have one more valid opencert

const RenderedCertificate = Selector("#certificate-dropzone");
const InvalidMessage = Selector(".invalid");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test.requestHooks(rateLimitMock)("Will show connection error only even if certificate is invalid (HTTP 429)", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await InvalidMessage.with({ visibilityCheck: true })();

  await validateTextContent(t, RenderedCertificate, ["Connection error", "Unable to conect to the Ethereum network"]);
});

test.requestHooks(rateLimitMock)("Will show connection error only even if certificate is invalid (HTTP 502)", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await InvalidMessage.with({ visibilityCheck: true })();

  await validateTextContent(t, RenderedCertificate, ["Connection error", "Unable to conect to the Ethereum network"]);
});
