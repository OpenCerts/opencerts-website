import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const pre2012ftdip = dynamic(() =>
  import("./pre-2012-ftdip" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const pre2012ftdipniec = dynamic(()=>
  import("./pre-2012-ftdipniec" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const pre2012ftdipplus = dynamic(() =>
  import("./pre-2012-ftdipplus" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

// const post2012ftdip = dynamic(()=>
//   import("./post-2012-ftdip" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
// );

// const post2012ftdipniec = dynamic(()=>
//   import("./post-2012-ftdipniec" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
// );

// const post2012ftpfp = dynamic(()=>
//   import("./post-2012-ftpfp" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
// );

const templates = {
  "pre-2012-ftdip": pre2012ftdip
  "pre-2012-ftdipniec" : pre2012ftdipniec
  // "pre-2012-ftdipplus" : pre2012ftdipplus,

  // "post-2012-ftdip" : post2012ftdip,
  // "post-2012-ftdipniec" : post2012ftdipniec,
  // "post-2012-ftpfp" : post2012ftpfp
};

export default addDirToTemplatePath("tp", templates);
