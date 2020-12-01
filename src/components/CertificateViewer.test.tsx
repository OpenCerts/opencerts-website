import { SchemaId } from "@govtechsg/open-attestation";
import { mount } from "enzyme";
import React from "react";
import { CertificateViewer, CertificateViewerProps } from "./CertificateViewer";

jest.mock("next/dynamic", () => () => () => "");
jest.mock("./FeatureFlag");

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
  it("should show that the issuer is not in the registry when identities is an empty array", () => {
    const wrapper = mount(<CertificateViewer {...sharedProps} verificationStatus={[]} />);
    expect(wrapper.find("#status-banner-container")).toHaveLength(1);
    expect(wrapper.find("#status-banner-container").text()).toContain(
      "Certificate issuer is not in the SkillsFuture Singapore registry for Opencerts"
    );
    expect(wrapper.find("#status-banner-container").text()).toContain("What does this mean ?");
  });
  it("should show that the issuer is not in the registry when registry identity is invalid", () => {
    const wrapper = mount(
      <CertificateViewer
        {...sharedProps}
        verificationStatus={[
          {
            name: "OpencertsRegistryVerifier",
            status: "INVALID",
            type: "ISSUER_IDENTITY",
          },
        ]}
      />
    );
    expect(wrapper.find("#status-banner-container")).toHaveLength(1);
    expect(wrapper.find("#status-banner-container").text()).toContain(
      "Certificate issuer is not in the SkillsFuture Singapore registry for Opencerts"
    );
    expect(wrapper.find("#status-banner-container").text()).toContain("What does this mean ?");
  });
  it("should show that the issuer is in the registry when registry identity is valid", () => {
    const wrapper = mount(
      <CertificateViewer
        {...sharedProps}
        verificationStatus={[
          {
            name: "OpencertsRegistryVerifier",
            status: "VALID",
            type: "ISSUER_IDENTITY",
          },
        ]}
      />
    );
    expect(wrapper.find("#status-banner-container")).toHaveLength(1);
    expect(wrapper.find("#status-banner-container").text()).toContain(
      "Certificate issuer is in the SkillsFuture Singapore registry for Opencerts"
    );
  });
});
