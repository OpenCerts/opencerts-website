import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";

import TPCert from "./certificate";
import ApprovedAddresses from "../common/approvedAddresses";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: TPCert
  }
];

const ptfsm = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={ApprovedAddresses}
  />
);

ptfsm.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default ptfsm;
