import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";

import TPCert from "../common/certificate";
import TPTranscript from "../common/transcript";
import ApprovedAddresses from "../common";

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

const ftdip = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={ApprovedAddresses}
  />
);

ftdip.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default ftdip;
