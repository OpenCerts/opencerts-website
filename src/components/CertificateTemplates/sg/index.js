import mapDir from "../mapDir";
import gov from "./gov";
import edu from "./edu";

export default mapDir("sg", { ...gov, ...edu });
