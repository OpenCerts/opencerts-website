import dynamic from "next/dynamic";

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

export default {
  // Legacy Mappings
  "NP-AA2018-MAIN": NPAA2018MAIN,
  "NP-AA2018-OPTION": NPAA2018OPTION,
  "NP-AA2018-BMS(CLT)": NPAA2018BMSCLT,
  "NP-AA2018-ECH": NPAA2018ECH,
  "NP-AA2018-LDH": NPAA2018LDH,
  "NP-AA2018-PHARM": NPAA2018PHARM,
  "NP-AA2018-DPP": NPAA2018DPP
};
