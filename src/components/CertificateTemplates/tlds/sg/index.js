import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";
import gov from "./gov";
import edu from "./edu";
import com from "./com";

export default addDirToTemplatePath("sg", { ...gov, ...edu, ...com });
