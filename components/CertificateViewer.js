import PropTypes from "prop-types";
import { get } from "lodash";
import { certificateData } from "@govtechsg/open-certificate";
import certificateIndex from "../certificateTemplates";
import CertificateVerifyBlock from "./CertificateVerifyBlock";

const renderCertificate = certificate => {
  const renderingTemplateName = get(
    certificateData(certificate),
    "template",
    "default"
  );
  const template = certificateIndex[renderingTemplateName];
  // dangerouslySetInnerHTML is okay because Handlebar mitigates script injection
  return <div dangerouslySetInnerHTML={{ __html: template(certificate) }} />;
};

const renderVerifyBlock = props => <CertificateVerifyBlock {...props} />;

const CertificateViewer = props => {
  const { certificate } = props;
  const certObject = certificateData(certificate);
  const renderedCertificate = renderCertificate(certObject);
  const renderedVerifyBlock = renderVerifyBlock(props);

  return (
    <div>
      {renderedVerifyBlock}
      {renderedCertificate}
    </div>
  );
};

CertificateViewer.propTypes = {
  certificate: PropTypes.object
};

export default CertificateViewer;
