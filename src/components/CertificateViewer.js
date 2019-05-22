import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { get } from "lodash";
import CertificateVerifyBlock from "./CertificateVerifyBlock";
import styles from "./certificateViewer.scss";
import Modal from "./Modal";

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
    <div className={`container-fluid ${styles["pd-0"]}`}>
      <div className="row">
        <div className="col-sm-7 col-xs-12">{renderedVerifyBlock}</div>
        <div className={`row col-sm-5 col-xs-12 ${styles["pd-0"]}`}>
          <div className="ml-auto">
            <div
              id="btn-print"
              className={styles["print-btn"]}
              onClick={() => window.print()}
            >
              <i className="fas fa-print" style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
          <div />
          <div className="ml-2" onClick={() => props.handleSharingToggle()}>
            <div id="btn-email" className={styles["send-btn"]}>
              <i className="fas fa-envelope" style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
          <div className="ml-2">
            <a
              download={`${props.certificate.id}.opencert`}
              target="_black"
              href={`data:text/plain;,${JSON.stringify(
                props.document,
                null,
                2
              )}`}
            >
              <button
                id="btn-download"
                className={styles["send-btn"]}
                title="Download"
              >
                <i
                  className="fas fa-file-download"
                  style={{ fontSize: "1.5rem" }}
                />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const CertificateViewer = props => {
  const { certificate } = props;

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
      <SelectedTemplate />
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
