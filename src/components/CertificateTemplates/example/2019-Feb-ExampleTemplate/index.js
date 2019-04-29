import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import Certificate from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Certificate
  }
];

const Template2019FebExample = () => (
  <MultiCertificateRenderer templates={templates} />
);

export default Template2019FebExample;
