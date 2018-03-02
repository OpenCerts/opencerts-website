import { combineReducers } from "redux";

import content from "./content";
import ethereum from "./ethereum";

export default combineReducers({
  content,
  ethereum
});
