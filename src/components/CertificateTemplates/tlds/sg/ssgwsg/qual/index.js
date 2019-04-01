import dynamic from "template-utils/dynamic";

const FQ001 = dynamic(() =>
  import("./FQ-001" /* webpackChunkName: "SSGTemplates" */)
);

export default {
  "FQ-001": FQ001
};
