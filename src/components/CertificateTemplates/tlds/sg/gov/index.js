import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";
import tech from "./tech";
import ssgwsg from "./ssg-wsg";

export default addDirToTemplatePath("gov", { ...tech, ...ssgwsg });
