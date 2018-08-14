import PropTypes from "prop-types";
import { get } from "lodash";
import certificateIndex from "../certificateTemplates";
import CertificateVerifyBlock from "./CertificateVerifyBlock";

const renderCertificate = certificate => {
  const renderingTemplateName = get(certificate, "template", "default");
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

const renderIdentitiesBlock = certificate => {
  const issuerName = get(certificate, "issuer.name");
  const recipientName = get(certificate, "recipient.name");
  return issuerName || recipientName ? (
    <div className="mt-2">
      {issuerName ? (
        <div className="text-muted">Issued by {issuerName}</div>
      ) : null}
      {recipientName ? (
        <div className="text-muted">Issued to {recipientName}</div>
      ) : null}
    </div>
  ) : null;
};

const renderHeaderBlock = props => {
  const renderedIdentitiesBlock = renderIdentitiesBlock(props.certificate);
  const renderedVerifyBlock = renderVerifyBlock(props);
  return (
    <div className="container-fluid bg-light">
      <div className="row p-3">
        <div>
          {renderedVerifyBlock}
          {renderedIdentitiesBlock}
        </div>

        <div className="ml-auto">
          <i className="fas fa-print fa-2x text-dark" />
        </div>
      </div>
    </div>
  );
};

const renderCertificateChange = handleCertificateChange => (
  <a href="#" onClick={() => handleCertificateChange(null)}>
    ← Upload another
  </a>
);

const CertificateViewer = props => {
  const { certificate } = props;

  const renderedHeaderBlock = renderHeaderBlock(props);
  const renderedCertificate = renderCertificate(certificate);
  const renderedCertificateChange = renderCertificateChange(
    props.handleCertificateChange
  );

  return (
    <div>
      {renderedHeaderBlock}
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
renderHeaderBlock.propTypes = CertificateViewer.propTypes;

export default CertificateViewer;
