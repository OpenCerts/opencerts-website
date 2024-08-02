import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";
import { validateTextContent } from "../../components/tests/utils";

fixture("OA v4 DID-DNS Certificate Rendering").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const EmbeddedRendererDoc = "./fixtures/v4_embedded_renderer.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const StatusButton = Selector("#certificate-status");

test("Sample v4 document using embedded renderer is rendered correctly when dns is verified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [EmbeddedRendererDoc]);

  await validateTextContent(t, StatusButton, ["EXAMPLE.OPENATTESTATION.COM"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, ["OpenCerts Demo", "Your Name"]);
});

const SvgRendererDoc = "./fixtures/v4_svg.json";
const ImgElement = Selector('img[title="Svg Renderer Image"]');

test("Sample v4 document using svg renderer is rendered correctly when dns is verified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [SvgRendererDoc]);

  await validateTextContent(t, StatusButton, ["EXAMPLE.OPENATTESTATION.COM"]);

  await ImgElement.with({ visibilityCheck: true })();
});

const BatchedDoc = "./fixtures/v4_batched.json";

test("Sample batched and signed v4 document is rendered correctly when dns is verified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [BatchedDoc]);

  await validateTextContent(t, StatusButton, ["EXAMPLE.OPENATTESTATION.COM"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, ["OpenCerts Demo", "Your Name 1"]);
});

const ObfuscatedDoc = "./fixtures/v4_data_obfuscated.json";
const ObfuscationNote = Selector("#obfuscation-note");

test("Sample obfuscated v4 document is rendered correctly when dns is verified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [ObfuscatedDoc]);

  await validateTextContent(t, StatusButton, ["EXAMPLE.OPENATTESTATION.COM"]);

  await validateTextContent(t, ObfuscationNote, [
    "The owner of this certificate have chosen not to share certain information in the certificate with you. Please note that this does not affect the authenticity of the certificate.",
  ]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, ["OpenCerts Demo", "Your Name"]);
});
