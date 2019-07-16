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

const verificationChecks = props => ({
  HASH: {
    id: "hashStatus",
    success: "Certificate has not been tampered with",
    failure: "Certificate has been tampered with",
    failureStatusIcon: FailureIcon
  },
  ISSUED: {
    id: "issuedStatus",
    success: "Certificate has been issued",
    failure: "Certificate has not been issued",
    failureStatusIcon: FailureIcon
  },
  ISSUER_REGISTRY_IDENTITY: {
    id: "issuerIdentityStatus",
    success: "Accredited by SSG",
    failure: "Institution identity can not be verified by registry or dns",
    failureStatusIcon: WarningIcon
  },
  ISSUER_DNS_IDENTITY: {
    id: "issuerIdentityStatus",
    success: `Certificate issued from ${
      props ? props.issuerIdentityStatus.issuerDnsIdentity : ""
    }`,
    failure: "Institution identity can not be verified by registry or dns",
    failureStatusIcon: WarningIcon
  },
  NOT_REVOKED: {
    id: "notRevokedStatus",
    success: "Certificate has not been revoked",
    failure: "Certificate has been revoked",
    failureStatusIcon: WarningIcon
  }
});

const renderVerifiedStatuses = props => (
  <div>
    {renderStatus(props, verificationChecks().HASH)}
    {renderStatus(props, verificationChecks().ISSUED)}
    {props.issuerIdentityStatus.issuerRegistryIdentity
      ? renderStatus(props, verificationChecks().ISSUER_REGISTRY_IDENTITY)
      : renderStatus(props, verificationChecks(props).ISSUER_DNS_IDENTITY)}
    {renderStatus(props, verificationChecks().NOT_REVOKED)}
  </div>
);

const renderUnverifiedStatuses = props => {
  const show =
    !props.hashStatus.verified ||
    !props.issuedStatus.verified ||
    !props.issuerIdentityStatus.verified ||
    !props.notRevokedStatus.verified;
  return show ? (
    <div>
      {renderStatus(props, verificationChecks().HASH, false)}
      {renderStatus(props, verificationChecks().ISSUED, false)}
      {renderStatus(
        props,
        verificationChecks().ISSUER_REGISTRY_IDENTITY,
        false
      )}
      {renderStatus(props, verificationChecks().NOT_REVOKED, false)}
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
      } bg-white p-3 col-12`}
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
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object,
  detailedVerifyVisible: PropTypes.bool
};

CheckStatusRow.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.element
};

renderVerifiedStatuses.propTypes = {
  issuerIdentityStatus: PropTypes.object
};
renderUnverifiedStatuses.propTypes = CertificateVerifyBlock.propTypes;

export default CertificateVerifyBlock;
