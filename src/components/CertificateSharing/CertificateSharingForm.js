import React, { Component } from "react";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_CLIENT_KEY } from "../../config";
import css from "./sharing.scss";
import { states } from "../../reducers/certificate";

class CertificateSharingForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      captcha: "",
      email: ""
    };

    this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleCaptchaChange(value) {
    this.setState({ captcha: value });
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleSend() {
    const { handleSendCertificate, emailSendingState } = this.props;
    if (emailSendingState !== states.PENDING) {
      handleSendCertificate({
        email: this.state.email,
        captcha: this.state.captcha
      });
    }
  }

  render() {
    const { emailSendingState } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-2" />
          <div className="col-8">
            <div className="row d-flex justify-content-center">
              <h4>Send your certificate</h4>
            </div>
            <div className="row text-center">
              This sends an email with your .opencert attached, and instructions
              on how to view it.
            </div>
            <div className="row my-4 d-flex justify-content-center">
              <input
                className="w-100"
                value={this.state.emailAddress}
                onChange={this.handleEmailChange}
                placeholder="Enter recipient's email"
              />
            </div>
            <div className="row d-flex justify-content-center m-3">
              <ReCAPTCHA
                sitekey={CAPTCHA_CLIENT_KEY}
                onChange={this.handleCaptchaChange}
              />
            </div>
            {emailSendingState === states.SUCCESS ? (
              <div className="row my-4 d-flex justify-content-center">
                Email successfully sent!
              </div>
            ) : (
              ""
            )}
            {emailSendingState === states.FAILURE ? (
              <div className="row my-4 d-flex justify-content-center">
                An error occured, please check your email and captcha
              </div>
            ) : (
              ""
            )}
            <div className="row d-flex justify-content-center m-3">
              <button
                type="button"
                className={`pointer ${css.btn}`}
                onClick={this.handleSend}
              >
                Send
                {emailSendingState === states.PENDING ? (
                  <i className="ml-2 fas fa-spinner fa-pulse" />
                ) : (
                  ""
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CertificateSharingForm.propTypes = {
  emailSendingState: PropTypes.string,
  handleSendCertificate: PropTypes.func,
  handleSharingToggle: PropTypes.func
};

export default CertificateSharingForm;
