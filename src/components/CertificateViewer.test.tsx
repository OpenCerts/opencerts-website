import { SchemaId } from "@govtechsg/open-attestation";
import { render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { initStore } from "../store";
import { CertificateViewer, CertificateViewerProps } from "./CertificateViewer";

jest.mock("next/dynamic", () => () => () => "");

const ReduxWrapper: React.FunctionComponent = ({ children }) => {
  return <Provider store={initStore()}>{children}</Provider>;
};

// you mean https://github.com/testing-library/dom-testing-library/issues/410
// https://www.polvara.me/posts/five-things-you-didnt-know-about-testing-library/
const withMarkup = (text: string) => (content: string, node: HTMLElement) => {
  const hasText = (node: Element): boolean => {
    return node.textContent === text;
  };
  const nodeHasText = hasText(node);
  const childrenDontHaveText = Array.from(node.children).every((child) => !hasText(child));
  return nodeHasText && childrenDontHaveText;
};

describe("certificateViewer", () => {
  const certificate = {
    id: "k;lk;",
    $template: "$template",
    issuers: [
      {
        certificateStore: "certificateStore",
        name: "name",
      },
    ],
  };
  const sharedProps: CertificateViewerProps = {
    certificate,
    document: {
      version: SchemaId.v2,
      signature: { proof: [], merkleRoot: "a", targetHash: "a", type: "SHA3MerkleProof" },
      data: certificate,
    },
    verifying: false,
    copiedLink: true,
    emailSendingState: "aaaa",
    handleCopyLink: jest.fn(),
    handleSendCertificate: jest.fn(),
    handleShareLinkToggle: jest.fn(),
    handleSharingToggle: jest.fn(),
    updateObfuscatedCertificate: jest.fn(),
    shareLink: { id: "", key: "" },
    showShareLink: false,
    showSharing: false,
    verificationStatus: [],
  };
  it("should not show that the issuer is in the registry when identities is an empty array", () => {
    render(<CertificateViewer {...sharedProps} verificationStatus={[]} />, { wrapper: ReduxWrapper });
    expect(
      screen.queryByText(withMarkup("Certificate issuer is in the SkillsFuture Singapore registry for Opencerts."))
    ).not.toBeInTheDocument();
  });
  it("should show that the issuer is in the registry when registry identity is valid", () => {
    render(
      <CertificateViewer
        {...sharedProps}
        verificationStatus={[
          {
            name: "OpencertsRegistryVerifier",
            status: "VALID",
            type: "ISSUER_IDENTITY",
          },
        ]}
      />,
      { wrapper: ReduxWrapper }
    );
    expect(
      screen.getByText(withMarkup("Certificate issuer is in the SkillsFuture Singapore registry for Opencerts."))
    ).toBeInTheDocument();
  });
});
