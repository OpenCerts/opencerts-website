import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";
import { approvedAddresses } from "../common";
import SSGCert from "./certificate";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: SSGCert({})
  }
];

const SFSOAES001 = () => (
  <MultiCertificateRenderer
    templates={templates}
    whitelist={approvedAddresses}
  />
);

SFSOAES001.displayName = "SFSOAES001 Template";
SFSOAES001.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default SFSOAES001;
