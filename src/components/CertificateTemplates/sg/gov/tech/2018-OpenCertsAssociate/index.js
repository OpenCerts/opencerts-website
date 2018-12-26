import PropTypes from "prop-types";
import Certificate from "./certificate";
import { MultiCertificateRenderer } from "../../../../MultiCertificateRenderer";

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

// GovTech.displayName = "GovTech";

GovTech.propTypes = {
  certificate: PropTypes.object.isRequired
};

// export const OpenCertsTemplate = GovTech;

export default GovTech;
