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

const ftdipplus = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={ApprovedAddresses}
  />
);

export default ftdipplus;
