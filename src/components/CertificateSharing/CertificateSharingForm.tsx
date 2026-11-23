import React, { ChangeEvent, Component, ReactNode } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { CAPTCHA_CLIENT_KEY } from "../../config";
import { states } from "../../reducers/shared";
// Same rule as the email API, so the form never sends an address the backend will reject.
import { isValidRecipient } from "../../utils/email";

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
  private readonly recaptchaRef = React.createRef<ReCAPTCHA>();

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

  componentDidUpdate(prevProps: CertificateSharingFormProps): void {
    // A reCAPTCHA token is single-use and the backend has already spent this one, so a
    // failed send needs a freshly solved challenge before the user can try again.
    // Only act on the transition into FAILURE, so a later re-render doesn't wipe a new solve.
    if (prevProps.emailSendingState !== states.FAILURE && this.props.emailSendingState === states.FAILURE) {
      this.recaptchaRef.current?.reset();
      this.setState({ captcha: "" });
    }
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
    return emailSendingState !== states.PENDING && isValidRecipient(this.state.email) && this.state.captcha !== "";
  }

  render(): ReactNode {
    const { emailSendingState, emailSendingError } = this.props;
    const { email } = this.state;

    // A successful send replaces the Send button with the success message. After a failure the
    // button stays, disabled until the address is valid and a new captcha has been solved.
    const showSendButton = emailSendingState !== states.SUCCESS;
    const showEmailError = email.length > 0 && !isValidRecipient(email);

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
          <ReCAPTCHA ref={this.recaptchaRef} sitekey={CAPTCHA_CLIENT_KEY} onChange={this.handleCaptchaChange} />
        </div>
        {emailSendingState === states.SUCCESS && <div className="my-4 text-green">Email successfully sent!</div>}
        {emailSendingState === states.FAILURE && (
          <div className="my-4 text-red">
            {emailSendingError || "An error occured, please check your email and captcha"}
          </div>
        )}
        {showSendButton && (
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
