import PropTypes from "prop-types";
import { MultiCertificateRenderer } from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import SSGCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: SSGCert({})
  }
];

const SOAReprint = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={approvedAddresses}
  />
);

SOAReprint.displayName = "SOAReprint Template";
SOAReprint.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default SOAReprint;
