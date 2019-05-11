import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

// E27
const E272019ECHELONCERT = dynamic(() =>
  import("./E27-2019-ECHELON-CERT" /* webpackChunkName: "ITETemplates" */)
);

const templates = {
  "E27-2019-ECHELON-CERT": E272019ECHELONCERT
};

export default addDirToTemplatePath("optimatic", templates);
