import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { VerificationFragment } from "@trustvc/trustvc";
import React from "react";
import { Provider } from "react-redux";
import { rootReducer } from "../reducers";
import { CertificateViewer } from "./CertificateViewer";
import twoCredentials from "./tests/fixture/presentations/valid/two_credentials.json";

const mockDecentralisedPrint = jest.fn();

// The decentralised renderer mounts an iframe against a remote template; which renderer the viewer
// picks is what is under test. The stand-in shows the url it would load and prints like the real one.
jest.mock("./DecentralisedTemplateRenderer/DecentralisedRenderer", () => {
  const { useImperativeHandle } = jest.requireActual("react");
  const { getTemplate } = jest.requireActual("../utils/utils");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const MockDecentralisedRenderer = ({ rawDocument, forwardedRef }: any) => {
    useImperativeHandle(forwardedRef, () => ({ print: mockDecentralisedPrint }));
    return <div data-testid="decentralised-renderer">{getTemplate(rawDocument)}</div>;
  };
  return { __esModule: true, default: MockDecentralisedRenderer };
});

const RENDERER_URL = "https://generic-templates.tradetrust.io";

// A signed W3C credential whose only renderMethod entry is the renderer url.
const legacyDocument = [twoCredentials.verifiableCredential].flat()[0];

const inlineEntry = {
  type: "INLINE_HTML_TEMPLATE",
  template: { templateName: "CHAFTA_COO", html: '<div class="coo">Certificate of origin</div>', css: "" },
};
const inlineDocument = { ...legacyDocument, renderMethod: [inlineEntry, ...legacyDocument.renderMethod] };

const valid = (name: string, type: string): VerificationFragment =>
  ({ name, type, status: "VALID", data: true } as VerificationFragment);

const VALID = [
  valid("W3CSignatureIntegrity", "DOCUMENT_INTEGRITY"),
  valid("W3CCredentialStatus", "DOCUMENT_STATUS"),
  valid("W3CIssuerIdentity", "ISSUER_IDENTITY"),
];

const viewer = (document: unknown) => (
  <Provider store={configureStore({ reducer: rootReducer })}>
    <CertificateViewer
      document={document as never}
      certificate={document as never}
      verifying={false}
      shareLink={{}}
      copiedLink={false}
      verificationStatus={VALID}
      showSharing={false}
      showShareLink={false}
      emailSendingState=""
      emailSendingError={null}
      handleSharingToggle={() => undefined}
      handleSendCertificate={() => undefined}
      handleShareLinkToggle={() => undefined}
      updateObfuscatedCertificate={() => undefined}
      handleCopyLink={() => undefined}
    />
  </Provider>
);

// trustvc titles the sandboxed frame "Document"; it is mounted once the template is decompressed.
const mountedInlineFrame = async (): Promise<HTMLIFrameElement> =>
  (await screen.findByTitle("Document")) as HTMLIFrameElement;

describe("certificateViewer renderer selection", () => {
  it("renders a legacy document through the decentralised renderer, unchanged", async () => {
    render(viewer(legacyDocument));

    await expect(screen.findByTestId("decentralised-renderer")).resolves.toHaveTextContent(RENDERER_URL);
    expect(screen.queryByTestId("inline-template-renderer")).not.toBeInTheDocument();
  });

  it("renders a document with an INLINE_HTML_TEMPLATE entry from that entry", async () => {
    render(viewer(inlineDocument));
    const frame = await mountedInlineFrame();

    expect(frame.srcdoc).toContain("Certificate of origin");
    expect(screen.queryByTestId("decentralised-renderer")).not.toBeInTheDocument();
  });

  it("falls back to the renderer url when the inline template fails to render", async () => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    // A compressed `template` string that isn't valid gzip fails to decompress.
    const brokenDocument = {
      ...legacyDocument,
      renderMethod: [{ type: "INLINE_HTML_TEMPLATE", template: "not-gzip" }, ...legacyDocument.renderMethod],
    };
    render(viewer(brokenDocument));

    await expect(screen.findByTestId("decentralised-renderer")).resolves.toHaveTextContent(RENDERER_URL);
    expect(screen.queryByTestId("inline-template-renderer")).not.toBeInTheDocument();
  });

  it("tries the inline template again for the next document after a fallback", async () => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    const brokenDocument = {
      ...legacyDocument,
      renderMethod: [{ type: "INLINE_HTML_TEMPLATE", template: "not-gzip" }, ...legacyDocument.renderMethod],
    };
    const { rerender } = render(viewer(brokenDocument));
    await screen.findByTestId("decentralised-renderer");
    rerender(viewer(inlineDocument));
    const frame = await mountedInlineFrame();

    expect(frame.srcdoc).toContain("Certificate of origin");
  });
});

describe("certificateViewer print", () => {
  it("prints the inline template's frame from the print button", async () => {
    render(viewer(inlineDocument));
    const frameWindow = (await mountedInlineFrame()).contentWindow as Window;
    jest.spyOn(frameWindow, "focus").mockImplementation(() => undefined);
    const framePrint = jest.spyOn(frameWindow, "print").mockImplementation(() => undefined);
    fireEvent.click(screen.getByText("Print"));

    expect(framePrint).toHaveBeenCalledTimes(1);
    expect(mockDecentralisedPrint).not.toHaveBeenCalled();
  });

  it("still prints a legacy document through the decentralised renderer", async () => {
    render(viewer(legacyDocument));
    await screen.findByTestId("decentralised-renderer");
    fireEvent.click(screen.getByText("Print"));

    expect(mockDecentralisedPrint).toHaveBeenCalledTimes(1);
  });
});
