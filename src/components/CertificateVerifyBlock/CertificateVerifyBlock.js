import PropTypes from "prop-types";
import DetailedCertificateVerifyBlock from "./DetailedCertificateVerifyBlock";
import { LOG_LEVEL } from "./constants";

const statusSummary = ({
  verifying,
  hashStatus,
  issuedStatus,
  notRevokedStatus,
  issuerIdentityStatus
}) => {
  if (verifying) return LOG_LEVEL.VERIFYING;
  if (
    !verifying &&
    hashStatus.verified &&
    issuedStatus.verified &&
    notRevokedStatus.verified &&
    issuerIdentityStatus.verified
  )
    return LOG_LEVEL.VALID;
  if (
    !verifying &&
    hashStatus.verified &&
    issuedStatus.verified &&
    notRevokedStatus.verified &&
    !issuerIdentityStatus.verified
  )
    return LOG_LEVEL.WARNING;
  return LOG_LEVEL.INVALID;
};

const renderIcon = status => {
  let icon;
  switch (status) {
    case LOG_LEVEL.CONNECTING:
    case LOG_LEVEL.VERIFYING:
      icon = (
        <i
          id="verify-spinner"
          className="fa fa-spinner fa-spin fa-2x text-muted"
        />
      );
      break;
    case LOG_LEVEL.VALID:
      icon = (
        <i
          id="verify-valid"
          className="fas fa-check-circle fa-2x text-success"
        />
      );
      break;
    case LOG_LEVEL.WARNING:
      icon = (
        <i
          id="verify-warning"
          className="fas fa-exclamation-triangle fa-2x text-warning"
        />
      );
      break;
    default:
      icon = (
        <i
          id="verify-invalid"
          className="fas fa-times-circle fa-2x text-danger"
        />
      );
  }
  return (
    <div className="col-3 d-flex justify-content-center align-items-center">
      {icon}
    </div>
  );
};

const renderText = status => {
  let text;
  switch (status) {
    case LOG_LEVEL.CONNECTING:
      text = "Connecting ...";
      break;
    case LOG_LEVEL.VERIFYING:
      text = "Verifying Certificate ...";
      break;
    case LOG_LEVEL.VALID:
      text = "Certificate Verified";
      break;
    case LOG_LEVEL.WARNING:
      text = "Unidentified Issuer";
      break;
    default:
      text = "Invalid Certificate";
  }
  return (
    <div className="col-9 d-flex align-content-center align-items-center">
      {text}
    </div>
  );
};

const SimpleVerifyBlock = props => {
  const status = statusSummary(props);
  const renderedIcon = renderIcon(status);
  const renderedText = renderText(status);
  return (
    <div
      style={{ minWidth: 300, backgroundColor: "#EEE" }}
      className="p-2 pointer"
      onClick={props.toggleDetailedView}
    >
      <div className="row">
        {renderedIcon}
        {renderedText}
      </div>
    </div>
  );
};

const CertificateVerifyBlock = props => {
  const status = statusSummary(props);
  return (
    <div className="d-flex align-items-start">
      <SimpleVerifyBlock {...props} />
      {props.detailedVerifyVisible ? (
        <DetailedCertificateVerifyBlock
          statusSummary={status}
          hashStatus={props.hashStatus}
          issuedStatus={props.issuedStatus}
          notRevokedStatus={props.notRevokedStatus}
          issuerIdentityStatus={props.issuerIdentityStatus}
        />
      ) : (
        ""
      )}
    </div>
  );
};

CertificateVerifyBlock.propTypes = {
  verifyTriggered: PropTypes.bool,
  verifying: PropTypes.bool,

  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object,
  toggleDetailedView: PropTypes.func,
  detailedVerifyVisible: PropTypes.bool
};

SimpleVerifyBlock.propTypes = CertificateVerifyBlock.propTypes;

export default CertificateVerifyBlock;
