import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";
import gov from "./gov";
import edu from "./edu";
import ssgwsg from "./ssgwsg";

export default addDirToTemplatePath("sg", { ...gov, ...edu, ...ssgwsg });
