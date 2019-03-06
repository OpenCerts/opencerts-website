import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import singaporetech from "./singaporetech";
import np from "./np";

export default addDirToTemplatePath("edu", { ...singaporetech, ...np });
