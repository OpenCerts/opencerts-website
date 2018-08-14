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

const renderVerifyBlock = props => (
  <CertificateVerifyBlock
    certificateStore={props.certificateStore}
    handleCertificateVerify={props.handleCertificateVerify}
    verifyTriggered={props.verifyTriggered}
    verifying={props.verifying}
    hashStatus={props.hashStatus}
    issuedStatus={props.issuedStatus}
    notRevokedStatus={props.notRevokedStatus}
    issuerIdentityStatus={props.issuerIdentityStatus}
  />
);

const renderCertificateChange = handleCertificateChange => (
  <a href="#" onClick={() => handleCertificateChange(null)}>
    ← Upload another
  </a>
);

const CertificateViewer = props => {
  const { certificate } = props;
  const certObject = certificateData(certificate);

  const renderedCertificate = renderCertificate(certObject);
  const renderedVerifyBlock = renderVerifyBlock(props);
  const renderedCertificateChange = renderCertificateChange(
    props.handleCertificateChange
  );

  return (
    <div>
      {renderedVerifyBlock}
      {renderedCertificate}
      {renderedCertificateChange}
    </div>
  );
};

CertificateViewer.propTypes = {
  handleCertificateVerify: PropTypes.func,
  handleCertificateChange: PropTypes.func,
  certificate: PropTypes.object,
  certificateStore: PropTypes.object,
  verifying: PropTypes.bool,

  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object
};

renderVerifyBlock.propTypes = CertificateViewer.propTypes;

export default CertificateViewer;
