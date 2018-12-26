import dynamic from "next/dynamic";

const SITCert2018 = dynamic(
  import("./2018" /* webpackChunkName: "SITTemplates" */)
);

export default {
  "sg/edu/singaporetech/2018": SITCert2018,
  SITCerts: SITCert2018
};
