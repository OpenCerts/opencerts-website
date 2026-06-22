import React, { ChangeEvent, Component, ReactNode } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_CLIENT_KEY } from "../../config";
import { states } from "../../reducers/shared";

// Simple, permissive email format check: something@something.tld
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email: string): boolean => EMAIL_REGEX.test(email);

interface CertificateSharingFormProps {
  emailSendingState: string;
  emailSendingError?: string | null;
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
    // value is null when the captcha expires or is reset; clearing it keeps the
    // Send button disabled until the user solves a fresh challenge.
    this.setState({ captcha: value ?? "" });
  }

  handleEmailChange(event: ChangeEvent<HTMLInputElement>): void {
    this.setState({ email: event.target.value });
  }

  handleSend(): void {
    const { handleSendCertificate, emailSendingState } = this.props;
    if (!this.canSend(emailSendingState)) return;
    handleSendCertificate({
      email: this.state.email,
      captcha: this.state.captcha,
    });
  }

  canSend(emailSendingState: string): boolean {
    return emailSendingState !== states.PENDING && isValidEmail(this.state.email) && this.state.captcha !== "";
  }

  render(): ReactNode {
    const { emailSendingState, emailSendingError } = this.props;
    const { email } = this.state;

    // Once the request resolves, the Send button is replaced by the outcome message.
    const isResolved = emailSendingState === states.SUCCESS || emailSendingState === states.FAILURE;
    const showEmailError = email.length > 0 && !isValidEmail(email);

    return (
      <div className="text-center">
        <h3 className="mb-2">Send your certificate</h3>
        <p>This sends an email with your .opencert attached, and instructions on how to view it.</p>
        <input
          className="border p-2 w-64"
          value={email}
          onChange={this.handleEmailChange}
          placeholder="Enter recipient's email"
        />
        {showEmailError && <div className="my-2 text-red">Please enter a valid email address</div>}
        <div className="flex justify-center w-full my-4">
          <ReCAPTCHA sitekey={CAPTCHA_CLIENT_KEY} onChange={this.handleCaptchaChange} />
        </div>
        {emailSendingState === states.SUCCESS && <div className="my-4 text-green">Email successfully sent!</div>}
        {emailSendingState === states.FAILURE && (
          <div className="my-4 text-red">
            {emailSendingError || "An error occured, please check your email and captcha"}
          </div>
        )}
        {!isResolved && (
          <div className="mt-4">
            <button
              type="button"
              className="button bg-navy text-white hover:bg-navy-300 disabled:opacity-50"
              onClick={this.handleSend}
              disabled={!this.canSend(emailSendingState)}
            >
              Send
              {emailSendingState === states.PENDING && <i className="ml-2 fas fa-spinner fa-pulse" />}
            </button>
          </div>
        )}
      </div>
    );
  }
}
// looks needed for dynamic import
// eslint-disable-next-line import/no-default-export
export default CertificateSharingForm;
