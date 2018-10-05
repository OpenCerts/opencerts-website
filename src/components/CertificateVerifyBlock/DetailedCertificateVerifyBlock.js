import PropTypes from "prop-types";
import css from "./detailedCertificateBlock.scss";
import { LOG_LEVEL } from "./constants";

const CHECKS = {
  HASH: {
    id: "hashStatus",
    success: "Certificate is not tampered with",
    failure: "Certificate has been tampered"
  },
  ISSUED: {
    id: "issuedStatus",
    success: "Certificate has been issued",
    failure: "Certificate has not been issued"
  },
  ISSUER_IDENTITY: {
    id: "issuerIdentityStatus",
    success: "Issuer is identified",
    failure: "Issuer cannot be identified"
  },
  NOT_REVOKED: {
    id: "notRevokedStatus",
    success: "Issuer is not revoked",
    failure: "Issuer has been revoked"
  }
};

const renderStatus = (props, type, typeVerified = true) => {
  const isVerified = props[type.id].verified;
  const errorMsg = props[type.id].error;
  if (isVerified !== typeVerified) return "";
  return isVerified ? (
    <div className="row">
      <div className="col-2">
        <i className="fas fa-check text-success mr-2" />
      </div>
      <div className="col-10">
        <div className="row">{type.success}</div>
      </div>
    </div>
  ) : (
    <div className="row">
      <div className="col-2">
        <i className="fas fa-times-circle text-danger mr-2" />
      </div>
      <div className="col-10">
        <div className="row">{errorMsg}</div>
      </div>
    </div>
  );
};

const renderVerifiedStatuses = props => (
  <div>
    {renderStatus(props, CHECKS.HASH)}
    {renderStatus(props, CHECKS.ISSUED)}
    {renderStatus(props, CHECKS.ISSUER_IDENTITY)}
    {renderStatus(props, CHECKS.NOT_REVOKED)}
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
      {renderStatus(props, CHECKS.HASH, false)}
      {renderStatus(props, CHECKS.ISSUED, false)}
      {renderStatus(props, CHECKS.ISSUER_IDENTITY, false)}
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
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  issuerIdentityStatus: PropTypes.object,
  detailedVerifyVisible: PropTypes.bool
};
renderUnverifiedStatuses.propTypes = CertificateVerifyBlock.propTypes;

export default CertificateVerifyBlock;
