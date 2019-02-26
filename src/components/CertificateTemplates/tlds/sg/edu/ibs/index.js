import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const IBSCert2019CBC = dynamic(() =>
  import("./2019-cbc" /* webpackChunkName: "IBSCertTemplates" */)
);

const templates = {
  "2019-cbc": IBSCert2019CBC
};

export default addDirToTemplatePath("ibs", templates);
