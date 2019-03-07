import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";
import tech from "./tech";
import seab from "./seab";

export default addDirToTemplatePath("gov", { ...tech, ...seab });
