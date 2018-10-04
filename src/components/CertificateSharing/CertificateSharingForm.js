import React, { Component } from "react";
import PropTypes from "prop-types";
import ReCAPTCHA from "react-google-recaptcha";

const CLIENT_KEY = "6LfiL3EUAAAAAHrfLvl2KhRAcXpanNXDqu6M0CCS";

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
    const { handleSendCertificate } = this.props;
    handleSendCertificate({
      email: this.state.email,
      captcha: this.state.captcha
    });
  }

  render() {
    return (
      <div>
        <input
          value={this.state.emailAddress}
          onChange={this.handleEmailChange}
        />
        <button onClick={this.handleSend}>Send</button>
        <ReCAPTCHA sitekey={CLIENT_KEY} onChange={this.handleCaptchaChange} />
      </div>
    );
  }
}

CertificateSharingForm.propTypes = {
  handleSendCertificate: PropTypes.func
};

export default CertificateSharingForm;
