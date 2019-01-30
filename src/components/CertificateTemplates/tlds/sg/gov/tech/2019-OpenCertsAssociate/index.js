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

const GovTech = ({ certificate }) => (
  <MultiCertificateRenderer certificate={certificate} templates={templates} />
);

GovTech.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default GovTech;
