import PropTypes from "prop-types";
import { get, some, sortBy } from "lodash";
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
    <div
      className={`d-flex justify-content-center align-items-center ${
        css["verified-icon"]
      }`}
    >
      {icon}
    </div>
  );
};

export const getIdentityVerificationText = identityStatus => {
  if (some(identityStatus, ({ registry }) => !!registry)) {
    return "Accredited by SSG";
  }
  // note filter Boolean is to remove empty values
  const dnsNames = sortBy(identityStatus, ["dns"])
    .map(({ dns }) => (dns ? dns.toUpperCase() : null))
    .filter(Boolean);
  return `Issued by ${dnsNames.length > 0 ? dnsNames[0] : "Unknown"}`;
};

const renderText = (status, props) => {
  let text;
  switch (status) {
    case LOG_LEVEL.CONNECTING:
      text = "Connecting ...";
      break;
    case LOG_LEVEL.VERIFYING:
      text = "Verifying Certificate ...";
      break;
    case LOG_LEVEL.VALID: {
      const identity = get(props, "issuerIdentityStatus.identities", []);
      text = getIdentityVerificationText(identity);
      break;
    }
    case LOG_LEVEL.WARNING:
      text = "Institution identity not verified";
      break;
    default:
      text = "Invalid Certificate";
  }
  return <div className={css["verification-text"]}>{text}</div>;
};

const SimpleVerifyBlock = props => {
  const status = statusSummary(props);
  const renderedIcon = renderIcon(status);
  const renderedText = renderText(status, props);

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
      } ${props.detailedVerifyVisible ? css.active : ""}`}
      onClick={props.toggleDetailedView}
      id="certificate-status"
    >
      <div className="row" style={{ flexWrap: "inherit" }}>
        {renderedIcon}
        {renderedText}
        <span
          // eslint-disable-next-line prettier/prettier
          className={`d-flex justify-content-center align-items-center ${
            css.arrow
          }`}
        >
          {icons.arrow()}
        </span>
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
      } mb-md-0 mb-3`}
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
