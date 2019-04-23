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

const SOASV001 = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={approvedAddresses}
  />
);

SOASV001.displayName = "SOASV001 Template";
SOASV001.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default SOASV001;
