import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "../MultiCertificateRenderer";
import DefaultCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: DefaultCert
  }
];

const DefaultTemplate = ({ certificate }) => (
  <MultiCertificateRenderer certificate={certificate} templates={templates} />
);

DefaultTemplate.displayName = "Default Template";
DefaultTemplate.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default DefaultTemplate;
