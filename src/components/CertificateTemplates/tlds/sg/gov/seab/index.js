import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const SORGCEO = dynamic(() =>
  import("./SOR_GCEO" /* webpackChunkName: "SEABTemplates" */)
);
const SORGCEN = dynamic(() =>
  import("./SOR_GCEN_before_2008" /* webpackChunkName: "SEABTemplates" */)
);
const SORGCENNA = dynamic(() =>
  import("./SOR_GCEN_NA_2008" /* webpackChunkName: "SEABTemplates" */)
);
const SORGCENNT = dynamic(() =>
  import("./SOR_GCEN_NT_2008" /* webpackChunkName: "SEABTemplates" */)
);

const templates = {
  SOR_GCEO: SORGCEO,
  SOR_GCEN_before_2008: SORGCEN,
  SOR_GCEN_NA_2008: SORGCENNA,
  SOR_GCEN_NT_2008: SORGCENNT
};

export default addDirToTemplatePath("seab", templates);
