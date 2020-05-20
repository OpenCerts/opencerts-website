import { mount } from "enzyme";
import React from "react";
import { CertificateViewer } from "./CertificateViewer";

jest.mock("next/dynamic", () => () => () => "");
jest.mock("@govtechsg/open-attestation");
jest.mock("./FeatureFlag");

describe("CertificateViewer", () => {
  const sharedProps = {
    certificate: {},
    document: { data: {} },
    verifyTriggered: true,
    verifying: true,
    detailedVerifyVisible: true,
  };
  it("should show that the issuer is not in the registry when identities is an empty array ", () => {
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
