import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import Certificate from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Certificate
  }
];

const GovTech = props => (
  <MultiCertificateRenderer templates={templates} {...props} />
);

GovTech.propTypes = {};

export default GovTech;
