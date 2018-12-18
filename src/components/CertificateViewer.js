import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { get } from "lodash";
import CertificateVerifyBlock from "./CertificateVerifyBlock";
import styles from "./certificateViewer.scss";
import Modal from "./Modal";
import images from "./ViewerPageImages";

import { TemplateLoader } from "./CertificateTemplates";

const CertificateSharingForm = dynamic(
  import("./CertificateSharing/CertificateSharingForm")
);

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

const renderHeaderBlock = props => {
  const renderedVerifyBlock = renderVerifyBlock(props);
  return (
    <div className="container-fluid">
      <div className="row">
        <div>{renderedVerifyBlock}</div>

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

const CertificateViewer = props => {
  const { certificate } = props;

  const renderedHeaderBlock = renderHeaderBlock(props);

  const validCertificateContent = (
    <div>
      <div id={styles["top-header-ui"]}>
        <div className={styles["header-container"]}>{renderedHeaderBlock}</div>
      </div>
      <TemplateLoader
        templateName={get(certificate, "$template", "default")}
        certificate={certificate}
      />
      <Modal show={props.showSharing} toggle={props.handleSharingToggle}>
        <CertificateSharingForm
          emailSendingState={props.emailSendingState}
          handleSendCertificate={props.handleSendCertificate}
          handleSharingToggle={props.handleSharingToggle}
        />
      </Modal>
    </div>
  );

  return <div>{validCertificateContent} </div>;
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
