import PropTypes from "prop-types";
import CertificateBodyStyles from "./certificateBodyStyles";
import CertificateNameSection from "./certificateNameSection";

const CertificateBody = ({ certificate }) => {
  const formattedIssuedOn = new Date(certificate.issuedOn).toLocaleDateString(
    "en-SG",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

  return (
    <div className="container">
      <CertificateBodyStyles />

      <div className="certificate-body">
        <div className="recipient-paragraph">It is hereby certified that</div>
        <div className="recipient-name">{certificate.recipient.name}</div>
        <div className="recipient-paragraph">having successfully completed the course of study was awarded the</div>

        <CertificateNameSection certificate={certificate} />

        <div className="recipient-paragraph">
          by Temasek Polytechnic (Singapore) on {formattedIssuedOn}
          {certificate.additionalData.isExempted && (
            <span className="exempted-paragraph">
              <br />* Exempted from satisfying the full range of assessment
              objectives of the diploma
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

CertificateBody.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default CertificateBody;
