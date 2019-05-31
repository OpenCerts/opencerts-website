import PropTypes from "prop-types";
import CertificateNameSection from "../common/certificateNameSection";
import CertificateBodyStyles from "../common/certificateBodyStyles";

const CertificateBody = ({ certificate }) => (
  <div className="container">
    <CertificateBodyStyles />

    <div className="certificate-body">
      <div className="recipient-paragraph">It is hereby certified that</div>
      <div className="recipient-name">{certificate.recipient.name}</div>
      <div className="recipient-paragraph">has successfully completed the</div>

      <CertificateNameSection certificate={certificate} />

      <div className="recipient-paragraph">
        at Temasek Polytechnic (Singapore) on{" "}
        {new Date(certificate.issuedOn).toLocaleDateString("en-SG", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })}

        {certificate.additionalData.recognizedTowardsCourseName && (
          <span>
            <br />
            This Certificate is recognized towards the{" "}
            {certificate.additionalData.recognizedTowardsCourseName}.  
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
