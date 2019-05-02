import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import singaporetech from "./singaporetech";
import np from "./np";
import nyp from "./nyp";
import rp from "./rp";

export default addDirToTemplatePath("edu", { ...singaporetech, ...np, ...nyp, ...rp });
