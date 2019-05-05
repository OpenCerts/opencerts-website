import PropTypes from "prop-types";
import CertificateBodyStyles from "../common/certificateBodyStyles";

const CertificateBody = ({ certificate }) => {

  const firstLine = "Certificate in";
  const secondLine = certificate.name.replace(/certificate in/i, "").trim();

  return (
    <div className="container">
      <CertificateBodyStyles />

      <div className="certificate-body">
        <div className="recipient-paragraph">It is hereby certified that</div>
        <div className="recipient-name">{certificate.recipient.name}</div>
        <div className="recipient-paragraph">
          having satisfied the requirements of the Diploma Plus Programme was
          awarded the
        </div>
        <div className="certificate-name">
          {firstLine}
          <br />
          {secondLine}
        </div>
        <div className="recipient-paragraph">
          by Temasek Polytechnic (Singapore) on{" "}
          {new Date(certificate.issuedOn).toLocaleDateString("en-SG", {
            day: "numeric",
            month: "long",
            year: "numeric"
          })}
        </div>
      </div>
    </div>
  );

};

CertificateBody.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default CertificateBody;
