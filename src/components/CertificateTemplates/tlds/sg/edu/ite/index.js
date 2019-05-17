import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

// ITE
const ITE2019FULCERT1 = dynamic(() =>
  import("./ITE-2019-FUL-CERT-FULL1" /* webpackChunkName: "ITETemplates" */)
);
const ITE2019FULCERTNIEC1 = dynamic(() =>
  import(
    "./ITE-2019-FUL-CERT-FULL-NIEC1" /* webpackChunkName: "ITETemplates" */
  )
);
const ITE2019COMCERTNIEC1 = dynamic(() =>
  import("./ITE-2019-COM-CERT-COM-NIEC1" /* webpackChunkName: "ITETemplates" */)
);
const ITE2019COMCERT1 = dynamic(() =>
  import("./ITE-2019-COM-CERT-COM1" /* webpackChunkName: "ITETemplates" */)
);

const templates = {
  "ITE-2019-FUL-CERT-FULL1": ITE2019FULCERT1,
  "ITE-2019-FUL-CERT-FULL-NIEC1": ITE2019FULCERTNIEC1,
  "ITE-2019-COM-CERT-COM-NIEC1": ITE2019COMCERTNIEC1,
  "ITE-2019-COM-CERT-COM1": ITE2019COMCERT1
};

export default addDirToTemplatePath("ite", templates);
