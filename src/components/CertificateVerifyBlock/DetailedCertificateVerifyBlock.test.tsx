import { mount } from "enzyme";
import React from "react";
import DetailedCertificateVerifyBlock from "./DetailedCertificateVerifyBlock";

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
            name: "OpenAttestationEthereumDocumentStoreRevoked",
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
            name: "OpenAttestationEthereumDocumentStoreRevoked",
            status: "INVALID",
            type: "DOCUMENT_STATUS",
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
            name: "OpenAttestationEthereumDocumentStoreRevoked",
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
