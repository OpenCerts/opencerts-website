import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import Certificate from "./certificate";
import { approvedAddresses } from "../common";

const Template = Certificate({});

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: Template
  }
];

const NTU2019UG = () => (
  <MultiCertificateRenderer
    templates={templates}
    approvedAddresses={approvedAddresses}
  />
);

export default NTU2019UG;
