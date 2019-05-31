import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const GovtechDemoCert = dynamic(() =>
  import("./Govtech-Demo-Cert" /* webpackChunkName: "govtech-Templates" */)
);

const templates = {
  "Govtech-Demo-Cert": GovtechDemoCert
};

export default addDirToTemplatePath("govtech", templates);
