import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import optimatic from "./optimatic";

export default addDirToTemplatePath("co", {
  ...optimatic
});
