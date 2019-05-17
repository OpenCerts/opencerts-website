import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import Certificate from "./certificate";
import Transcript from "./transcript";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Certificate
  },
  {
    id: "transcript",
    label: "Transcript",
    template: Transcript
  }
];

const Template2019FebExample = () => (
  <MultiCertificateRenderer templates={templates} />
);

export default Template2019FebExample;
