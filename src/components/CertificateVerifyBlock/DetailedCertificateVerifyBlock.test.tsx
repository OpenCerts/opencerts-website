import { mount } from "enzyme";
import React from "react";
import { DetailedCertificateVerifyBlock } from "./DetailedCertificateVerifyBlock";

describe("detailedCertificateVerifyBlock", () => {
  it("displays that the certificate has been tampered with when hashStatus is false", () => {
    const wrapper = mount(
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
    expect(wrapper.find(".text-danger")).toHaveLength(1);
    expect(wrapper.text()).toContain("Certificate has been tampered with");
    expect(wrapper.find(".text-success")).toHaveLength(1);
    expect(wrapper.text()).toContain("Certificate has not been revoked");
  });
  it("displays that the certificate has been revoked when notRevokedStatus is false", () => {
    const wrapper = mount(
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
    expect(wrapper.find(".text-danger")).toHaveLength(1);
    expect(wrapper.text()).toContain("Certificate has been revoked");
    expect(wrapper.find(".text-success")).toHaveLength(1);
    expect(wrapper.text()).toContain("Certificate has not been tampered with");
  });
  it("displays all statuses as success when all status are true", () => {
    const wrapper = mount(
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
    expect(wrapper.find(".text-success")).toHaveLength(2);
    expect(wrapper.text()).toContain("Certificate has not been revoked");
    expect(wrapper.text()).toContain("Certificate has not been tampered with");
  });
});
