import { render, screen } from "@testing-library/react";
import { VerificationFragment } from "@trustvc/trustvc";
import React from "react";
import { MESSAGES, TYPES } from "../../../constants/VerificationErrorMessages";
import singleCredential from "../../tests/fixture/presentations/valid/single_credential.json";
import { UnverifiedView } from "./UnverifiedView";

const invalid = (name: string, type: string, message: string): VerificationFragment =>
  ({ name, type, status: "INVALID", reason: { code: 0, codeString: "INVALID", message } } as VerificationFragment);

const valid = (name: string, type: string): VerificationFragment =>
  ({ name, type, status: "VALID", data: true } as VerificationFragment);

describe("unverifiedView", () => {
  it("reports a certificate failure with the certificate copy", () => {
    const fragments = [
      invalid("OpenAttestationHash", "DOCUMENT_INTEGRITY", "Certificate has been tampered with"),
      valid("OpenAttestationEthereumDocumentStoreStatus", "DOCUMENT_STATUS"),
      valid("OpenAttestationDnsTxtIdentityProof", "ISSUER_IDENTITY"),
    ];

    render(<UnverifiedView resetData={jest.fn()} verificationStatus={fragments} />);

    expect(screen.getByText("This certificate is not valid")).toBeInTheDocument();
    expect(screen.getByText(MESSAGES[TYPES.HASH].failureTitle)).toBeInTheDocument();
  });

  /**
   * A presentation's fragments land on the same types a certificate's do, so without the
   * presentation rules a revoked embedded credential reads as "Certificate not issued" and
   * points the holder at the wrong party.
   */
  it("blames the embedded credential, and its issuer, for a revoked credential", () => {
    const fragments = [
      valid("W3CVpSignatureIntegrity", "DOCUMENT_INTEGRITY"),
      invalid(
        "W3CVpCredentialStatus",
        "DOCUMENT_STATUS",
        'Embedded credential at index 0 has been revoked (status purpose "revocation").'
      ),
      valid("W3CVpIssuerIdentity", "ISSUER_IDENTITY"),
    ];

    render(
      <UnverifiedView resetData={jest.fn()} verificationStatus={fragments} document={singleCredential as never} />
    );

    expect(screen.getByText("This presentation is not valid")).toBeInTheDocument();
    expect(screen.getByText(/Credential 1/)).toBeInTheDocument();
    expect(screen.getByText(/issuing institution/)).toBeInTheDocument();
    expect(screen.queryByText("Certificate not issued")).not.toBeInTheDocument();
  });

  it("sends an expired presentation back to the holder", () => {
    const fragments = [
      invalid(
        "W3CVpCredentialStatus",
        "DOCUMENT_STATUS",
        "Presentation has expired (validUntil 2021-01-01T00:00:00Z)."
      ),
    ];

    render(
      <UnverifiedView resetData={jest.fn()} verificationStatus={fragments} document={singleCredential as never} />
    );

    expect(screen.getByText("Presentation has expired")).toBeInTheDocument();
    expect(screen.getByText(/ask the holder to present the credentials again/)).toBeInTheDocument();
  });
});
