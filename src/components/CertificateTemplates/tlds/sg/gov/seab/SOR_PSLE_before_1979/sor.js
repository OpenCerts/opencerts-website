import { TEMPLATE_ESOR } from "../common/template";

const Template = certificate => (
  <span>{TEMPLATE_ESOR(certificate, "PSLE", "PSLE1979")}</span>
);

export default Template;
