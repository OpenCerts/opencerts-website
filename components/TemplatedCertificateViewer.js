import PropTypes from "prop-types";
import { Certificate } from "@govtechsg/open-certificate";

const template = require("./template-test.handlebars");

const renderCertificate = certificate => ({ __html: template(certificate) });

const CertificateViewer = ({ certificate }) => {
  // dangerouslySetInnerHTML is okay because Handlebar mitigates script injection
  const certObject = new Certificate(certificate);
  const unsaltedCertificate = certObject.unsalt();
  return (
    <div dangerouslySetInnerHTML={renderCertificate(unsaltedCertificate)} />
  );
};

CertificateViewer.propTypes = {
  certificate: PropTypes.object,
  verify: PropTypes.object,
  editable: PropTypes.bool,
  toggleEditable: PropTypes.func,
  handleFilter: PropTypes.func
};

export default CertificateViewer;
