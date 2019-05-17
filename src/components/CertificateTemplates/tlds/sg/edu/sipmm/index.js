import dynamic from "next/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

export default addDirToTemplatePath("sipmm", {
  "2019-May-SIPMM-Opencerts-Associate": dynamic(() => import("./2019-May-SIPMM-Opencerts-Associate" /* webpackChunkName: "sipmm-Templates" */))
});
