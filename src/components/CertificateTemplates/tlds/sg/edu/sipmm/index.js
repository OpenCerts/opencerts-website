import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const SIPMM2019MAY = dynamic(() =>
  import(
    "./2019-May-SIPMM-Opencerts-Associate" /* webpackChunkName: "sipmmTemplates" */
  )
);
const templates = {
  "2019-May-SIPMM-Opencerts-Associate": SIPMM2019MAY
};

export default addDirToTemplatePath("sipmm", templates);
