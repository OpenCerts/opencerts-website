import { render, screen } from "@testing-library/react";
import React from "react";
import { DetailedCertificateVerifyBlock } from "./DetailedCertificateVerifyBlock";

describe("detailedCertificateVerifyBlock", () => {
  it("displays that the certificate has been tampered with when hashStatus is false", () => {
    render(
      <DetailedCertificateVerifyBlock
        verificationStatus={[
          {
            name: "OpenAttestationHash",
            status: "INVALID",
            type: "DOCUMENT_INTEGRITY",
          },
          {
            name: "OpenAttestationEthereumDocumentStoreStatus",
            status: "VALID",
            type: "DOCUMENT_STATUS",
          },
        ]}
      />
    );
    expect(screen.getByText("Certificate has been tampered with")).toBeInTheDocument();
    expect(screen.getByText("Certificate has not been revoked")).toBeInTheDocument();
  });
  it("displays that the certificate has been revoked when notRevokedStatus is false", () => {
    render(
      <DetailedCertificateVerifyBlock
        verificationStatus={[
          {
            name: "OpenAttestationHash",
            status: "VALID",
            type: "DOCUMENT_INTEGRITY",
          },
          {
            name: "OpenAttestationEthereumDocumentStoreStatus",
            status: "INVALID",
            type: "DOCUMENT_STATUS",
            data: {
              issuedOnAll: true,
              revokedOnAny: true,
              details: {
                issuance: [
                  {
                    issued: true,
                    address: "0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
                  },
                ],
                revocation: [
                  {
                    revoked: true,
                    address: "0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
                    reason: {
                      code: 5,
                      codeString: "DOCUMENT_REVOKED",
                      message:
                        "Document 0x3d29524b18c3efe1cbad07e1ba9aa80c496cbf0b6255d6f331ca9b540e17e452 has been revoked under contract 0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
                    },
                  },
                ],
              },
            },
            reason: {
              code: 5,
              codeString: "DOCUMENT_REVOKED",
              message:
                "Document 0x3d29524b18c3efe1cbad07e1ba9aa80c496cbf0b6255d6f331ca9b540e17e452 has been revoked under contract 0x8Fc57204c35fb9317D91285eF52D6b892EC08cD3",
            },
          },
        ]}
      />
    );
    expect(screen.getByText("Certificate has been revoked")).toBeInTheDocument();
    expect(screen.getByText("Certificate has not been tampered with")).toBeInTheDocument();
  });
  it("displays all statuses as success when all status are true", () => {
    render(
      <DetailedCertificateVerifyBlock
        verificationStatus={[
          {
            name: "OpenAttestationHash",
            status: "VALID",
            type: "DOCUMENT_INTEGRITY",
          },
          {
            name: "OpenAttestationEthereumDocumentStoreStatus",
            status: "VALID",
            type: "DOCUMENT_STATUS",
          },
        ]}
      />
    );
    expect(screen.getByText("Certificate has not been revoked")).toBeInTheDocument();
    expect(screen.getByText("Certificate has not been tampered with")).toBeInTheDocument();
  });
});
