import dynamic from "next/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const templates = {
  "2019-ntu-degree": dynamic(() =>
    import("./2019-July-NTU-UG" /* webpackChunkName: "ntu-Templates" */)
  )
};

export default addDirToTemplatePath("ntu", templates);
