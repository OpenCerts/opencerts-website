import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";

import TPCert from "../ptmc/certificate";
import TPStatementOfResults from "../ptmc_mod/statementOfResults";
import ApprovedAddresses from "../common/approvedAddresses";

const templates = [
  {
    id: "certificate",
    label: "Certificate",
    template: TPCert
  },
  {
    id: "transcript",
    label: "Statement of Results",
    template: TPStatementOfResults
  }
];


const ptpdcModularCourse = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={ApprovedAddresses}
  />
);

ptpdcModularCourse.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default ptpdcModularCourse;
