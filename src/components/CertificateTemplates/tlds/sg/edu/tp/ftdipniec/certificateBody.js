import PropTypes from "prop-types";
import CertificateBodyStyles from "../common/certificateBodyStyles";
import CertificateNameSection from "../common/certificateNameSection";

const CertificateBody = ({ certificate }) => (
  <div className="container">
    <CertificateBodyStyles />

    <div className="certificate-body">
      <div className="recipient-paragraph">It is hereby certified that</div>

      <div className="recipient-name">{certificate.recipient.name}</div>

      <div className="recipient-paragraph">
        having successfully completed the course of study was awarded the
      </div>

      <CertificateNameSection certificate={certificate} />

      <div className="recipient-paragraph">
        by the National Institute of Early Childhood Development in
        collaboration
        <br />
        with Temasek Polytechnic (Singapore) on{" "}
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
