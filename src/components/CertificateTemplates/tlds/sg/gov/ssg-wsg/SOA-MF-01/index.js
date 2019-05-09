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

const SOA001 = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

SOA001.displayName = "SOA001 Template";

export default SOA001;
