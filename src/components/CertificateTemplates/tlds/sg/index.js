import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";
import gov from "./gov";
import edu from "./edu";
import co from "./co";

export default addDirToTemplatePath("sg", { ...gov, ...edu, ...co });
