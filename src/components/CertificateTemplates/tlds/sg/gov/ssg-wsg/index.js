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
const SOAHR01 = dynamic(() =>
  import("./SOA-HR-01" /* webpackChunkName: "SSGTemplates" */)
);
const SFSOAHR01 = dynamic(() =>
  import("./SF_SOA_HR_01" /* webpackChunkName: "SSGTemplates" */)
);
const SOAFB001 = dynamic(() =>
  import("./SOA-FB-001" /* webpackChunkName: "SSGTemplates" */)
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
  "SOA-HR-01": SOAHR01,
  "SOA-FB-001": SOAFB001,

  SF_SOA_FB_001: SOAFB001,
  "SOA-HR-02": SOAHR01,
  "SOA-HR-03": SOAHR01,
  "SOA-HR-04": SOAHR01,
  "SOA-HR-05": SOAHR01,
  SF_SOA_HR_01: SFSOAHR01,
  SF_SOA_HR_02: SFSOAHR01,
  SF_SOA_HR_03: SFSOAHR01,
  SF_SOA_HR_04: SFSOAHR01,
  SF_SOA_HR_05: SFSOAHR01,
  "SOA-IT-001": SOAIT001,
  Trans: Transcript
};

export default addDirToTemplatePath("ssg-wsg", templates);
