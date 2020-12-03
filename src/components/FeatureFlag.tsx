import React from "react";
import { connect } from "react-redux";
import { RootState } from "../reducers";

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

export const FeatureFlagContainer = connect((state: RootState) => ({ state }))(FeatureFlag);
