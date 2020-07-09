import { FeatureTogglesTypes } from "./featureToggle.actions";

interface FeatureToggleState {
  [key: string]: boolean;
}
const initialState: FeatureToggleState = {};

export function reducer(state = initialState, action: FeatureTogglesTypes): FeatureToggleState {
  switch (action.type) {
    case "UPDATE_FEATURE_TOGGLES":
      return action.payload;
    default:
      return state;
  }
}
