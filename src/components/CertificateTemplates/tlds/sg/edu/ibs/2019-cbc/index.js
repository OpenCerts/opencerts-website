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

const addresses = ["0x391d72C22f40e37F91B65f36A2C6735D9B1fDAAD"];

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
