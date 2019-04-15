import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import singaporetech from "./singaporetech";
import np from "./np";
import rp from "./rp";

export default addDirToTemplatePath("edu", { ...singaporetech, ...np, ...rp });
