import PropTypes from "prop-types";
import CertificateBodyStyles from "./certificateBodyStyles";

const CertificateBody = ({ certificate }) => (
  <div className="container">
    <CertificateBodyStyles />

    <div className="certificate-body">
      <div className="recipient-paragraph">It is hereby certified that</div>
      <div className="recipient-name">{certificate.recipient.name}</div>
      <div className="recipient-paragraph">
        having successfully completed the course of study was awarded the
      </div>
      <div className="certificate-name">
        {!certificate.additionalData.isMerit &&
          !certificate.additionalData.isExempted && (
            <span>{certificate.name}</span>
          )}

        {!certificate.additionalData.isMerit &&
          certificate.additionalData.isExempted && (
            <span>{certificate.name}*</span>
          )}

        {certificate.additionalData.isMerit &&
          !certificate.additionalData.isExempted && (
            <span>
              {certificate.name}
              <br />
              <small>WITH MERIT</small>
            </span>
          )}

        {certificate.additionalData.isMerit &&
          certificate.additionalData.isExempted && (
            <span>
              {certificate.name}
              <br />
              <small>WITH MERIT*</small>
            </span>
          )}
      </div>
      <div className="recipient-paragraph">
        by Temasek Polytechnic (Singapore) on{" "}
        {new Date(certificate.issuedOn).toLocaleDateString("en-SG", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })}
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

CertificateBody.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default CertificateBody;
