import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { QRCode } from "react-qr-svg";
import css from "./sharing.scss";
import { getShareLinkState } from "../../reducers/certificate";

class CertificateShareLinkForm extends Component {
  render() {
    const {
      shareLink,
      shareLinkState,
      copiedLink,
      handleCopyLink,
      handleShareLinkToggle
    } = this.props;

    const certificateLink =
      shareLink &&
      `${window.location.origin}/?documentId=${shareLink.id}#${shareLink.key}`;
    return (
      <div className="container">
        <div className="col-12 justify-content-center">
          <div className="row d-flex justify-content-center">
            <h4>Share your certificate</h4>
          </div>

          {shareLinkState === "INITIAL" ? (
            <Loader />
          ) : (
            <>
              {shareLink.id && shareLink.key !== undefined ? (
                <div className="offset-1 col-10 offset-l-2 col-l-8">
                  <div className="row justify-content-center">
                    Share this certificate by copying the link below.
                    <small>
                      * Note: This link will automatically expire in{" "}
                      <b>14 days</b>.
                    </small>
                  </div>
                  <div className="row mt-4 d-flex justify-content-center">
                    <input
                      className="w-75"
                      value={certificateLink}
                      onClick={() => handleCopyLink(certificateLink)}
                      placeholder="Certificate link"
                      readOnly
                    />
                    <button
                      type="button"
                      className={`pointer ${css.copyBtn} w-25`}
                      onClick={() => handleCopyLink(certificateLink)}
                    >
                      Copy
                    </button>
                  </div>
                  {copiedLink && (
                    <div className="row justify-content-center">
                      <small className="text-green">
                        Successfully copied share link!
                      </small>
                    </div>
                  )}
                  <div className="row d-flex justify-content-center m-3 mt4">
                    <QRCode
                      level="H"
                      style={{ width: 180 }}
                      value={certificateLink}
                    />
                  </div>
                </div>
              ) : (
                <div
                  id="error-message"
                  className="row justify-content-center my-5 text-red"
                >
                  <i
                    id="verify-invalid"
                    className="fas fa-times-circle fa-2x"
                  />{" "}
                  <p className="align-middle ml-2 mt-1">
                    Could not generate sharing link.
                  </p>
                </div>
              )}
            </>
          )}
          <div className="row d-flex justify-content-center m-0">
            <button
              type="button"
              className={`pointer ${css.btn}`}
              onClick={handleShareLinkToggle}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const Loader = () => (
  <div className={css["renderer-loader"]}>
    <i className="fas fa-spinner fa-pulse fa-2x  mt8" />
    <div className="m-3">Generating Share Link ...</div>
  </div>
);

const mapStateToProps = store => ({
  shareLinkState: getShareLinkState(store)
});

export default connect(
  mapStateToProps,
  null
)(CertificateShareLinkForm);

CertificateShareLinkForm.propTypes = {
  copiedLink: PropTypes.bool,
  shareLink: PropTypes.object,
  shareLinkState: PropTypes.string,
  handleCopyLink: PropTypes.func,
  handleShareLinkToggle: PropTypes.func
};
