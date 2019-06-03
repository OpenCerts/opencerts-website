import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const GovtechDemo = dynamic(() =>
  import("./Govtech-Demo-Cert" /* webpackChunkName: "GovTechTemplates" */)
);

const templates = {
  "Govtech-Demo-Cert": GovtechDemo
};

export default addDirToTemplatePath("tech", templates);
