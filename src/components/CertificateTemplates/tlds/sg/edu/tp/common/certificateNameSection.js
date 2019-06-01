import PropTypes from "prop-types";

const CertificateNameSection = ({ certificate }) => {
  const splitTwoLines = value => {
    const lines = value.split(/ in (.+)/i);
    if (lines.length > 1) {
      return (
        <span>
          {lines[0]} in
          <br />
          {lines[1]}
        </span>
      );
    }
    return <span>{value}</span>;
  };

  return (
    <div className="certificate-name">
      {splitTwoLines(certificate.name)}

      {certificate.additionalData.isMerit && (
        <span>
          <br />
          <small>WITH MERIT</small>
        </span>
      )}

      {certificate.additionalData.isExempted && <span>*</span>}
    </div>
  );
};

CertificateNameSection.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default CertificateNameSection;
