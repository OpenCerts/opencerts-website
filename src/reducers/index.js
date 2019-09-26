import { combineReducers } from "redux";

import application from "./application";
import certificate from "./certificate";
import featureToggle from "./featureToggle";

export default combineReducers({
  application,
  certificate,
  featureToggle
});
