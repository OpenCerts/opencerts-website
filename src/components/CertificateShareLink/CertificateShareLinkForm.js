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
      handleShareLinkToggle,
      generateShareLink
    } = this.props;

    const certificateLink =
      shareLink && `${window.location.origin}/${shareLink.id}#${shareLink.key}`;
    return (
      <div className="container">
        <div className="row">
          <div className="offset-2 col-8">
            <div className="row d-flex justify-content-center">
              <h4>Share your certificate</h4>
            </div>
            <div className="row justify-content-center">
              Share this certificate by copying the link below.
              <small>
                * Note: This link will automatically expire in <b>14 days</b>.
              </small>
            </div>
            {shareLinkState === "INITIAL" ? (
              <Loader />
            ) : (
              <>
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
                <div className="row d-flex justify-content-center m-3">
                  <button
                    type="button"
                    className={`pointer ${css.btn}`}
                    onClick={generateShareLink}
                  >
                    Regenerate Link
                  </button>
                </div>
              </>
            )}
            <div className="row d-flex justify-content-center m-3">
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
      </div>
    );
  }
}

const Loader = () => (
  <div className={css["renderer-loader"]}>
    <i className="fas fa-spinner fa-pulse fa-2x" />
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
  handleShareLinkToggle: PropTypes.func,
  generateShareLink: PropTypes.func
};
