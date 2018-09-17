import PropTypes from "prop-types";
import Link from "next/link";

const View = ({
  issuerIdentityStatus,
  hashStatus,
  issuedStatus,
  notRevokedStatus
}) => {
  const isWarning =
    hashStatus.verified && issuedStatus.verified && notRevokedStatus.verified;
  return (
    <div
      className="text-center h-100 d-flex flex-column justify-content-center p-4 text-brand-dark"
      style={{
        backgroundColor: isWarning ? "#fbf6e9" : "#fbeae9",
        borderRadius: 10
      }}
    >
      {isWarning ? (
        <i className="fas fa-exclamation-triangle fa-3x text-orange" />
      ) : (
        <i className="fas fa-times-circle fa-3x text-red" />
      )}
      <div
        className={`${isWarning ? "text-orange" : "text-red"} m-3`}
        style={{ fontSize: "1.5rem" }}
      >
        {isWarning
          ? "Certificate from unregistered body"
          : "Invalid Certificate"}
      </div>

      {!hashStatus.verified ? (
        <p className="mb-0">- The certificate has been tampered with</p>
      ) : null}

      {!issuedStatus.verified ? (
        <p className="mb-0">- The certificate has not been issued</p>
      ) : null}

      {!notRevokedStatus.verified ? (
        <p className="mb-0">- The certificate has been revoked</p>
      ) : null}

      {!issuerIdentityStatus.verified ? (
        <p className="mb-0">- The issuer&#39;s identity cannot be verified</p>
      ) : null}

      {isWarning ? (
        <div
          className="mt-2"
          style={{
            textDecoration: "underline",
            fontSize: "0.8rem"
          }}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
          }}
        >
          <Link href="/viewer">Continue Viewing Certificate</Link>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

View.propTypes = {
  handleRenderOverwrite: PropTypes.func,
  document: PropTypes.object,

  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object
};

export default View;
