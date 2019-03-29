import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const NPAA2018MAIN = dynamic(() =>
  import("./NP-AA2018-MAIN" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2018OPTION = dynamic(() =>
  import("./NP-AA2018-OPTION" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2018BMSCLT = dynamic(() =>
  import("./NP-AA2018-BMS(CLT)" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2018ECH = dynamic(() =>
  import("./NP-AA2018-ECH" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2018LDH = dynamic(() =>
  import("./NP-AA2018-LDH" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2018PHARM = dynamic(() =>
  import("./NP-AA2018-PHARM" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2018DPP = dynamic(() =>
  import("./NP-AA2018-DPP" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPCET2019PTDMAIN = dynamic(() =>
  import("./NP-CET2019-PTDMAIN" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPCET2019PDPMAIN = dynamic(() =>
  import("./NP-CET2019-PDPMAIN" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPCET2019SDPCN = dynamic(() =>
  import("./NP-CET2019-SDPCN" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPCET2019SDCGN = dynamic(() =>
  import("./NP-CET2019-SDCGN" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2019NIEC = dynamic(() =>
  import("./NP-AA2019-NIEC" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const NPAA2019OPTNIEC = dynamic(() =>
  import("./NP-AA2019-OPT-NIEC" /* webpackChunkName: "NgeeAnnTemplates" */)
);
const templates = {
  "2018-main": NPAA2018MAIN,
  "2018-option": NPAA2018OPTION,
  "2018-bms-clt": NPAA2018BMSCLT,
  "2018-ech": NPAA2018ECH,
  "2018-ldh": NPAA2018LDH,
  "2018-pharm": NPAA2018PHARM,
  "2018-dpp": NPAA2018DPP,
  "NP-CET2019-PTDMAIN": NPCET2019PTDMAIN,
  "NP-CET2019-PDPMAIN": NPCET2019PDPMAIN,
  "NP-CET2019-SDPCN": NPCET2019SDPCN,
  "NP-CET2019-SDCGN": NPCET2019SDCGN,
  "NP-AA2019-NIEC": NPAA2019NIEC,
  "NP-AA2019-OPT-NIEC": NPAA2019OPTNIEC
  };

export default addDirToTemplatePath("np", templates);
