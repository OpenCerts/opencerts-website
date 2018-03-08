import { combineReducers } from "redux";

import certificate from "./certificate";
import admin from "./admin";

export default combineReducers({
  certificate,
  admin
});
