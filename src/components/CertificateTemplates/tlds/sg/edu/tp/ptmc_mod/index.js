import PropTypes from "prop-types";
import MultiCertificateRenderer from "template-utils/MultiCertificateRenderer";

import TPCert from "../ptmc/certificate";
import TPStatementOfResults from "./statementOfResults";
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

const ptmcModularCourse = ({ certificate }) => (
  <MultiCertificateRenderer
    certificate={certificate}
    templates={templates}
    whitelist={ApprovedAddresses}
  />
);

ptmcModularCourse.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default ptmcModularCourse;
