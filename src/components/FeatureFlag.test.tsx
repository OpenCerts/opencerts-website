import { mount } from "enzyme";
import React from "react";
import { FeatureFlag } from "./FeatureFlag";

describe("featureFlag", () => {
  const state = {
    featureToggle: {
      SHARE_LINK: true,
      OTHER: false,
    },
  };
  it("should render component when SHARE_LINK feature flag is set to true", () => {
    const wrapper = mount(
      <FeatureFlag
        name="SHARE_LINK"
        render={() => <div>Share link is active</div>}
        fallback={() => <div>This feature is not available</div>}
        state={state}
      />
    );
    expect(wrapper.find("div").text()).toStrictEqual("Share link is active");
  });
  it("should render fallback component when OTHER feature flag is set to false", () => {
    const wrapper = mount(
      <FeatureFlag
        name="jobPost"
        render={() => <div>Other feature is active</div>}
        fallback={() => <div>This feature is not available</div>}
        state={state}
      />
    );
    expect(wrapper.find("div").text()).toStrictEqual("This feature is not available");
  });
  it("should render fallback component when EXTRA_FEATURE feature flag is not set", () => {
    const wrapper = mount(
      <FeatureFlag
        name="EXTRA_FEATURE"
        render={() => <div>Extra feature is active</div>}
        fallback={() => <div>This feature is not available</div>}
        state={state}
      />
    );
    expect(wrapper.find("div").text()).toStrictEqual("This feature is not available");
  });
  it("should not render anything when there is no render function and SHARE_LINK feature flag is true", () => {
    const wrapper = mount(<FeatureFlag name="SHARE_LINK" state={state} />);
    expect(wrapper.find("div")).toHaveLength(0);
  });
  it("should not render anything when there is no fallback function and OTHER feature flag is false", () => {
    const wrapper = mount(<FeatureFlag name="jobPost" state={state} />);
    expect(wrapper.find("div")).toHaveLength(0);
  });
});
