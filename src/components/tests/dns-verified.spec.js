import { Selector, RequestMock } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";
import { validateTextContent } from "./utils";

const googleDnsDown = RequestMock()
  .onRequestTo({ url: "https://dns.google/resolve?name=example.openattestation.com&type=TXT" })
  .respond(null, 500, { "access-control-allow-origin": "*" });

const allDnsResolverDown = RequestMock()
  .onRequestTo({ url: "https://dns.opencerts.io/resolve?name=example.openattestation.com" })
  .respond(null, 500, { "access-control-allow-origin": "*" })
  .onRequestTo({ url: "https://dns.google/resolve?name=example.openattestation.com&type=TXT" })
  .respond(null, 500, { "access-control-allow-origin": "*" })
  .onRequestTo({ url: "https://cloudflare-dns.com/dns-query?name=example.openattestation.com&type=TXT" })
  .respond(null, 500, { "access-control-allow-origin": "*" })
  .onRequestTo({ url: "https://dns.alidns.com/resolve?name=example.openattestation.com&type=16" })
  .respond(null, 500, { "access-control-allow-origin": "*" });

fixture("DNS Certificate Rendering").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const Document = "./fixture/sample-dns-verified.json";
const IframeBlock = Selector("#iframe");
const SampleTemplate = Selector("#root");
const StatusButton = Selector("#certificate-status");
const InvalidMessage = Selector('[data-testid="invalid-message"]');
const RenderedCertificate = Selector("#certificate-dropzone");

test("Sample document is rendered correctly when dns is verified", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["EXAMPLE.OPENATTESTATION.COM"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Name & Address of Shipping Agent/Freight Forwarder",
    "CERTIFICATE OF NON-MANIPULATION",
    "DEMO JOHN TAN",
    "Certification by Singapore Customs",
    "AQSIQ170923130",
  ]);
});

test.requestHooks(googleDnsDown)("Sample document is rendered correctly when google dns is down", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await validateTextContent(t, StatusButton, ["EXAMPLE.OPENATTESTATION.COM"]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Name & Address of Shipping Agent/Freight Forwarder",
    "CERTIFICATE OF NON-MANIPULATION",
    "DEMO JOHN TAN",
    "Certification by Singapore Customs",
    "AQSIQ170923130",
  ]);
});

test.requestHooks(allDnsResolverDown)("Sample document is not rendered when all dns resolver are down", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]); // Ensure that document uses example.openattestation.com as it uses cloudflare as secondary dns

  await InvalidMessage.with({ visibilityCheck: true })();

  await validateTextContent(t, RenderedCertificate, [
    "Certificate issuer identity is invalid",
    "This certificate was issued by an invalid issuer.",
  ]);
});
