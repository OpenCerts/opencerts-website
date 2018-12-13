import PropTypes from "prop-types";
import Certificate from "./certificate";
import { MultiCertificateRenderer } from "../../MultiCertificateRenderer";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Certificate
  }
];

const addresses = [
  "0x536EdEd27ae895F503E64Af877ee742B7bBC1ea2",
  "0x897E224a6a8b72535D67940B3B8CE53f9B596800"
];

const SITCert = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={addresses}
  />
);

SITCert.displayName = "SITCert";

SITCert.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default SITCert;
