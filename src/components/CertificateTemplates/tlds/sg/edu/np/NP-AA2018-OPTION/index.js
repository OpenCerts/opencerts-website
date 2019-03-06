import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import NPCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: NPCert
  }
];

const NPAA2018OPTION = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={approvedAddresses}
  />
);

NPAA2018OPTION.displayName = "NP-AA2018-OPTION Template";
NPAA2018OPTION.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default NPAA2018OPTION;
