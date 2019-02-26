import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import singaporetech from "./singaporetech";
import np from "./np";
import ibs from "./ibs";

export default addDirToTemplatePath("edu", { ...singaporetech, ...np, ...ibs });
