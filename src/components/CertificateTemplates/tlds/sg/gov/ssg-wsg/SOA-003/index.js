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

const SOA003 = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={approvedAddresses}
  />
);

SOA003.displayName = "SOA003 Template";
SOA003.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default SOA003;
