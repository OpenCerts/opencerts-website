import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { getData } from "@govtechsg/open-attestation";
import CertificateVerifyBlock from "./CertificateVerifyBlock";
import styles from "./certificateViewer.scss";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import DecentralisedRenderer from "./DecentralisedTemplateRenderer/DecentralisedRenderer";
import MultiTabs from "./MultiTabs";
import { selectTemplateTab as selectTemplateTabAction } from "../reducers/certificate";
import { LEGACY_OPENCERTS_RENDERER } from "../config";
import CertificateShareLinkForm from "./CertificateShareLink/CertificateShareLinkForm";

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

const LoadingIframe = () => (
  <div id={styles["renderer-loader"]} className="text-blue">
    <i className="fas fa-spinner fa-pulse fa-3x" />
    <div className="m-3" style={{ fontSize: "1.5rem" }}>
      Loading Renderer...
    </div>
  </div>
);

const renderHeaderBlock = props => {
  const renderedVerifyBlock = renderVerifyBlock(props);
  return (
    <div className={`container-fluid ${styles["pd-0"]}`}>
      <div className="row">
        <div className="col-sm-7 col-md-8 col-xs-12">{renderedVerifyBlock}</div>
        <div className={`row col-sm-5 col-md-4 col-xs-12 ${styles["pd-0"]}`}>
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
          <div className="ml-2" onClick={() => props.handleShareLinkToggle()}>
            <div id="btn-link" className={styles["send-btn"]}>
              <i className="fas fa-link" style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
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
  const { document, selectTemplateTab } = props;

  const certificate = getData(document);

  const renderedHeaderBlock = renderHeaderBlock(props);

  const validCertificateContent = (
    <div>
      <div id={styles["top-header-ui"]}>
        <div className={styles["header-container"]}>{renderedHeaderBlock}</div>
      </div>
      <MultiTabs selectTemplateTab={selectTemplateTab} />
      <div>
        <LoadingIframe />
        <DecentralisedRenderer
          certificate={document}
          source={`${
            typeof document.data.$template === "object"
              ? certificate.$template.url
              : LEGACY_OPENCERTS_RENDERER
          }`}
        />
      </div>
      <Modal show={props.showSharing} toggle={props.handleSharingToggle}>
        <CertificateSharingForm
          emailSendingState={props.emailSendingState}
          handleSendCertificate={props.handleSendCertificate}
          handleSharingToggle={props.handleSharingToggle}
        />
      </Modal>
      <Modal show={props.showShareLink} toggle={props.handleShareLinkToggle}>
        <CertificateShareLinkForm
          shareLink={props.shareLink}
          handleShareLinkToggle={props.handleShareLinkToggle}
        />
      </Modal>
    </div>
  );

  return <ErrorBoundary>{validCertificateContent} </ErrorBoundary>;
};

const mapDispatchToProps = dispatch => ({
  selectTemplateTab: tabIndex => dispatch(selectTemplateTabAction(tabIndex))
});

export default connect(
  null,
  mapDispatchToProps
)(CertificateViewer);

CertificateViewer.propTypes = {
  toggleDetailedView: PropTypes.func,
  detailedVerifyVisible: PropTypes.bool,
  document: PropTypes.object,
  certificate: PropTypes.object,
  verifying: PropTypes.bool,
  shareLink: PropTypes.object,

  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object,
  showSharing: PropTypes.bool,
  showShareLink: PropTypes.bool,
  emailSendingState: PropTypes.string,
  handleSharingToggle: PropTypes.func,
  handleSendCertificate: PropTypes.func,
  handleShareLinkToggle: PropTypes.func,

  selectTemplateTab: PropTypes.func
};

renderVerifyBlock.propTypes = CertificateViewer.propTypes;
renderHeaderBlock.propTypes = CertificateViewer.propTypes;
