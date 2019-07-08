import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import DefaultCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: DefaultCert
  }
];

const DefaultTemplate = props => (
  <MultiCertificateRenderer templates={templates} {...props} />
);
DefaultTemplate.displayName = "Default Template";

export default DefaultTemplate;
