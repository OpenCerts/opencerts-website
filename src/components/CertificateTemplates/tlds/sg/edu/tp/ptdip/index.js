import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";

import TPCert from "../common/certificate";
import PartTimeTranscript from "../common/partTimeTranscript";
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
    template: PartTimeTranscript
  }
];

const ptdip = props => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={ApprovedAddresses}
    {...props}
  />
);

export default ptdip;
