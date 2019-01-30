import dynamic from "next/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const SITCert2018 = dynamic(
  import("./2018-certificate" /* webpackChunkName: "SITTemplates" */)
);

const templates = {
  "2018-certificate": SITCert2018
};

export default addDirToTemplatePath("singaporetech", templates);
