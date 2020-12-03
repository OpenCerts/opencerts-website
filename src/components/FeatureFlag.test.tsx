import { render, screen } from "@testing-library/react";
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
    render(
      <FeatureFlag
        name="SHARE_LINK"
        render={() => <div>Share link is active</div>}
        fallback={() => <div>This feature is not available</div>}
        state={state}
      />
    );
    expect(screen.getByText("Share link is active")).toBeInTheDocument();
  });
  it("should render fallback component when OTHER feature flag is set to false", () => {
    render(
      <FeatureFlag
        name="jobPost"
        render={() => <div>Other feature is active</div>}
        fallback={() => <div>This feature is not available</div>}
        state={state}
      />
    );
    expect(screen.getByText("This feature is not available")).toBeInTheDocument();
  });
  it("should render fallback component when EXTRA_FEATURE feature flag is not set", () => {
    render(
      <FeatureFlag
        name="EXTRA_FEATURE"
        render={() => <div>Extra feature is active</div>}
        fallback={() => <div>This feature is not available</div>}
        state={state}
      />
    );
    expect(screen.getByText("This feature is not available")).toBeInTheDocument();
  });
  it("should not render anything when there is no render function and SHARE_LINK feature flag is true", () => {
    const { container } = render(<FeatureFlag name="SHARE_LINK" state={state} />);
    expect(container.firstChild).toMatchInlineSnapshot(`null`);
  });
  it("should not render anything when there is no fallback function and OTHER feature flag is false", () => {
    const { container } = render(<FeatureFlag name="jobPost" state={state} />);
    expect(container.firstChild).toMatchInlineSnapshot(`null`);
  });
});
