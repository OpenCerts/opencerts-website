import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";

import TPCert from "./certificate";
import ApprovedAddresses from "../common/approvedAddresses";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: TPCert
  }
];

const ptmc = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={ApprovedAddresses}
  />
);

export default ptmc;
