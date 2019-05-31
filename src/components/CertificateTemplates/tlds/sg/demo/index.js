/* eslint-disable camelcase */
/* because we need to use _ to replace hyphens in dns */
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import govtech from "./govtech";

export default addDirToTemplatePath("demo", { ...govtech });
