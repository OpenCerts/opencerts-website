import { combineReducers } from "redux";

import application from "./application";
import certificate from "./certificate";

export default combineReducers({
  application,
  certificate
});
