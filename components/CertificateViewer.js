import PropTypes from "prop-types";
import { get } from "lodash";
import { certificateData } from "@govtechsg/open-certificate";
import certificateIndex from "../certificateTemplates";

const renderCertificate = certificate => {
  const renderingTemplateName = get(
    certificateData(certificate),
    "template",
    "default"
  );
  const template = certificateIndex[renderingTemplateName];
  return <div dangerouslySetInnerHTML={{ __html: template(certificate) }} />;
};

const CertificateViewer = ({ certificate, verify }) => {
  // dangerouslySetInnerHTML is okay because Handlebar mitigates script injection
  const certObject = certificateData(certificate);
  const renderedCertificate = renderCertificate(certObject);
  return (
    <div>
      {verify}
      {renderedCertificate}
    </div>
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
