import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import NPCert from "./certificate";
import NPTranscript from "../common/transcript";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: NPCert
  },
  {
    id: "transcript",
    label: "Transcript",
    template: NPTranscript
  }
];

const NPAA2018MAIN = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={approvedAddresses}
  />
);

NPAA2018MAIN.displayName = "NP-AA2018-MAIN Template";
NPAA2018MAIN.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default NPAA2018MAIN;
