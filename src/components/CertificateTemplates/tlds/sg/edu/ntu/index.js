import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const NTUDEGREE = dynamic(() =>
  import("./2019-July-NTU-UG" /* webpackChunkName: "ntu-Templates" */)
);

const templates = {
  "2019-ntu-degree": NTUDEGREE
};

export default addDirToTemplatePath("ntu", templates);
