import React, { Component } from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";
import css from "./sharing.scss";

class CertificateShareLinkForm extends Component {
  render() {
    const certificateLink =
      this.props.shareLink &&
      `https://opencerts.io/view/${this.props.shareLink.id}#${
        this.props.shareLink.key
      }`;
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
            <div className="row my-4 d-flex justify-content-center">
              <input
                className="w-100"
                value={certificateLink}
                placeholder="Certificate link"
                disabled
              />
            </div>
            <div className="row d-flex justify-content-center m-3">
              <QRCode value={certificateLink} />
            </div>
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

CertificateShareLinkForm.propTypes = {
  shareLink: PropTypes.object,
  handleShareLinkToggle: PropTypes.func
};

export default CertificateShareLinkForm;
