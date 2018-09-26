import PropTypes from "prop-types";
import { get } from "lodash";
import CertificateVerifyBlock from "./CertificateVerifyBlock";
import MultiCertificateRenderer from "./MultiCertificateRenderer";
import templateRegistry from "./CertificateTemplates";
import InvalidCertificateNotice from "./InvalidCertificateNotice";

const getCertificateTemplates = certificate => {
  const templateSet = get(certificate, "$template", "default");
  return templateRegistry[templateSet]
    ? templateRegistry[templateSet]
    : templateRegistry.default;
};

const renderVerifyBlock = props => (
  <CertificateVerifyBlock
    verifyTriggered={props.verifyTriggered}
    verifying={props.verifying}
    hashStatus={props.hashStatus}
    issuedStatus={props.issuedStatus}
    notRevokedStatus={props.notRevokedStatus}
    issuerIdentityStatus={props.issuerIdentityStatus}
  />
);

const renderIdentitiesBlock = certificate => {
  const issuers = get(certificate, "issuers", []);
  const issuerName = issuers.map(i => i.name).join(", ");
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
    <div className="container-fluid">
      <div className="row">
        <div>
          {renderedVerifyBlock}
          {renderedIdentitiesBlock}
        </div>

        <div className="ml-auto">
          <i
            className="fas fa-print fa-2x text-dark pointer"
            onClick={() => window.print()}
          />
        </div>
      </div>
    </div>
  );
};

const renderCertificateChange = handleCertificateChange => (
  <a href="/" onClick={() => handleCertificateChange(null)}>
    ← Upload another
  </a>
);

const storeCanRenderTemplate = ({ addresses, certificate }) => {
  if (!addresses || addresses === []) {
    return true;
  }
  const issuers = get(certificate, "issuers", []);
  const validStoreAddressForTemplate = addresses.map(a => a.toLowerCase());
  return issuers.reduce((prev, curr) => {
    const storeAddress = get(curr, "certificateStore", "").toLowerCase();
    const foundInWhitelist = validStoreAddressForTemplate.includes(
      storeAddress
    );
    return prev && foundInWhitelist;
  }, true);
};

const CertificateViewer = props => {
  const { certificate } = props;

  const { templates, addresses } = getCertificateTemplates(certificate);
  const allowedToRender = storeCanRenderTemplate({ addresses, certificate });

  const renderedHeaderBlock = renderHeaderBlock(props);
  const renderedCertificateChange = renderCertificateChange(
    props.handleCertificateChange
  );

  const validCertificateContent = (
    <div>
      {renderedHeaderBlock}
      <MultiCertificateRenderer
        certificate={certificate}
        templates={templates}
      />
    </div>
  );

  return (
    <div className="bg-light p-3 fill">
      {allowedToRender ? validCertificateContent : <InvalidCertificateNotice />}
      {renderedCertificateChange}
    </div>
  );
};

CertificateViewer.propTypes = {
  handleCertificateChange: PropTypes.func,
  certificate: PropTypes.object,
  verifying: PropTypes.bool,

  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object
};

renderVerifyBlock.propTypes = CertificateViewer.propTypes;
renderHeaderBlock.propTypes = CertificateViewer.propTypes;

export default CertificateViewer;
