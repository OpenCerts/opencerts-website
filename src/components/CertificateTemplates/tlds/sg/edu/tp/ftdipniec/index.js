import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";

import TPCert from "./certificate";
import TPTranscript from "./transcript";
import ApprovedAddresses from "../common/approvedAddresses";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: TPCert
  },
  {
    id: "transcript",
    label: "Transcript",
    template: TPTranscript
  }
];

const ftdipniec = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={ApprovedAddresses}
  />
);

export default ftdipniec;
