import dynamic from "next/dynamic";

const OpenCertsAssociate2018 = dynamic(
  import("./2018-OpenCertsAssociate" /* webpackChunkName: "GovTechTemplates" */)
);
const OpenCertsAssociate2019 = dynamic(
  import("./2019-OpenCertsAssociate" /* webpackChunkName: "GovTechTemplates" */)
);

export default {
  "2018-OpenCertsAssociate": OpenCertsAssociate2018,
  "2019-OpenCertsAssociate": OpenCertsAssociate2019
};
