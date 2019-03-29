import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const NYPCert = dynamic(() =>
  import("./NYP-Main" /* webpackChunkName: "NYPTemplates" */)
);

const templates = {
  NYPMain: NYPCert
};

export default addDirToTemplatePath("nyp", templates);
