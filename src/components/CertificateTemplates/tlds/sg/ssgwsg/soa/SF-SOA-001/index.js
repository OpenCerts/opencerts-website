import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import SSGCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: SSGCert
  }
];

const SFSOA001 = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={approvedAddresses}
  />
);

SFSOA001.displayName = "SFSOA001 Template";
SFSOA001.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default SFSOA001;
