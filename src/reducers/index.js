import { combineReducers } from "redux";

import certificate from "./certificate";
import featureToggle from "./featureToggle";

export default combineReducers({
  certificate,
  featureToggle,
});
