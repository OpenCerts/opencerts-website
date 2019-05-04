import PropTypes from "prop-types";
import CertificateBodyStyles from "../common/certificateBodyStyles";

const CertificateBody = ({ certificate }) => (
  <div className="container">
    <CertificateBodyStyles />

    <style>
      {`
        .academic-year{
          margin-top:1em;
          font-variant: normal;
          text-transform: capitalize;
        }
      `}
    </style>

    <div className="certificate-body">
      <div className="recipient-paragraph">It is hereby certified that</div>
      <div className="recipient-name">{certificate.recipient.name}</div>
      <div className="recipient-paragraph">has successfully completed the</div>
      <div className="certificate-name">
        <div>
          Polytechnic
          <br />
          Foundation Programme
        </div>
        <div className="academic-year">
          Academic Year {new Date(certificate.admissionDate).getFullYear()}/
          {new Date(certificate.admissionDate).getFullYear() + 1}
        </div>
      </div>
      <div className="recipient-paragraph">
        at Temasek Polytechnic (Singapore) on{" "}
        {new Date(certificate.issuedOn).toLocaleDateString("en-SG", {
          day: "numeric",
          month: "long",
          year: "numeric"
        })}
      </div>
    </div>
  </div>
);

CertificateBody.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default CertificateBody;
