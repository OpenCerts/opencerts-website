import React from "react";
import PropTypes from "prop-types";

const SEVERITY = {
  ERROR: "ERROR",
  WARN: "WARN",
  INFO: "INFO"
};

const InfoBlock = props => {
  const colors = {
    [SEVERITY.ERROR]: "bg-red white ma0 pa2",
    [SEVERITY.WARN]: "bg-orange white ma0 pa2",
    [SEVERITY.INFO]: "bg-green white ma0 pa2"
  };

  const icons = {
    [SEVERITY.WARN]: "⚠️",
    [SEVERITY.ERROR]: "🚨",
    [SEVERITY.INFO]: "✓"
  };

  const toRender = props.values.filter(
    c => c.result && c.result.severity === props.severity
  );

  if (toRender.length === 0) {
    return null;
  }

  return (
    <ul className={colors[props.severity]} style={{ listStyleType: "none" }}>
      {toRender.map((val, i) => (
        <li key={i}>{`${icons[props.severity]} ${val.result.message}`}</li>
      ))}
    </ul>
  );
};

InfoBlock.propTypes = {
  severity: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.object)
};

const renderBlockHeader = ({
  certificateHashVerifying,
  certificateIssuedVerifying,
  certificateNotRevokedVerifying,
  certificateIssuerVerifying,
  issuerError,
  hashError,
  certificateIssuedError,
  revokedError
}) => {
  let text = "";
  let color = "";

  const verifying =
    certificateHashVerifying ||
    certificateIssuedVerifying ||
    certificateNotRevokedVerifying ||
    certificateIssuerVerifying;

  const hasError = hashError || certificateIssuedError || revokedError;

  const hasWarning = issuerError;

  if (verifying) {
    text = "Verifying…";
    color = "bg-orange";
  } else if (!verifying && !hasError && !hasWarning) {
    text = "Verified";
    color = "bg-green";
  } else if (!verifying && !hasError) {
    text = "Verified (with warnings)";
    color = "bg-orange";
  } else {
    text = "Bad certificate";
    color = "bg-red";
  }

  return (
    <div className={`w5 tc white pa2 w-100 bb noselect ${color}`}>
      <div className="f3">{text}</div>
    </div>
  );
};

class CertificateVerifyBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.certificateStore !== nextProps.certificateStore &&
      nextProps.certificateStore != null
    ) {
      this.props.handleCertificateVerify();
    }
  }

  render() {
    const {
      certificateHashVerifying,
      certificateIssuedVerifying,
      certificateNotRevokedVerifying,
      certificateIssuerVerifying,

      isHashVerified,
      isIssued,
      isNotRevoked,
      issuerIdentity,
      isIssuerVerified,

      issuerError,
      revokedError,
      certificateIssuedError,
      hashError
    } = this.props;

    const checks = [
      {
        name: "KNOWN_ISSUER",
        check: () => {
          if (certificateIssuerVerifying)
            return {
              severity: SEVERITY.WARN,
              message: "Verifying issuer's identity…"
            };
          return isIssuerVerified
            ? {
                severity: SEVERITY.INFO,
                message: `Issuer identity confirmed: ${issuerIdentity}`
              }
            : { severity: SEVERITY.WARN, message: issuerError };
        }
      },
      {
        name: "HASH_VALID",
        check: () => {
          if (certificateHashVerifying)
            return {
              severity: SEVERITY.WARN,
              message: "Verifying certificate hash…"
            };
          return isHashVerified
            ? { severity: SEVERITY.INFO, message: "Valid certificate hash" }
            : { severity: SEVERITY.ERROR, message: hashError };
        }
      },
      {
        name: "CERTIFICATE_ISSUED",
        check: () => {
          if (certificateIssuedVerifying)
            return {
              severity: SEVERITY.WARN,
              message: "Verifying certificate issue status…"
            };
          return isIssued
            ? { severity: SEVERITY.INFO, message: "Issued on Ethereum network" }
            : { severity: SEVERITY.ERROR, message: certificateIssuedError };
        }
      },
      {
        name: "CERTIFICATE_NOT_REVOKED",
        check: () => {
          if (certificateNotRevokedVerifying)
            return {
              severity: SEVERITY.WARN,
              message: "Verifying certificate revoke status…"
            };
          return isNotRevoked
            ? { severity: SEVERITY.INFO, message: "Certificate is not revoked" }
            : { severity: SEVERITY.ERROR, message: revokedError };
        }
      }
    ];

    const checked = checks.map(c => ({ ...c, result: c.check() }));

    return (
      <div>
        {renderBlockHeader({
          ...this.props,
          handleShowChecks: () => {
            this.setState({ showInfo: !this.state.showInfo });
          }
        })}
        <InfoBlock severity={SEVERITY.ERROR} values={checked} />
        <InfoBlock severity={SEVERITY.WARN} values={checked} />
        <InfoBlock severity={SEVERITY.INFO} values={checked} />
      </div>
    );
  }
}

CertificateVerifyBlock.propTypes = {
  certificateStore: PropTypes.object,
  handleCertificateVerify: PropTypes.func,
  verifyTriggered: PropTypes.bool,
  verifying: PropTypes.bool,
  isHashVerified: PropTypes.bool,
  isIssuerVerified: PropTypes.bool,
  isIssued: PropTypes.bool,
  isNotRevoked: PropTypes.bool,
  hashError: PropTypes.string,
  storeError: PropTypes.string,
  revokedError: PropTypes.string,
  issuerError: PropTypes.string,
  certificateHashVerifying: PropTypes.bool,
  certificateIssuedVerifying: PropTypes.bool,
  certificateNotRevokedVerifying: PropTypes.bool,
  certificateIssuerVerifying: PropTypes.bool,
  certificateIssuedError: PropTypes.string,
  issuerIdentity: PropTypes.string
};

renderBlockHeader.propTypes = CertificateVerifyBlock.propTypes;

export default CertificateVerifyBlock;
