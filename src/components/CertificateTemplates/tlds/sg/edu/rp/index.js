import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const RPAA2018PMAIN = dynamic(
  import("./2018-P-MAIN" /* webpackChunkName: "RPTemplates" */)
);

const templates = {
  "2018-P-MAIN": RPAA2018PMAIN
};

export default addDirToTemplatePath("rp", templates);
