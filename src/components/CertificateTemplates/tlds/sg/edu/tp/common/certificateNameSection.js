import PropTypes from "prop-types";

const CertificateNameSection = ({ certificate }) => {
  const firstLine = "Diploma in";
  const secondLine = certificate.name.replace(/diploma in/i, "").trim();

  return (
    <div className="certificate-name">
      {firstLine}

      <br />

      {!certificate.additionalData.isMerit &&
        !certificate.additionalData.isExempted && <span>{secondLine}</span>}

      {!certificate.additionalData.isMerit &&
        certificate.additionalData.isExempted && <span>{secondLine}*</span>}

      {certificate.additionalData.isMerit &&
        !certificate.additionalData.isExempted && (
          <span>
            {secondLine}
            <br />
            <small>WITH MERIT</small>
          </span>
        )}

      {certificate.additionalData.isMerit &&
        certificate.additionalData.isExempted && (
          <span>
            {secondLine}
            <br />
            <small>WITH MERIT*</small>
          </span>
        )}
    </div>
  );
};

CertificateNameSection.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default CertificateNameSection;
