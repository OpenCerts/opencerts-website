import dynamic from "next/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const NPAA2018MAIN = dynamic(
  import("./NP-AA2018-MAIN" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2018OPTION = dynamic(
  import("./NP-AA2018-OPTION" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2018BMSCLT = dynamic(
  import("./NP-AA2018-BMS(CLT)" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2018ECH = dynamic(
  import("./NP-AA2018-ECH" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2018LDH = dynamic(
  import("./NP-AA2018-LDH" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2018PHARM = dynamic(
  import("./NP-AA2018-PHARM" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2018DPP = dynamic(
  import("./NP-AA2018-DPP" /* webpackChunkName: "NgeeAnnTemplates" */)
);

const templates = {
  "2018-main": NPAA2018MAIN,
  "2018-option": NPAA2018OPTION,
  "2018-bms-clt": NPAA2018BMSCLT,
  "2018-ech": NPAA2018ECH,
  "2018-ldh": NPAA2018LDH,
  "2018-pharm": NPAA2018PHARM,
  "2018-dpp": NPAA2018DPP
};

export default addDirToTemplatePath("np", templates);
