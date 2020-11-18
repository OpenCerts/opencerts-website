import React, { ChangeEvent, Component, ReactNode } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_CLIENT_KEY } from "../../config";
import { states } from "../../reducers/shared";
interface CertificateSharingFormProps {
  emailSendingState: string;
  handleSendCertificate: (event: { captcha: string; email: string }) => void;
  handleSharingToggle: () => void;
}
interface CertificateSharingFormState {
  captcha: string;
  email: string;
}
class CertificateSharingForm extends Component<CertificateSharingFormProps, CertificateSharingFormState> {
  constructor(props: CertificateSharingFormProps) {
    super(props);

    this.state = {
      captcha: "",
      email: "",
    };

    this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleCaptchaChange(value: string | null): void {
    if (value) this.setState({ captcha: value });
  }

  handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ email: event.target.value });
  }

  handleSend(): void {
    const { handleSendCertificate, emailSendingState } = this.props;
    if (emailSendingState !== states.PENDING) {
      handleSendCertificate({
        email: this.state.email,
        captcha: this.state.captcha,
      });
    }
  }

  render(): ReactNode {
    const { emailSendingState } = this.props;
    return (
      <div className="text-center">
        <h3 className="mb-2">Send your certificate</h3>
        <p>This sends an email with your .opencert attached, and instructions on how to view it.</p>
        <input
          className="border p-2 w-64"
          value={this.state.email}
          onChange={this.handleEmailChange}
          placeholder="Enter recipient's email"
        />
        <div className="flex justify-center w-full my-4">
          <ReCAPTCHA sitekey={CAPTCHA_CLIENT_KEY} onChange={this.handleCaptchaChange} />
        </div>
        {emailSendingState === states.SUCCESS && <div className="my-4">Email successfully sent!</div>}
        {emailSendingState === states.FAILURE && (
          <div className="my-4">An error occured, please check your email and captcha</div>
        )}
        <div className="mt-4">
          <button type="button" className="button bg-navy text-white hover:bg-navy-300" onClick={this.handleSend}>
            Send
            {emailSendingState === states.PENDING && <i className="ml-2 fas fa-spinner fa-pulse" />}
          </button>
        </div>
      </div>
    );
  }
}
// looks needed for dynamic import
// eslint-disable-next-line import/no-default-export
export default CertificateSharingForm;
