import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";
import tech from "./tech";

export default addDirToTemplatePath("gov", { ...tech });
