import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { VerificationFragment } from "@trustvc/trustvc";
import React from "react";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";
import twoCredentials from "../tests/fixture/presentations/valid/two_credentials.json";
import { CredentialTabs } from "./CredentialTabs";

// The renderer mounts an iframe against a remote template; the tabs are what is under test.
jest.mock("../DecentralisedTemplateRenderer/DecentralisedRenderer", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ rawDocument }: any) => <div data-testid="renderer">{rawDocument.proof?.proofValue}</div>,
}));

const fragment = (name: string, type: string, status: "VALID" | "INVALID"): VerificationFragment =>
  ({ name, type, status, data: status === "VALID" } as VerificationFragment);

const VALID_ENVELOPE = [
  fragment("W3CVpSignatureIntegrity", "DOCUMENT_INTEGRITY", "VALID"),
  fragment("W3CVpCredentialStatus", "DOCUMENT_STATUS", "VALID"),
  fragment("W3CVpIssuerIdentity", "ISSUER_IDENTITY", "VALID"),
];

// "View another" dispatches a reset, so the strip needs a store.
const withStore = (ui: React.ReactElement) =>
  render(<Provider store={configureStore({ reducer: rootReducer })}>{ui}</Provider>);

describe("credentialTabs", () => {
  const renderTabs = (verificationStatus = VALID_ENVELOPE) =>
    withStore(
      <CredentialTabs
        presentation={twoCredentials as never}
        verificationStatus={verificationStatus}
        forwardedRef={React.createRef()}
      />
    );

  it("gives every embedded credential a tab, labelled by its template", () => {
    renderTabs();

    const tabs = screen.getAllByRole("tab");

    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveTextContent("CHAFTA COO");
  });

  it("renders only the selected credential, so one iframe is mounted at a time", () => {
    renderTabs();

    expect(screen.getAllByTestId("renderer")).toHaveLength(1);
  });

  it("switches the rendered credential when another tab is chosen", () => {
    renderTabs();
    const first = screen.getByTestId("renderer").textContent;

    fireEvent.click(screen.getAllByRole("tab")[1]);

    expect(screen.getByTestId("renderer").textContent).not.toStrictEqual(first);
    expect(screen.getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true");
  });

  it("moves between tabs with the arrow keys, per the ARIA tabs pattern", () => {
    renderTabs();

    fireEvent.keyDown(screen.getByRole("tablist"), { key: "ArrowRight" });

    expect(screen.getAllByRole("tab")[1]).toHaveAttribute("aria-selected", "true");
  });

  // The same block a standalone certificate gets, naming this credential's own issuer.
  it("gives the selected credential the whole-certificate verify block", () => {
    renderTabs();

    expect(screen.getByText("Certificate issued by")).toBeInTheDocument();
    expect(screen.getByText(/^DID:KEY:/)).toBeInTheDocument();
  });

  // The presentation verifier checks every embedded credential, so its verdict is what the
  // credential's details report — no second, redundant verification.
  it("opens this credential's details onto the presentation verifier's verdict", () => {
    renderTabs([
      fragment("W3CVpSignatureIntegrity", "DOCUMENT_INTEGRITY", "INVALID"),
      fragment("W3CVpCredentialStatus", "DOCUMENT_STATUS", "VALID"),
      fragment("W3CVpIssuerIdentity", "ISSUER_IDENTITY", "VALID"),
    ]);

    fireEvent.click(screen.getByText("Certificate issued by"));

    expect(screen.getByText("Certificate has been tampered with")).toBeInTheDocument();
    expect(screen.getByText("Certificate has not been revoked")).toBeInTheDocument();
  });

  // The caption names the tablist, so a screen reader and a sighted reader get the same words.
  it("counts the certificates and labels the tab strip with that caption", () => {
    renderTabs();

    expect(screen.getByRole("tablist", { name: "2 certificates in this presentation" })).toBeInTheDocument();
  });

  it('keeps "View another" where a single certificate\'s tab strip puts it', () => {
    renderTabs();

    expect(screen.getByText("View another")).toBeInTheDocument();
  });

  it("renders nothing for a presentation that carries no credentials", () => {
    const { container } = withStore(
      <CredentialTabs
        presentation={{ type: ["VerifiablePresentation"], verifiableCredential: [] } as never}
        verificationStatus={VALID_ENVELOPE}
        forwardedRef={React.createRef()}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
