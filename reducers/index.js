import { combineReducers } from "redux";

import application from "./application";
import certificate from "./certificate";
import admin from "./admin";

export default combineReducers({
  application,
  certificate,
  admin
});
