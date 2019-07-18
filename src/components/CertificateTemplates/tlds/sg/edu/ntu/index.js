import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const NTUDEGREE = dynamic(() =>
  import("./2019-July-NTU-UG" /* webpackChunkName: "ntu-Templates" */)
);

const NTULKCDEGREE = dynamic(() =>
  import("./2019-July-LKC-UG" /* webpackChunkName: "ntu-Templates" */)
);

const NTUPACE = dynamic(() =>
  import("./2019-July-PACE" /* webpackChunkName: "ntu-Templates" */)
);

// const NTUDEGREE = dynamic(() =>
//   import("./2019-July-NTU-UG" /* webpackChunkName: "ntu-Templates" */)
// );

const templates = {
  "2019-ntu-degree": NTUDEGREE,
  "2019-lkc-degree": NTULKCDEGREE,
  "2019-July-PACE": NTUPACE

  // "2019-ntu-degree": NTUDEGREE
};

export default addDirToTemplatePath("ntu", templates);
