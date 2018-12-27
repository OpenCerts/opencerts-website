import addDirToTemplatePath from "../addDirToTemplatePath";
import gov from "./gov";
import edu from "./edu";

export default addDirToTemplatePath("sg", { ...gov, ...edu });
