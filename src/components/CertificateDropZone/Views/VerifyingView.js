import PropTypes from "prop-types";

const View = ({ verificationStatus, retrieveCertificateStatus }) => {
  const lastStatus =
    verificationStatus && verificationStatus[verificationStatus.length - 1];

  let statusIcon;

  if (lastStatus && lastStatus.message) {
    if (!lastStatus.warning && !lastStatus.error) {
      statusIcon = <i className="fas fa-check text-green mr-3" />;
    } else if (!lastStatus.error) {
      statusIcon = (
        <i className="fas fa-exclamation-triangle text-orange mr-3" />
      );
    } else {
      statusIcon = <i className="fas fa-times-circle text-red mr-3" />;
    }
  }

  return (
    <div
      className="text-center bg-light h-100 d-flex flex-column justify-content-center p-4 text-blue"
      style={{ borderRadius: 10 }}
    >
      <i className="fas fa-spinner fa-pulse fa-3x" />
      <div className="m-3" style={{ fontSize: "1.5rem" }}>
        {retrieveCertificateStatus === "PENDING"
          ? "Retrieving Certificate..."
          : "Verifying Certificate..."}
      </div>
      {lastStatus && lastStatus.message ? (
        <div className="text-muted">
          {statusIcon}
          {lastStatus.message}
        </div>
      ) : null}
    </div>
  );
};

export default View;

View.propTypes = {
  verificationStatus: PropTypes.array,
  retrieveCertificateStatus: PropTypes.object
};
