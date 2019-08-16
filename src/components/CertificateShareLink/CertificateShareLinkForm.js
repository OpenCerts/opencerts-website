import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import css from "./sharing.scss";
import { URL } from "../../config";
import { getShareLinkState } from "../../reducers/certificate";

class CertificateShareLinkForm extends Component {
  render() {
    const {
      shareLink,
      shareLinkState,
      copiedLink,
      handleCopyLink
    } = this.props;
    const certificateLink =
      shareLink && `${URL}/?documentId=${shareLink.id}#${shareLink.key}`;
    return (
      <div className="container">
        <div className="row">
          <div className="col-2" />
          <div className="col-8">
            <div className="row d-flex justify-content-center">
              <h4>Share your certificate</h4>
            </div>
            <div className="row text-center">
              Share this certificate by copying the link below.
              <small>
                * Note: This link can only be used once and it will be
                regenerated.
              </small>
            </div>
            {shareLinkState === "INITIAL" ? (
              <Loader />
            ) : (
              <>
                <div className="row my-4 d-flex justify-content-center">
                  <input
                    className="w-75"
                    value={certificateLink}
                    placeholder="Certificate link"
                    disabled
                  />
                  <button
                    type="button"
                    className={`pointer ${css.copyBtn} 2-25`}
                    onClick={() => handleCopyLink(certificateLink)}
                  >
                    Copy
                  </button>

                  {copiedLink && (
                    <small className="text-green">
                      Successfully copied Share Link!
                    </small>
                  )}
                </div>
                <div className="row d-flex justify-content-center m-3">
                  <QRCode value={certificateLink} />
                </div>
              </>
            )}
            <div className="row d-flex justify-content-center m-3">
              <button
                type="button"
                className={`pointer ${css.btn}`}
                onClick={this.props.handleShareLinkToggle}
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
  handleCopyLink: PropTypes.func,
  shareLink: PropTypes.object,
  shareLinkState: PropTypes.string,
  handleShareLinkToggle: PropTypes.func
};
