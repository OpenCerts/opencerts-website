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

const RPAA2018CDCJP = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

RPAA2018CDCJP.displayName = "2018-C-DCJP Template";
RPAA2018CDCJP.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default RPAA2018CDCJP;
