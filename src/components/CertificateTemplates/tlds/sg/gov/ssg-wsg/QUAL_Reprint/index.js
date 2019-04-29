import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import SSGCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: SSGCert({})
  }
];

const Qual = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

Qual.displayName = "Qual Template";

export default Qual;
