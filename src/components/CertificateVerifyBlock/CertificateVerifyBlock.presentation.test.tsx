import { fireEvent, render, screen } from "@testing-library/react";
import { VerificationFragment } from "@trustvc/trustvc";
import React from "react";
import singleCredential from "../tests/fixture/presentations/valid/single_credential.json";
import { CertificateVerifyBlock } from "./CertificateVerifyBlock";

const valid = (name: string, type: string): VerificationFragment =>
  ({ name, type, status: "VALID", data: true } as VerificationFragment);

const VALID_ENVELOPE = [
  valid("W3CVpSignatureIntegrity", "DOCUMENT_INTEGRITY"),
  valid("W3CVpCredentialStatus", "DOCUMENT_STATUS"),
  valid("W3CVpIssuerIdentity", "ISSUER_IDENTITY"),
];

describe("certificateVerifyBlock for a presentation", () => {
  it("names the holder, since a presentation has no issuer of its own", () => {
    render(<CertificateVerifyBlock verificationStatus={VALID_ENVELOPE} document={singleCredential as never} />);

    expect(screen.getByText("Certificates presented by")).toBeInTheDocument();
    expect(screen.getByText(/DID:KEY:ZDNAETXQ/)).toBeInTheDocument();
  });

  /**
   * Issuance belongs to each embedded credential, which reports its own checks on its tab.
   * Asking it of the envelope would answer a question only its contents can answer.
   */
  it("reports the envelope's own checks, and not issuance", () => {
    render(<CertificateVerifyBlock verificationStatus={VALID_ENVELOPE} document={singleCredential as never} />);

    fireEvent.click(screen.getByText("Certificates presented by"));

    expect(screen.getByText("Presentation has not been tampered with")).toBeInTheDocument();
    expect(screen.getByText("Presenter's identity has been verified")).toBeInTheDocument();
    expect(screen.queryByText(/has been issued/)).not.toBeInTheDocument();
  });
});
