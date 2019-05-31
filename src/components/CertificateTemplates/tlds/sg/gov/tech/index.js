import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const OpenCertsAssociate2018 = dynamic(() =>
  import("./2018-OpenCertsAssociate" /* webpackChunkName: "GovTechTemplates" */)
);
const OpenCertsAssociate2019 = dynamic(() =>
  import("./2019-OpenCertsAssociate" /* webpackChunkName: "GovTechTemplates" */)
);
const GovtechDemo = dynamic(() =>
  import("./Govtech-Demo-Cert" /* webpackChunkName: "GovTechTemplates" */)
);

const templates = {
  "2018-OpenCertsAssociate": OpenCertsAssociate2018,
  "2019-OpenCertsAssociate": OpenCertsAssociate2019,
  "Govtech-Demo-Cert": GovtechDemo
};

export default addDirToTemplatePath("tech", templates);
