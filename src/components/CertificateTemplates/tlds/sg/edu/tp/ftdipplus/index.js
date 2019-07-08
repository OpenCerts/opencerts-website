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

const ftdipplus = props => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={ApprovedAddresses}
    {...props}
  />
);

export default ftdipplus;
