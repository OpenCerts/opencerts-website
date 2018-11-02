import DefaultCert from "./Default";
import NPAA2018MAIN from "./NgeeAnnPolytechnic/NP-AA2018-MAIN";
import NPAA2018OPTION from "./NgeeAnnPolytechnic/NP-AA2018-OPTION";
import NPAA2018BMSCLT from "./NgeeAnnPolytechnic/NP-AA2018-BMS(CLT)";
import NPAA2018ECH from "./NgeeAnnPolytechnic/NP-AA2018-ECH";
import NPAA2018LDH from "./NgeeAnnPolytechnic/NP-AA2018-LDH";
import NPAA2018PHARM from "./NgeeAnnPolytechnic/NP-AA2018-PHARM";

const templates = {
  default: DefaultCert,
  "NP-AA2018-MAIN": NPAA2018MAIN,
  "NP-AA2018-OPTION": NPAA2018OPTION,
  "NP-AA2018-BMS(CLT)": NPAA2018BMSCLT,
  "NP-AA2018-ECH": NPAA2018ECH,
  "NP-AA2018-LDH": NPAA2018LDH,
  "NP-AA2018-PHARM": NPAA2018PHARM
};

export default templates;
