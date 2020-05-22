import { combineReducers } from "redux";

import certificate from "./certificate";
import featureToggle from "./featureToggle";

const rootReducer = combineReducers({
  certificate,
  featureToggle,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
