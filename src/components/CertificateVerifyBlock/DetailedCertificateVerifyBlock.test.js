import React from "react";
import { mount } from "enzyme";
import DetailedCertificateVerifyBlock from "./DetailedCertificateVerifyBlock";
import { LOG_LEVEL } from "./constants";

describe("DetailedCertificateVerifyBlock", () => {
  it("displays that the certificate has been tampered with when hashStatus is false", () => {
    const wrapper = mount(
      <DetailedCertificateVerifyBlock
        statusSummary={LOG_LEVEL.VALID}
        hashStatus={{ verified: false }}
        notRevokedStatus={{ verified: true }}
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
        statusSummary={LOG_LEVEL.VALID}
        hashStatus={{ verified: true }}
        notRevokedStatus={{ verified: false }}
      />
    );
    expect(wrapper.find(".text-warning")).toHaveLength(1);
    expect(wrapper.text()).toContain("Certificate has been revoked");
    expect(wrapper.find(".text-success")).toHaveLength(1);
    expect(wrapper.text()).toContain("Certificate has not been tampered with");
  });
  it("displays all statuses as success when all status are true", () => {
    const wrapper = mount(
      <DetailedCertificateVerifyBlock
        statusSummary={LOG_LEVEL.VALID}
        hashStatus={{ verified: true }}
        notRevokedStatus={{ verified: true }}
      />
    );
    expect(wrapper.find(".text-success")).toHaveLength(2);
    expect(wrapper.text()).toContain("Certificate has not been revoked");
    expect(wrapper.text()).toContain("Certificate has not been tampered with");
  });
});
