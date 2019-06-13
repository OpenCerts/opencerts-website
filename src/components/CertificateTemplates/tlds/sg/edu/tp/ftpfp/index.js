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
    label: "Statement of Examination Results",
    template: TPTranscript
  }
];

const ftpfp = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={ApprovedAddresses}
  />
);

export default ftpfp;
