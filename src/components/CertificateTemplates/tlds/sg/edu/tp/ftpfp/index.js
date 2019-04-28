import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";

import TPCert from "./certificate";
import TPTranscript from "./transcript";
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

const ftpfp = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={ApprovedAddresses}
  />
);

ftpfp.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default ftpfp;
