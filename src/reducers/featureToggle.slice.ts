import { createSlice } from "@reduxjs/toolkit";

interface FeatureToggleState {
  [key: string]: boolean;
}
const initialState: FeatureToggleState = {};

export const featureToggleSlice = createSlice({
  name: "featureToggle",
  initialState,
  reducers: {
    updateFeatureToggles: (_, { payload }) => payload,
  },
});

// Action creators are generated for each case reducer function
export const { updateFeatureToggles } = featureToggleSlice.actions;

export const featureToggleReducer = featureToggleSlice.reducer;
