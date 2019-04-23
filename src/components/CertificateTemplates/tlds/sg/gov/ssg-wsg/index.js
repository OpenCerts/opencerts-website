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
const SOA001 = dynamic(() =>
  import("./SOA-001" /* webpackChunkName: "SSGTemplates" */)
);

const SOA002 = dynamic(() =>
  import("./SOA-002" /* webpackChunkName: "SSGTemplates" */)
);

const SOA003 = dynamic(() =>
  import("./SOA-003" /* webpackChunkName: "SSGTemplates" */)
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

  "FQ-002": FQ002,
  "FQ-004": FQ004,
  "FQ-005": FQ005,
  "FQ-006": FQ006,
  SF_FQ_001: SFFQ001,

  "SOA-001": SOA001,
  "SOA-002": SOA002,
  "SOA-003": SOA003,
  "SOA-IT-001": SOAIT001,
  Trans: Transcript
};

export default addDirToTemplatePath("ssg-wsg", templates);
