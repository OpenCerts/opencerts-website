import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const RPAA2018PMAIN = dynamic(
  import("./2018-P-MAIN" /* webpackChunkName: "RPTemplates" */)
);
const RPAA2018CDPLUS = dynamic(
  import("./2018-C-DPLUS" /* webpackChunkName: "RPTemplates" */)
);
const RPAA2018CMC = dynamic(
  import("./2018-C-MC" /* webpackChunkName: "RPTemplates" */)
);
const templates = {
  "2018-P-MAIN": RPAA2018PMAIN,
  "2018-C-DPLUS": RPAA2018CDPLUS,
  "2018-C-MC": RPAA2018CMC
};

export default addDirToTemplatePath("rp", templates);
