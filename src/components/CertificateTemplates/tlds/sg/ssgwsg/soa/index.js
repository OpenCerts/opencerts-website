import dynamic from "template-utils/dynamic";

const SFSOA001 = dynamic(() =>
  import("./SF-SOA-001" /* webpackChunkName: "SSGTemplates" */)
);

export default {
  "SF-SOA-001": SFSOA001
};
