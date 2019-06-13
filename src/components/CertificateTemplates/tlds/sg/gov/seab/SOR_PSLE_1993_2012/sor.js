import { TEMPLATE_ESOR } from "../common/template";

const Template = certificate => (
  <span>{TEMPLATE_ESOR(certificate, "PSLE", "PSLE19932012")}</span>
);

export default Template;
