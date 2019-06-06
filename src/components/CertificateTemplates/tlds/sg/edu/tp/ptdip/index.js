import PropTypes from "prop-types";
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

const ptdip = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={ApprovedAddresses}
  />
);

ptdip.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default ptdip;
