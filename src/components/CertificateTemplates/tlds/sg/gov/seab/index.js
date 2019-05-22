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
const SORGCEABefore2002 = dynamic(() =>
  import("./SOR_GCEA_before_2002" /* webpackChunkName: "SEABTemplates" */)
);
const SORGCEA20022005 = dynamic(() =>
  import("./SOR_GCEA_2002_2005" /* webpackChunkName: "SEABTemplates" */)
);
const SORGCEA2 = dynamic(() =>
  import("./SOR_GCEA_2006_OldSyll" /* webpackChunkName: "SEABTemplates" */)
);
const SORGCEA3 = dynamic(() =>
  import("./SOR_GCEA_2006_NewSyll" /* webpackChunkName: "SEABTemplates" */)
);

const templates = {
  SOR_GCEO: SORGCEO,
  SOR_GCEN_before_2008: SORGCEN,
  SOR_GCEN_NA_2008: SORGCENNA,
  SOR_GCEN_NT_2008: SORGCENNT,
  SOR_GCEA_before_2002: SORGCEABefore2002,
  SOR_GCEA_2002_2005: SORGCEA20022005,
  SOR_GCEA_2006_OldSyll: SORGCEA2,
  SOR_GCEA_2006_NewSyll: SORGCEA3
};

export default addDirToTemplatePath("seab", templates);
