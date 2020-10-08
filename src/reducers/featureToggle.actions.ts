export const UPDATE_FEATURE_TOGGLES = "UPDATE_FEATURE_TOGGLES";

interface UpdateFeatureTogglesAction {
  type: typeof UPDATE_FEATURE_TOGGLES;
  payload: {
    [key: string]: boolean;
  };
}
export function updateFeatureToggles(payload: { [key: string]: boolean }): UpdateFeatureTogglesAction {
  return {
    type: UPDATE_FEATURE_TOGGLES,
    payload,
  };
}

export type FeatureTogglesTypes = UpdateFeatureTogglesAction;
