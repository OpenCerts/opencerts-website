import PropTypes from "prop-types";

const CertificateSharingForm = ({
  emailAddress,
  handleSendCertificate,
  handleEmailChange
}) => (
  <div>
    <input
      value={emailAddress}
      onChange={event => handleEmailChange(event.target.value)}
    />
    <button onClick={() => handleSendCertificate()}>Send</button>
  </div>
);

CertificateSharingForm.propTypes = {
  showSharing: PropTypes.bool,
  emailAddress: PropTypes.string,
  handleSendCertificate: PropTypes.func,
  handleEmailChange: PropTypes.func,
  handleSharingToggle: PropTypes.func
};

export default CertificateSharingForm;
