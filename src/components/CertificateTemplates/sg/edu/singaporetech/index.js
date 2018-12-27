import dynamic from "next/dynamic";
import mapDir from "../../../mapDir";

const SITCert2018 = dynamic(
  import("./2018" /* webpackChunkName: "SITTemplates" */)
);

const templates = {
  "2018": SITCert2018
};

export default mapDir("singaporetech", templates);
