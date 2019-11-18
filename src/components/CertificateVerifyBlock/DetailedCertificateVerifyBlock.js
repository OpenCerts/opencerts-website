import PropTypes from "prop-types";
import css from "./detailedCertificateBlock.scss";
import { LOG_LEVEL } from "./constants";

const SuccessIcon = () => <i className="fas fa-check text-success mr-2" />;

const FailureIcon = () => (
  <i className="fas fa-times-circle text-danger mr-2" />
);

const WarningIcon = () => <i className="fas fa-question text-warning mr-2" />;

const CheckStatusRow = ({ message, icon }) => (
  <div className="row">
    <div className="col-2">{icon}</div>
    <div className="col-10">
      <div className="row">{message}</div>
    </div>
  </div>
);

const renderFailure = check => (
  <CheckStatusRow message={check.failure} icon={check.failureStatusIcon()} />
);

const renderSuccess = check => (
  <CheckStatusRow message={check.success} icon={SuccessIcon()} />
);

const renderStatus = (props, type, typeVerified = true) => {
  const isVerified = props[type.id].verified;

  if (isVerified !== typeVerified) return "";

  return isVerified ? renderSuccess(type) : renderFailure(type);
};

const CHECKS = {
  HASH: {
    id: "hashStatus",
    success: "Certificate has not been tampered with",
    failure: "Certificate has been tampered with",
    failureStatusIcon: FailureIcon
  },
  NOT_REVOKED: {
    id: "notRevokedStatus",
    success: "Certificate has not been revoked",
    failure: "Certificate has been revoked",
    failureStatusIcon: WarningIcon
  }
};

const renderVerifiedStatuses = props => (
  <div>
    {renderStatus(props, CHECKS.HASH)}
    {renderStatus(props, CHECKS.NOT_REVOKED)}
  </div>
);

const renderUnverifiedStatuses = props => {
  const show = !props.hashStatus.verified || !props.notRevokedStatus.verified;
  return show ? (
    <div>
      {renderStatus(props, CHECKS.HASH, false)}
      {renderStatus(props, CHECKS.NOT_REVOKED, false)}
      <hr />
    </div>
  ) : (
    ""
  );
};

const CertificateVerifyBlock = props => {
  let borderColor;
  switch (props.statusSummary) {
    case LOG_LEVEL.VALID:
      borderColor = "valid-border-color";
      break;
    case LOG_LEVEL.WARNING:
      borderColor = "warning-border-color";
      break;
    case LOG_LEVEL.INVALID:
    default:
      borderColor = "invalid-border-color";
  }
  return (
    <div
      className={`${css["detailed-certificate-block"]} ${
        css[borderColor]
      } bg-white p-3`}
    >
      <div className="mb-3">
        <h5>Details</h5>
      </div>
      {renderUnverifiedStatuses(props)}
      {renderVerifiedStatuses(props)}
    </div>
  );
};

CertificateVerifyBlock.propTypes = {
  statusSummary: PropTypes.string,
  hashStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object
};

CheckStatusRow.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.element
};

renderUnverifiedStatuses.propTypes = CertificateVerifyBlock.propTypes;

export default CertificateVerifyBlock;
