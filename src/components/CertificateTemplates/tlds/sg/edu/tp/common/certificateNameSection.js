import PropTypes from "prop-types";

const CertificateNameSection = ({ certificate }) => {

  const splitTwoLines = (value) => {
    const index = value.search(/ in /i); 

    if(index > 0) {

      const firstLineEnd = index + 3;
      const firstLine = certificate.name.substring(0, firstLineEnd);
      
      const secondLineStart = index + 4;
      const secondLindEnd = certificate.name.length;
      const secondLine = certificate.name.substring(secondLineStart, secondLindEnd);
      
      return (
        <span>
          {firstLine}
          <br />
          {secondLine}
        </span>
      );
    } else {
      return (
        <span>
        {certificate.name}
        </span>
      );
    }
  };

  return (
    <div className="certificate-name">
      
      {splitTwoLines(certificate.name) }

      {certificate.additionalData.isMerit && (
        <span>
        <br />
        <small>WITH MERIT</small>
        </span>
      )}

      {certificate.additionalData.isExempted && (
        <span>*</span>
      )}

    </div>
  );
  
};

CertificateNameSection.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default CertificateNameSection;
