import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";
import tech from "./tech";
import ssgwsg from "./ssg-wsg";
import seab from "./seab";

export default addDirToTemplatePath("gov", { ...tech, ...ssgwsg, ...seab });
