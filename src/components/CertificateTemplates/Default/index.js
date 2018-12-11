import { MultiCertificateRenderer } from "../../MultiCertificateRenderer";
import DefaultCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: DefaultCert
  }
];

export default ({ certificate }) => {
  return (
    <MultiCertificateRenderer certificate={certificate} templates={templates} />
  );
};
