import dynamic from "template-utils/dynamic";

const Trans = dynamic(() =>
  import("./Trans" /* webpackChunkName: "SSGTemplates" */)
);

export default {
  Trans
};
