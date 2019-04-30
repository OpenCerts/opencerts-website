import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";
import ncs from "./ncs";

export default addDirToTemplatePath("com", { ...ncs });
