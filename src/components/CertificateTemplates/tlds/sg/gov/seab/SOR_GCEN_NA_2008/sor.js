import { TEMPLATE_ESOR } from "../common/template";

const Template = certificate => (
  <span>{TEMPLATE_ESOR(certificate, "GCEN", "NA")}</span>
);

export default Template;
