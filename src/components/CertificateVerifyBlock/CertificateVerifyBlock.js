import PropTypes from "prop-types";
import DetailedCertificateVerifyBlock from "./DetailedCertificateVerifyBlock";
import { LOG_LEVEL } from "./constants";
import css from "./certificateVerifyBlock.scss";
import icons from "../ViewerPageImages";

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
      icon = <i id="verify-spinner" className="fa fa-spinner fa-spin fa-2x" />;
      break;
    case LOG_LEVEL.VALID:
      icon = icons.checkCircle();
      break;
    case LOG_LEVEL.WARNING:
      icon = (
        <i id="verify-warning" className="fas fa-exclamation-triangle fa-2x" />
      );
      break;
    default:
      icon = <i id="verify-invalid" className="fas fa-times-circle fa-2x" />;
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
      text = "Institution not in our registry";
      break;
    default:
      text = "Invalid Certificate";
  }
  return <div className={css["verification-text"]}>{text}</div>;
};

const SimpleVerifyBlock = props => {
  const status = statusSummary(props);
  const renderedIcon = renderIcon(status);
  const renderedText = renderText(status);

  let stateStyle;
  switch (status) {
    case LOG_LEVEL.VALID:
      stateStyle = "valid";
      break;
    case LOG_LEVEL.WARNING:
      stateStyle = "warning";
      break;
    case LOG_LEVEL.INVALID:
    default:
      stateStyle = "invalid";
  }
  return (
    <div
      className={`p-2 pointer ${css["simple-verify-block"]} ${
        css[stateStyle]
      } ${props.detailedVerifyVisible ? css.active : ""} col-12`}
      onClick={props.toggleDetailedView}
    >
      <div className="row">
        {renderedIcon}
        {renderedText}
        <span className={css.arrow}>{icons.arrow()}</span>
      </div>
    </div>
  );
};

const CertificateVerifyBlock = props => {
  const status = statusSummary(props);
  return (
    <div
      id="certificate-verify-block"
      className={`align-items-start flex-nowrap ${css["d-flex"]} ${
        css.verifyBlocksContainer
      } col-sm-12 col-md-11 col-lg-10 col-xl-7 mb-md-0 mb-3`}
    >
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
