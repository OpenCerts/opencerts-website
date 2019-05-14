import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import Certificate from "./certificate";
import { approvedAddresses } from "../common";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Certificate
  }
];

const Template2019FebExample = () => (
  <MultiCertificateRenderer templates={templates}  whitelist={approvedAddresses} />
);

export default Template2019FebExample;
