import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import singaporetech from "./singaporetech";
import np from "./np";
import np from "./ibs";

export default addDirToTemplatePath("edu", { ...singaporetech, ...np, ...ibs });
