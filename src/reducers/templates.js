import { initialState } from "./certificate";

// Actions

export const types = {
  PRELOAD_TEMPLATE_CHUNK: "PRELOAD_TEMPLATE_CHUNK",
  TEMPLATE_CHUNK_LOADED: "TEMPLATE_CHUNK_LOADED"
};

// Reducers

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.PRELOAD_TEMPLATE_CHUNK:
      return {
        ...initialState,
        loadingTemplate: action.payload
      };
    default:
      return state;
  }
}
