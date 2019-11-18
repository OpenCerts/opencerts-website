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
    hashStatus: { verified: true },
    issuedStatus: { verified: true },
    notRevokedStatus: { verified: true },
    toggleDetailedView: () => null,
    detailedVerifyVisible: true
  };
  it("should show that the issuer is not in the registry when identities is not defined ", () => {
    const wrapper = mount(
      <CertificateViewer
        {...sharedProps}
        issuerIdentityStatus={{ identities: null, verified: true }}
      />
    );
    expect(wrapper.find("#status-banner-container")).toHaveLength(1);
    expect(wrapper.find("#status-banner-container").text()).toContain(
      "Certificate issuer is not in the SkillsFuture Singapore registry for Opencerts"
    );
    expect(wrapper.find("#status-banner-container").text()).toContain(
      "What does this mean ?"
    );
  });
  it("should show that the issuer is not in the registry when identities is an empty array ", () => {
    const wrapper = mount(
      <CertificateViewer
        {...sharedProps}
        issuerIdentityStatus={{ identities: [], verified: true }}
      />
    );
    expect(wrapper.find("#status-banner-container")).toHaveLength(1);
    expect(wrapper.find("#status-banner-container").text()).toContain(
      "Certificate issuer is not in the SkillsFuture Singapore registry for Opencerts"
    );
    expect(wrapper.find("#status-banner-container").text()).toContain(
      "What does this mean ?"
    );
  });
  it("should show that the issuer is not in the registry when identities is an array with one element that is not resolved", () => {
    const wrapper = mount(
      <CertificateViewer
        {...sharedProps}
        issuerIdentityStatus={{
          identities: [{ registry: false }],
          verified: true
        }}
      />
    );
    expect(wrapper.find("#status-banner-container")).toHaveLength(1);
    expect(wrapper.find("#status-banner-container").text()).toContain(
      "Certificate issuer is not in the SkillsFuture Singapore registry for Opencerts"
    );
    expect(wrapper.find("#status-banner-container").text()).toContain(
      "What does this mean ?"
    );
  });
  it("should show that the issuer is in the registry when identities is array with one element that is not resolved", () => {
    const wrapper = mount(
      <CertificateViewer
        {...sharedProps}
        issuerIdentityStatus={{
          identities: [{ registry: "foo" }],
          verified: true
        }}
      />
    );
    expect(wrapper.find("#status-banner-container")).toHaveLength(1);
    expect(wrapper.find("#status-banner-container").text()).toContain(
      "Certificate issuer is in the SkillsFuture Singapore registry for Opencerts"
    );
  });
  it("should show that the issuer is in the registry when identities is array with two elements and one is resolved", () => {
    const wrapper = mount(
      <CertificateViewer
        {...sharedProps}
        issuerIdentityStatus={{
          identities: [{ registry: false }, { registry: "foo" }],
          verified: true
        }}
      />
    );
    expect(wrapper.find("#status-banner-container")).toHaveLength(1);
    expect(wrapper.find("#status-banner-container").text()).toContain(
      "Certificate issuer is in the SkillsFuture Singapore registry for Opencerts"
    );
  });
});
