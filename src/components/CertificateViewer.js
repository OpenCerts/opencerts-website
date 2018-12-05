import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { get } from "lodash";
import CertificateVerifyBlock from "./CertificateVerifyBlock";
import { MultiCertificateRendererContainer } from "./MultiCertificateRenderer";
import templateRegistry from "./CertificateTemplates";
import InvalidCertificateNotice from "./InvalidCertificateNotice";
import styles from "./certificateViewer.scss";
import Modal from "./Modal";
import images from "./ViewerPageImages";

const CertificateSharingForm = dynamic(
  import("./CertificateSharing/CertificateSharingForm")
);

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
    toggleDetailedView={props.toggleDetailedView}
    detailedVerifyVisible={props.detailedVerifyVisible}
  />
);

// const renderIdentitiesBlock = certificate => {
//   const issuers = get(certificate, "issuers", []);
//   const issuerName = issuers.map(i => i.name).join(", ");
//   const recipientName = get(certificate, "recipient.name");
//   return issuerName || recipientName ? (
//     <div className="mt-2">
//       {issuerName ? (
//         <div className="text-muted">Issued by {issuerName}</div>
//       ) : null}
//       {recipientName ? (
//         <div className="text-muted">Issued to {recipientName}</div>
//       ) : null}
//     </div>
//   ) : null;
// };

const renderHeaderBlock = props => {
  // const renderedIdentitiesBlock = renderIdentitiesBlock(props.certificate);
  const renderedVerifyBlock = renderVerifyBlock(props);
  return (
    <div className="container-fluid">
      <div className="row">
        <div>
          {renderedVerifyBlock}
          {/* {renderedIdentitiesBlock} */}
        </div>

        <div className="ml-auto">
          <button
            className={styles["print-btn"]}
            onClick={() => window.print()}
          >
            {images.print()}
          </button>
        </div>
        <div />
        <div className="ml-2" onClick={() => props.handleSharingToggle()}>
          <button className={styles["send-btn"]}>{images.send()}</button>
        </div>
      </div>
    </div>
  );
};

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

  const validCertificateContent = (
    <div>
      <div id={styles["top-header-ui"]}>
        <div className={styles["header-container"]}>{renderedHeaderBlock}</div>
      </div>
      <div>
        <MultiCertificateRendererContainer
          certificate={certificate}
          templates={templates}
        />
      </div>
      <Modal show={props.showSharing} toggle={props.handleSharingToggle}>
        <CertificateSharingForm
          emailSendingState={props.emailSendingState}
          handleSendCertificate={props.handleSendCertificate}
          handleSharingToggle={props.handleSharingToggle}
        />
      </Modal>
    </div>
  );

  return (
    <div>
      {allowedToRender ? validCertificateContent : <InvalidCertificateNotice />}
    </div>
  );
};

CertificateViewer.propTypes = {
  handleCertificateChange: PropTypes.func,
  toggleDetailedView: PropTypes.func,
  detailedVerifyVisible: PropTypes.bool,
  certificate: PropTypes.object,
  verifying: PropTypes.bool,

  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object,
  showSharing: PropTypes.bool,
  emailSendingState: PropTypes.string,
  handleSharingToggle: PropTypes.func,
  handleSendCertificate: PropTypes.func
};

renderVerifyBlock.propTypes = CertificateViewer.propTypes;
renderHeaderBlock.propTypes = CertificateViewer.propTypes;

export default CertificateViewer;
