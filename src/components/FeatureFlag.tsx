import React from "react";
import { connect } from "react-redux";

interface FeatureFlagProps {
  name: string;
  state: {
    featureToggle: {
      [key: string]: boolean;
    };
  };
  render?: () => React.ReactElement;
  fallback?: () => React.ReactElement;
}

export const FeatureFlag: React.FunctionComponent<FeatureFlagProps> = ({ name, render, fallback, state }) => {
  const featureFlag = state.featureToggle[name];
  if (featureFlag && render) {
    return render();
  }
  if (!featureFlag && fallback) {
    return fallback();
  }
  return null;
};

// TODO fix redux =)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FeatureFlagContainer = connect((state: any) => ({ state }))(FeatureFlag);
