import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const SORGCEO = dynamic(() =>
  import("./SOR_GCEO" /* webpackChunkName: "SEABTemplates" */)
);

const templates = {
  SOR_GCEO: SORGCEO
};

export default addDirToTemplatePath("seab", templates);
