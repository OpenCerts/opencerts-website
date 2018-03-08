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

const renderButton = ({
  handleCertificateVerify,
  handleShowChecks,
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
    text = "Verifying…";
    color = "bg-orange";
    verifyEnabled = false;
  }

  if (verifyTriggered && isHashVerified && isIssued && isNotRevoked) {
    text = "Valid ▼";
    color = "bg-green pointer";
    verifyEnabled = false;
  }

  if (verifyTriggered && !(isHashVerified && isIssued && isNotRevoked)) {
    text = "Invalid";
    color = "bg-red";
    verifyEnabled = false;
  }

  return (
    <div
      onClick={verifyEnabled ? handleCertificateVerify : handleShowChecks}
      className={`w5 tc white pa2 w-100 bb noselect ${color} ${
        verifyEnabled ? "pointer" : null
      }`}
    >
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
    const checks = [
      {
        name: "KNOWN_ISSUER",
        check: () =>
          this.props.isIssuerVerified
            ? { severity: SEVERITY.INFO, message: "Known issuer" }
            : { severity: SEVERITY.WARN, message: "Unknown issuer" }
      },
      {
        name: "HASH_VALID",
        check: () =>
          this.props.isHashVerified
            ? { severity: SEVERITY.INFO, message: "Valid hash" }
            : { severity: SEVERITY.ERROR, message: this.props.hashError }
      },
      {
        name: "CERTIFICATE_ISSUED",
        check: () =>
          this.props.isIssued
            ? { severity: SEVERITY.INFO, message: "Issued on Ethereum network" }
            : { severity: SEVERITY.ERROR, message: "Not issued" }
      },
      {
        name: "CERTIFICATE_NOT_REVOKED",
        check: () =>
          this.props.isNotRevoked && !this.props.revokedError
            ? { severity: SEVERITY.INFO, message: "Not revoked" }
            : { severity: SEVERITY.ERROR, message: this.props.revokedError }
      },
      {
        name: "STORE_OK",
        check: () =>
          this.props.storeError
            ? { severity: SEVERITY.ERROR, message: this.props.storeError }
            : { severity: SEVERITY.INFO, message: "Certificate store OK" }
      }
    ];

    const checked = checks.map(c => ({ ...c, result: c.check() }));
    const hasError = checked.find(
      c => c.result && c.result.severity === SEVERITY.ERROR
    );
    const hasWarning = checked.find(
      c => c.result && c.result.severity === SEVERITY.WARN
    );

    return (
      <div>
        {renderButton({
          ...this.props,
          handleShowChecks: () => {
            this.setState({ showInfo: !this.state.showInfo });
          }
        })}
        <InfoBlock severity={SEVERITY.ERROR} values={checked} />
        <InfoBlock severity={SEVERITY.WARN} values={checked} />
        {this.state.showInfo || hasError || hasWarning ? (
          <InfoBlock severity={SEVERITY.INFO} values={checked} />
        ) : null}
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
  revokedError: PropTypes.string
};

renderButton.propTypes = CertificateVerifyBlock.propTypes;

export default CertificateVerifyBlock;
