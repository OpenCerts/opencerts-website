import { combineReducers } from "redux";

import { reducer as certificate } from "./certificate";
import { reducer as featureToggle } from "./featureToggle";

export const rootReducer = combineReducers({
  certificate,
  featureToggle,
});
export type RootState = ReturnType<typeof rootReducer>;
