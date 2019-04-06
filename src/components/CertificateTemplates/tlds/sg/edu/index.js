import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import singaporetech from "./singaporetech";
import np from "./np";
import tp from "./tp";

export default addDirToTemplatePath("edu", { ...singaporetech, ...np, ...tp });
