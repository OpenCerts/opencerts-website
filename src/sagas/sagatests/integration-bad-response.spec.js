import { RequestMock, Selector } from "testcafe";

fixture("Bad response").page`http://localhost:3000`;

const conversionMock = RequestMock()
  .onRequestTo("https://cloudflare-eth.com/")
  .respond({ jsonrpc: "2.0", id: 46, result: "0x0000000000000000000000000000000000000000000000000000000000000000" });
// err code

const Certificate = "./unissued.opencert";
// to have one more valid opencert

const RenderedCertificate = Selector("#certificate-dropzone");
const InvalidMessage = Selector(".invalid");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test.requestHooks(conversionMock)("Unissued certificate's error message is correct'", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Certificate]);

  await InvalidMessage.with({ visibilityCheck: true })();

  await validateTextContent(t, RenderedCertificate, ["This certificate is not valid", "Certificate not issued"]);
});
