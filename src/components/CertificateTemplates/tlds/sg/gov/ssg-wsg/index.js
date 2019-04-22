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

const SOA001 = dynamic(() =>
  import("./SOA-001" /* webpackChunkName: "SSGTemplates" */)
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
  "SOA-001": SOA001,
  Trans: Transcript
};

export default addDirToTemplatePath("ssg-wsg", templates);
