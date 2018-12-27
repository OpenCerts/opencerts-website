import dynamic from "next/dynamic";
import mapDir from "../../../mapDir";

const SITCert2018 = dynamic(
  import("./2018-certificate" /* webpackChunkName: "SITTemplates" */)
);

const templates = {
  "2018-certificate": SITCert2018
};

export default mapDir("singaporetech", templates);
