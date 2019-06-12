import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const OpenCertsAssociate2018 = dynamic(() =>
  import("./2018-OpenCertsAssociate" /* webpackChunkName: "GovTechTemplates" */)
);
const GovtechDemo = dynamic(() =>
  import("./Govtech-Demo-Cert" /* webpackChunkName: "GovTechTemplates" */)
);

const Geekout2018 = dynamic(() =>
  import("./2018-Geekout" /* webpackChunkName: "GovTechTemplates" */)
);

const templates = {
  "2018-OpenCertsAssociate": OpenCertsAssociate2018,
  "Govtech-Demo-Cert": GovtechDemo,
  "2018-Geekout": Geekout2018
};

export default addDirToTemplatePath("tech", templates);
