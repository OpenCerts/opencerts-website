import { mount } from "enzyme";
import React from "react";
import { FeatureFlag } from "./FeatureFlag";

describe("FeatureFlag", () => {
  const state = {
    featureToggle: {
      SHARE_LINK: true,
      OTHER: false
    }
  };
  test("should render component when SHARE_LINK feature flag is set to true", () => {
    const wrapper = mount(
      <FeatureFlag
        name="SHARE_LINK"
        render={() => <div>Share link is active</div>}
        fallback={() => <div>This feature is not available</div>}
        state={state}
      />
    );
    expect(wrapper.find("div").text()).toEqual("Share link is active");
  });
  test("should render fallback component when OTHER feature flag is set to false", () => {
    const wrapper = mount(
      <FeatureFlag
        name="jobPost"
        render={() => <div>Other feature is active</div>}
        fallback={() => <div>This feature is not available</div>}
        state={state}
      />
    );
    expect(wrapper.find("div").text()).toEqual("This feature is not available");
  });
  test("should render fallback component when EXTRA_FEATURE feature flag is not set", () => {
    const wrapper = mount(
      <FeatureFlag
        name="EXTRA_FEATURE"
        render={() => <div>Extra feature is active</div>}
        fallback={() => <div>This feature is not available</div>}
        state={state}
      />
    );
    expect(wrapper.find("div").text()).toEqual("This feature is not available");
  });
  test("should not render anything when there is no render function and SHARE_LINK feature flag is true", () => {
    const wrapper = mount(<FeatureFlag name="SHARE_LINK" state={state} />);
    expect(wrapper.find("div").length).toEqual(0);
  });
  test("should not render anything when there is no fallback function and OTHER feature flag is false", () => {
    const wrapper = mount(<FeatureFlag name="jobPost" state={state} />);
    expect(wrapper.find("div").length).toEqual(0);
  });
});
