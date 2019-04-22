import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const FQ001 = dynamic(() =>
  import("./FQ-001" /* webpackChunkName: "SSGTemplates" */)
);

const FQ002 = dynamic(() =>
  import("./FQ-002" /* webpackChunkName: "SSGTemplates" */)
);

const FQ004 = dynamic(() =>
  import("./FQ-004" /* webpackChunkName: "SSGTemplates" */)
);

const FQ005 = dynamic(() =>
  import("./FQ-005" /* webpackChunkName: "SSGTemplates" */)
);

const FQ006 = dynamic(() =>
  import("./FQ-006" /* webpackChunkName: "SSGTemplates" */)
);

const SFFQ001 = dynamic(() =>
  import("./SF_FQ_001" /* webpackChunkName: "SSGTemplates" */)
);

const SFFQ002 = dynamic(() =>
  import("./SF_FQ_002" /* webpackChunkName: "SSGTemplates" */)
);

const SFFQ004 = dynamic(() =>
  import("./SF_FQ_004" /* webpackChunkName: "SSGTemplates" */)
);

const QualReprint = dynamic(() =>
  import("./QUAL_Reprint" /* webpackChunkName: "SSGTemplates" */)
);
const SOA001 = dynamic(() =>
  import("./SOA-001" /* webpackChunkName: "SSGTemplates" */)
);

const SOA002 = dynamic(() =>
  import("./SOA-002" /* webpackChunkName: "SSGTemplates" */)
);

const SOA003 = dynamic(() =>
  import("./SOA-003" /* webpackChunkName: "SSGTemplates" */)
);

const SFSOA001 = dynamic(() =>
  import("./SF_SOA_001" /* webpackChunkName: "SSGTemplates" */)
);
const SOAReprint = dynamic(() =>
  import("./SOA_Reprint" /* webpackChunkName: "SSGTemplates" */)
);
const SOASV001 = dynamic(() =>
  import("./SOA_SV_001" /* webpackChunkName: "SSGTemplates" */)
);
const SOAES001 = dynamic(() =>
  import("./SOA-ES-001" /* webpackChunkName: "SSGTemplates" */)
);
const SFSOAES001 = dynamic(() =>
  import("./SF_SOA_ES_001" /* webpackChunkName: "SSGTemplates" */)
);
const SFSOAHR01 = dynamic(() =>
  import("./SF_SOA_HR_01" /* webpackChunkName: "SSGTemplates" */)
);
const SFSOAIT001 = dynamic(() =>
  import("./SF_SOA_IT_001" /* webpackChunkName: "SSGTemplates" */)
);
const SFSOAMF01 = dynamic(() =>
  import("./SF_SOA_MF_01" /* webpackChunkName: "SSGTemplates" */)
);
const Transcript = dynamic(() =>
  import("./Trans" /* webpackChunkName: "SSGTemplates" */)
);

const templates = {
  "FQ-001": FQ001,
  "FQ-002": FQ002,
  "FQ-004": FQ004,
  "FQ-005": FQ005,
  "FQ-006": FQ006,
  SF_FQ_001: SFFQ001,
  SF_FQ_002: SFFQ002,
  SF_FQ_004: SFFQ004,
  SF_FQ_005: FQ005,
  SF_FQ_006: FQ006,
  QUAL_Reprint: QualReprint,
  "SOA-001": SOA001,
  "SOA-002": SOA002,
  "SOA-003": SOA003,
  SF_SOA_001: SFSOA001,
  SF_SOA_002: SOA002,
  SF_SOA_003: SOA003,
  SOA_Reprint: SOAReprint,
  SOA_SV_001: SOASV001,
  SF_SOA_SV_001: SOASV001,
  "SOA-ES-001": SOAES001,
  SF_SOA_ES_001: SFSOAES001,
  SF_SOA_HR_01: SFSOAHR01,
  SF_SOA_HR_02: SFSOAHR01,
  SF_SOA_HR_03: SFSOAHR01,
  SF_SOA_HR_04: SFSOAHR01,
  SF_SOA_HR_05: SFSOAHR01,
  SF_SOA_IT_001: SFSOAIT001,
  SF_SOA_MF_01: SFSOAMF01,
  SF_SOA_MF_02: SFSOAMF01,
  Trans: Transcript
};

export default addDirToTemplatePath("ssg-wsg", templates);
