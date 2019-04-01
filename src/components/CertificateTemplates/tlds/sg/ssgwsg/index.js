import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";
import qual from "./qual";
import transcript from "./transcript";
import soa from "./soa";

export default addDirToTemplatePath("SSG", { ...qual,...transcript,...soa });
