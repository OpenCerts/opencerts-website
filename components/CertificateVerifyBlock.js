import PropTypes from "prop-types";

const HASH_VERIFIED_MSG = "Certificate hash is valid";
const ISSUED_VERIFIED_MSG = "Certificate is issued on ethereum network";
const NOT_REVOKED_VERIFIED_MSG = "Certificate has not been revoked";

const renderErrorBlock = ({
  verifyTriggered,
  isHashVerified,
  isIssued,
  isNotRevoked,
  hashError,
  storeError,
  revokedError
}) => {
  if (!verifyTriggered) return null;

  const content = [];

  if (!isHashVerified && hashError) content.push(hashError);
  if (!isIssued && storeError) content.push(storeError);
  if (!isNotRevoked && revokedError) content.push(revokedError);

  if (content.length === 0) return null;

  const renderedContent = content.map((c, i) => <div key={i}>{c}</div>);

  return (
    <div className="bg-red pa3 white">
      <div className="f3">Errors:</div>
      <div className="f5 pa2">{renderedContent}</div>
    </div>
  );
};

const renderWarningBlock = ({ verifyTriggered }) => {
  if (!verifyTriggered) return null;

  const content = [];

  content.push(
    "Issuer identity cannot be identified, please manually verify contract store address."
  );

  if (content.length === 0) return null;

  const renderedContent = content.map((c, i) => <div key={i}>{c}</div>);

  return (
    <div className="bg-orange pa3 white">
      <div className="f3">Warnings:</div>
      <div className="f5 pa2">{renderedContent}</div>
    </div>
  );
};

const renderPassBlock = ({
  verifyTriggered,
  isHashVerified,
  isIssued,
  isNotRevoked
}) => {
  if (!verifyTriggered) return null;

  const content = [];

  if (isHashVerified) content.push(HASH_VERIFIED_MSG);
  if (isIssued) content.push(ISSUED_VERIFIED_MSG);
  if (isNotRevoked) content.push(NOT_REVOKED_VERIFIED_MSG);

  if (content.length === 0) return null;

  const renderedContent = content.map((c, i) => <div key={i}>{c}</div>);

  return (
    <div className="bg-green pa3 white">
      <div className="f3">Checks Passed:</div>
      <div className="f5 pa2">{renderedContent}</div>
    </div>
  );
};

const renderButton = ({
  handleCertificateVerify,
  verifyTriggered,
  verifying,
  isHashVerified,
  isIssued,
  isNotRevoked
}) => {
  let text = "Verify";
  let color = "bg-black";
  let verifyEnabled = true;

  if (verifying) {
    text = "Verifying...";
    color = "bg-orange";
    verifyEnabled = false;
  }

  if (verifyTriggered && isHashVerified && isIssued && isNotRevoked) {
    text = "Certificate is verified";
    color = "bg-green";
    verifyEnabled = false;
  }

  if (verifyTriggered && !(isHashVerified && isIssued && isNotRevoked)) {
    text = "Certificate is invalid";
    color = "bg-red";
    verifyEnabled = false;
  }

  return (
    <div
      onClick={verifyEnabled ? handleCertificateVerify : null}
      className={`w5 tc white pa3 w-100 bb ${color} ${
        verifyEnabled ? "pointer" : null
      }`}
    >
      <div className="f3">{text}</div>
    </div>
  );
};

const CertificateVerifyBlock = props => (
  <div>
    {renderButton(props)}
    {renderErrorBlock(props)}
    {renderWarningBlock(props)}
    {renderPassBlock(props)}
  </div>
);

CertificateVerifyBlock.propTypes = {
  handleCertificateVerify: PropTypes.func,
  verifyTriggered: PropTypes.bool,
  verifying: PropTypes.bool,
  isHashVerified: PropTypes.bool,
  isIssued: PropTypes.bool,
  isNotRevoked: PropTypes.bool,
  hashError: PropTypes.string,
  storeError: PropTypes.string,
  revokedError: PropTypes.string
};

renderErrorBlock.propTypes = {
  handleCertificateVerify: PropTypes.func,
  verifyTriggered: PropTypes.bool,
  verifying: PropTypes.bool,
  isHashVerified: PropTypes.bool,
  isIssued: PropTypes.bool,
  isNotRevoked: PropTypes.bool,
  hashError: PropTypes.string,
  storeError: PropTypes.string,
  revokedError: PropTypes.string
};

renderWarningBlock.propTypes = {
  handleCertificateVerify: PropTypes.func,
  verifyTriggered: PropTypes.bool,
  verifying: PropTypes.bool,
  isHashVerified: PropTypes.bool,
  isIssued: PropTypes.bool,
  isNotRevoked: PropTypes.bool,
  hashError: PropTypes.string,
  storeError: PropTypes.string,
  revokedError: PropTypes.string
};

renderPassBlock.propTypes = {
  handleCertificateVerify: PropTypes.func,
  verifyTriggered: PropTypes.bool,
  verifying: PropTypes.bool,
  isHashVerified: PropTypes.bool,
  isIssued: PropTypes.bool,
  isNotRevoked: PropTypes.bool,
  hashError: PropTypes.string,
  storeError: PropTypes.string,
  revokedError: PropTypes.string
};

renderButton.propTypes = {
  handleCertificateVerify: PropTypes.func,
  verifyTriggered: PropTypes.bool,
  verifying: PropTypes.bool,
  isHashVerified: PropTypes.bool,
  isIssued: PropTypes.bool,
  isNotRevoked: PropTypes.bool,
  hashError: PropTypes.string,
  storeError: PropTypes.string,
  revokedError: PropTypes.string
};

export default CertificateVerifyBlock;
