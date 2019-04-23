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

const NPAA2019OPTNIEC = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={approvedAddresses}
  />
);

NPAA2019OPTNIEC.displayName = "NP-AA2019-OPT-NIEC Template";
NPAA2019OPTNIEC.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default NPAA2019OPTNIEC;
