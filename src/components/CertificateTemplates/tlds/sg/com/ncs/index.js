import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const NCS01 = dynamic(() =>
  import("./2019-04-NCS-01" /* webpackChunkName: "NCSTemplates" */)
);
const NCS02 = dynamic(() =>
  import("./2019-04-NCS-02" /* webpackChunkName: "NCSTemplates" */)
);

const templates = {
  "2019-04-NCS-01": NCS01,
  "2019-04-NCS-02": NCS02
};

export default addDirToTemplatePath("ncs", templates);
