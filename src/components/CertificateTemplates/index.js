import dynamic from "next/dynamic";
import legacy from "./legacy";
import sg from "./sg";

const DefaultCert = dynamic(import("./Default"));

const templates = {
  default: DefaultCert,
  ...legacy,
  ...sg
  // Insert new country TLDs above this line
};

export default templates;
