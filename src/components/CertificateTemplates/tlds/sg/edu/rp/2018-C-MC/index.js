import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import RPCert from "./certificate";
import RPTranscript from "../common/transcript";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: RPCert
  },
  {
    id: "transcript",
    label: "Transcript",
    template: RPTranscript
  }
];

const RPAA2018CDPLUS = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={approvedAddresses}
  />
);

RPAA2018CDPLUS.displayName = "2018-C-DPLUS Template";
RPAA2018CDPLUS.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default RPAA2018CDPLUS;
