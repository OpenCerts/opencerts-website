import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
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

const RPAA2018PMAIN = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

RPAA2018PMAIN.displayName = "2018-P-MAIN Template";
RPAA2018PMAIN.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default RPAA2018PMAIN;
