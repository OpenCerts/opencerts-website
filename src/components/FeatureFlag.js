// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export const FeatureFlag = ({ name, render, fallback, state }) => {
  const featureFlag = state.featureToggle[name];
  if (featureFlag && render) {
    return render();
  }
  if (!featureFlag && fallback) {
    return fallback();
  }
  return null;
};

export const FeatureFlagContainer = connect(state => ({ state }))(FeatureFlag);

FeatureFlag.propTypes = {
  name: PropTypes.string,
  render: PropTypes.func,
  fallback: PropTypes.func
};
