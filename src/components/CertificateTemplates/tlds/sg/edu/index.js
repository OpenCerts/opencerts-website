import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import singaporetech from "./singaporetech";
import np from "./np";
import nyp from "./nyp";
import rp from "./rp";
import tp from "./tp";

export default addDirToTemplatePath("edu", {
  ...singaporetech,
  ...np,
  ...nyp,
  ...tp,
  ...rp
});
