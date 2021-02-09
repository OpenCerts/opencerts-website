import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

fixture("DID-DNS Certificate Rendering").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const Document = "./fixture/dns-did-signed.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const StatusButton = Selector("#certificate-status");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (_prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("Sample document is rendered correctly when dns is verified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["EXAMPLE.TRADETRUST.IO"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Name & Address of Shipping Agent/Freight Forwarder",
    "CERTIFICATE OF NON-MANIPULATION",
    "PETER LEE",
    "Certification by Singapore Customs",
    "AQSIQ170923130",
  ]);
});
