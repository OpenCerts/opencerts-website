import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FeatureToggleState {
  [key: string]: boolean;
}
const initialState: FeatureToggleState = {};

export const featureToggleSlice = createSlice({
  name: "featureToggle",
  initialState,
  reducers: {
    updateFeatureToggles: (_, { payload }: PayloadAction<{ [key: string]: boolean }>) => payload,
  },
});

export const { updateFeatureToggles } = featureToggleSlice.actions;

export const featureToggleReducer = featureToggleSlice.reducer;
