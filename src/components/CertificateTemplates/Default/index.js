import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import DefaultCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: DefaultCert
  }
];

const DefaultTemplate = () => (
  <MultiCertificateRenderer templates={templates} />
);

DefaultTemplate.displayName = "Default Template";

export default DefaultTemplate;
