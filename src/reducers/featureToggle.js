export const types = {
  UPDATE_FEATURE_TOGGLES: "UPDATE_FEATURE_TOGGLES"
};
const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_FEATURE_TOGGLES:
      return action.payload;
    default:
      return state;
  }
}
