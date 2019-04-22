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

const addresses = [
  "0x5f007251c78cA92d3053492cCf0EDC161063624c",
  "0x5CA3b9daC85DA4DE4030e59C1a0248004209e348"
];

const NYPCert = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={addresses}
  />
);

NYPCert.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default NYPCert;
