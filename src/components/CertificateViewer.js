import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { get } from "lodash";
import CertificateVerifyBlock from "./CertificateVerifyBlock";
import styles from "./certificateViewer.scss";
import Modal from "./Modal";
import images from "./ViewerPageImages";

import { getLogger } from "../utils/logger";
import templates from "./CertificateTemplates";

const { trace } = getLogger("components:CertificateViewer");

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
            id="btn-print"
            className={styles["print-btn"]}
            onClick={() => window.print()}
          >
            {images.print()}
          </button>
        </div>
        <div />
        <div className="ml-2" onClick={() => props.handleSharingToggle()}>
          <button id="btn-email" className={styles["send-btn"]}>
            {images.send()}
          </button>
        </div>
        <div className="ml-2">
          <a
            download={`${props.certificate.id}.opencert`}
            target="_black"
            href={`data:text/plain;,${JSON.stringify(props.document, null, 2)}`}
          >
            <button id="btn-download" className={styles["send-btn"]}>
              <i
                className="fas fa-file-download"
                style={{ fontSize: "1.5rem", color: "#343a40" }}
              />
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

const CertificateViewer = props => {
  const { certificate, handleObfuscation } = props;

  const renderedHeaderBlock = renderHeaderBlock(props);
  const selectedTemplateName = get(certificate, "$template", "default");
  const SelectedTemplate = templates[selectedTemplateName] || templates.default;

  trace(`Templates Mapping: %o`, templates);
  trace(`Selected template: ${selectedTemplateName}`);
  trace(`Certificate content: %o`, certificate);

  const validCertificateContent = (
    <div>
      <div id={styles["top-header-ui"]}>
        <div className={styles["header-container"]}>{renderedHeaderBlock}</div>
      </div>
      <SelectedTemplate
        certificate={certificate}
        handleObfuscation={handleObfuscation}
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
  handleObfuscation: PropTypes.func,
  toggleDetailedView: PropTypes.func,
  detailedVerifyVisible: PropTypes.bool,
  document: PropTypes.object,
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
