import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";
import Certificate from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Certificate
  }
];

const addresses = ["0x8F09411B92dbC3e37a46461D0DB1D614d820E669"];

const CBCCert = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={addresses}
  />
);

CBCCert.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default CBCCert;
