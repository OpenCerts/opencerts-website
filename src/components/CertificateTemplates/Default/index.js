import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";
import DefaultCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: DefaultCert
  }
];

const DefaultTemplate = ({ certificate, handleObfuscation }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    handleObfuscation={handleObfuscation}
  />
);

DefaultTemplate.displayName = "Default Template";
DefaultTemplate.propTypes = {
  certificate: PropTypes.object.isRequired,
  handleObfuscation: PropTypes.func
};
export default DefaultTemplate;
