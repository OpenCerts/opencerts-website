import dynamic from "next/dynamic";
import Link from "next/link";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { updateObfuscatedCertificate as updateObfuscatedCertificateAction } from "../reducers/certificate";
import CertificateShareLinkForm from "./CertificateShareLink/CertificateShareLinkForm";
import CertificateVerifyBlock from "./CertificateVerifyBlock";
import ErrorBoundary from "./ErrorBoundary";
import { FeatureFlagContainer } from "./FeatureFlag";
import Modal from "./Modal";
import styles from "./certificateViewer.scss";

const CertificateSharingForm = dynamic(import("./CertificateSharing/CertificateSharingForm"));

const DecentralisedRenderer = dynamic(() => import("./DecentralisedTemplateRenderer/DecentralisedRenderer"), {
  ssr: false,
});

// https://github.com/zeit/next.js/issues/4957#issuecomment-413841689
// eslint-disable-next-line react/display-name
const ForwardedRefDecentralisedRenderer = React.forwardRef((props, ref) => (
  <DecentralisedRenderer {...props} forwardedRef={ref} />
));

const renderVerifyBlock = (props) => <CertificateVerifyBlock verificationStatus={props.verificationStatus} />;

const renderHeaderBlock = (props, childRef) => {
  const renderedVerifyBlock = renderVerifyBlock(props);
  return (
    <div className={`container-fluid ${styles["pd-0"]} ${styles.container}`}>
      <div className="row">
        <div>{renderedVerifyBlock}</div>
        <div className={`row flex-nowrap`}>
          <div className="">
            <div
              id="btn-print"
              className={styles["print-btn"]}
              onClick={() => {
                childRef.current.print();
              }}
            >
              <i className="fas fa-print" style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
          <FeatureFlagContainer
            name="SHARE_LINK"
            render={() => (
              <div className="ml-2" onClick={() => props.handleShareLinkToggle()}>
                <div id="btn-link" className={styles["send-btn"]}>
                  <i className="fas fa-link" style={{ fontSize: "1.5rem" }} />
                </div>
              </div>
            )}
          />
          <div className="ml-2" onClick={() => props.handleSharingToggle()}>
            <div id="btn-email" className={styles["send-btn"]}>
              <i className="fas fa-envelope" style={{ fontSize: "1.5rem" }} />
            </div>
          </div>
          <div className="ml-2">
            <a
              download={`${props.certificate.id}.opencert`}
              target="_black"
              href={`data:text/plain;,${JSON.stringify(props.document, null, 2)}`}
            >
              <button id="btn-download" className={styles["send-btn"]} title="Download">
                <i className="fas fa-file-download" style={{ fontSize: "1.5rem" }} />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CertificateViewer = (props) => {
  const { document } = props;
  const childRef = React.useRef();

  const registryFragmentName = "OpencertsRegistryVerifier";
  const registryFragment = props.verificationStatus.find((status) => status.name === registryFragmentName);
  const renderedHeaderBlock = renderHeaderBlock(props, childRef);
  const isInRegistry = registryFragment && registryFragment.status === "VALID";

  return (
    <ErrorBoundary>
      {
        <div>
          {isInRegistry ? (
            <div
              id="status-banner-container"
              className={`${styles["status-banner-container"]} ${styles.valid} exact-print`}
            >
              <div className={`${styles["status-banner"]}`}>
                Certificate issuer is in the SkillsFuture Singapore registry for Opencerts
              </div>
            </div>
          ) : (
            <div id="status-banner-container" className={`${styles["status-banner-container"]} ${styles.invalid}`}>
              <div className={`${styles["status-banner"]}`}>
                Certificate issuer is <b>not</b> in the SkillsFuture Singapore registry for Opencerts
                <br />
                <Link href="/faq#verifications-issuers-not-in-registry-meaning">
                  <a>
                    <small>What does this mean ?</small>
                  </a>
                </Link>
              </div>
            </div>
          )}
          <div id={styles["top-header-ui"]}>
            <div className={styles["header-container"]}>{renderedHeaderBlock}</div>
          </div>
          <ForwardedRefDecentralisedRenderer
            updateObfuscatedCertificate={props.updateObfuscatedCertificate}
            rawDocument={document}
            ref={childRef}
          />
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
              copiedLink={props.copiedLink}
              handleShareLinkToggle={props.handleShareLinkToggle}
              handleCopyLink={props.handleCopyLink}
            />
          </Modal>
        </div>
      }{" "}
    </ErrorBoundary>
  );
};

export const CertificateViewerContainer = connect(null, (dispatch) => ({
  updateObfuscatedCertificate: (updatedDoc) => dispatch(updateObfuscatedCertificateAction(updatedDoc)),
}))(CertificateViewer);

CertificateViewer.propTypes = {
  document: PropTypes.object,
  certificate: PropTypes.object,
  verifying: PropTypes.bool,
  shareLink: PropTypes.object,

  verificationStatus: PropTypes.array,
  showSharing: PropTypes.bool,
  showShareLink: PropTypes.bool,
  emailSendingState: PropTypes.string,
  handleSharingToggle: PropTypes.func,
  handleSendCertificate: PropTypes.func,
  handleShareLinkToggle: PropTypes.func,
};

renderVerifyBlock.propTypes = CertificateViewer.propTypes;
renderHeaderBlock.propTypes = CertificateViewer.propTypes;
