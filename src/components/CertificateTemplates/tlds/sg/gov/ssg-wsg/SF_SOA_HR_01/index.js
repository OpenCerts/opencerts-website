import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import SSGCert from "../common/certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: SSGCert({})
  }
];

const SFSOAHR01 = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

SFSOAHR01.displayName = "SFSOAHR01 Template";
SFSOAHR01.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default SFSOAHR01;
