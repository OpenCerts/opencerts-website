import dynamic from "next/dynamic";
import sg from "./sg";

const DefaultCert = dynamic(import("./Default"));

const templates = {
  default: DefaultCert,
  ...sg
  // Insert new country TLDs above this line
};

export default templates;
