import dynamic from "template-utils/dynamic";

const SOA001 = dynamic(() =>
  import("./SOA-001" /* webpackChunkName: "SSGTemplates" */)
);

export default {
  "SOA-001": SOA001
};
