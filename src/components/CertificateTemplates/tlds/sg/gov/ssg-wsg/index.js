import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const FQ001 = dynamic(() =>
  import("./FQ-001" /* webpackChunkName: "SSGTemplates" */)
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
const SOAIT001 = dynamic(() =>
  import("./SOA-IT-001" /* webpackChunkName: "SSGTemplates" */)
);

const Transcript = dynamic(() =>
  import("./Trans" /* webpackChunkName: "SSGTemplates" */)
);

const templates = {
  "FQ-001": FQ001,
  SF_FQ_002: SFFQ002,
  SF_FQ_004: SFFQ004,

  QUAL_Reprint: QualReprint,
  "SOA-001": SOA001,
  "SOA-002": SOA002,
  "SOA-003": SOA003,
  SF_SOA_001: SFSOA001,
  SOA_Reprint: SOAReprint,
  SOA_SV_001: SOASV001,
  SF_SOA_SV_001: SOASV001,
  "SOA-ES-001": SOAES001,
  SF_SOA_ES_001: SFSOAES001,
  "SOA-IT-001": SOAIT001,
  Trans: Transcript
};

export default addDirToTemplatePath("ssg-wsg", templates);
