import { Selector } from "testcafe";

fixture("UnVerified Certificate Rendering").page`http://localhost:3000`;

const Document = "./fixture/unverified-issuer.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#rendered-certificate");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Sample document is rendered correctly when issuer is unverfied", async t => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, [
    "Institution identity not verified"
  ]);

  await t
    .expect(StatusButton.getStyleProperty("background-color"))
    .eql("rgb(255, 191, 0)");

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Rendered with custom template",
    "Master of Blockchain",
    "CUSTOM_TEMPLATE",
    "Blockchain Academy",
    "Bitcoin"
  ]);
});
