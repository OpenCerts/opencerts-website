import dynamic from "template-utils/dynamic";
import legacy from "./legacy";

import tlds from "./tlds";

const DefaultCert = dynamic(() => import("./Default"));
const DemoCert = dynamic(() => import("./example/Demo-CertTemplate"));

const templates = {
  default: DefaultCert,
  DEMOCERT: DemoCert,
  ...legacy,
  ...tlds
};

export default templates;
