import { render, screen } from "@testing-library/react";
import { fragments as trustvcFragments, VerificationFragment } from "@trustvc/trustvc";

const { W3CVpCode } = trustvcFragments as unknown as { W3CVpCode: Record<string, number> };
import React from "react";
import { MESSAGES, TYPES } from "../../../constants/VerificationErrorMessages";
import singleCredential from "../../tests/fixture/presentations/valid/single_credential.json";
import { UnverifiedView } from "./UnverifiedView";

const invalid = (name: string, type: string, message: string, code = 0, credentialIndices: number[] = []) =>
  ({
    name,
    type,
    status: "INVALID",
    reason: { code, codeString: String(code), message },
    data: { credentialIndices },
  } as unknown as VerificationFragment);

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
      invalid("W3CVpCredentialStatus", "DOCUMENT_STATUS", "verifier prose, never shown", W3CVpCode.CREDENTIAL_REVOKED, [
        0,
      ]),
      valid("W3CVpIssuerIdentity", "ISSUER_IDENTITY"),
    ];

    render(
      <UnverifiedView resetData={jest.fn()} verificationStatus={fragments} document={singleCredential as never} />
    );

    expect(screen.getByText("Credential revoked")).toBeInTheDocument();
    expect(screen.getByText(/Credential 1/)).toBeInTheDocument();
    expect(screen.getByText(/issuing authority/)).toBeInTheDocument();
    // The credential-shaped copy must not appear alongside it.
    expect(screen.queryByText("Certificate not issued")).not.toBeInTheDocument();
  });

  it("sends an expired presentation back to the holder", () => {
    const fragments = [
      invalid(
        "W3CVpCredentialStatus",
        "DOCUMENT_STATUS",
        "verifier prose, never shown",
        W3CVpCode.PRESENTATION_EXPIRED
      ),
    ];

    render(
      <UnverifiedView resetData={jest.fn()} verificationStatus={fragments} document={singleCredential as never} />
    );

    expect(screen.getByText("Presentation expired")).toBeInTheDocument();
    expect(screen.getByText(/ask the holder to present the credentials again/)).toBeInTheDocument();
  });
});
