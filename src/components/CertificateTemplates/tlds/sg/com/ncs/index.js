import dynamic from "template-utils/dynamic";

const NCS01 = dynamic(
  import("./2019-04-NCS-01" /* webpackChunkName: "NCSTemplates" */)
);
const NCS02 = dynamic(
  import("./2019-04-NCS-02" /* webpackChunkName: "NCSTemplates" */)
);

export default {
  "2019-04-NCS-01": NCS01,
  "2019-04-NCS-02": NCS02
};
