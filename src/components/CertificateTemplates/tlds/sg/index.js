import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";
import gov from "./gov";
import edu from "./edu";

export default addDirToTemplatePath("sg", { ...gov, ...edu });
