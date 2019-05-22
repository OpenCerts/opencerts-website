import { TEMPLATE_ESOR } from "../common/template";

const Template = certificate => (
  <span>{TEMPLATE_ESOR(certificate, "GCEA", "A")}</span>
);

export default Template;
