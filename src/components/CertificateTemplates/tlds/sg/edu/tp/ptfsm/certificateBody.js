import PropTypes from "prop-types";

const CertificateBody = ({ certificate }) => (
  <div className="container">
    <style>
      {`
    .recipient-paragraph{
      font-family: Arial, sans-serif;
      text-align:center;
    }

    .recipient-name{
      font-size:1.8em;
      font-style: italic;
      font-variant:small-caps;
      font-family: Arial, sans-serif;
      font-weight: bold;
      text-align:center;
    }

    .received-date {
      font-size: 1.4em;
      font-style:italic;
      font-family: Arial, sans-serif;
      text-align:center;
      margin-top:1em;
    }

    .certificate-body{
      margin-top:10em;
      margin-bottom:10em;
    }

    .accredited-paragraph {
      font-size:1.8em;
      font-family: Arial, sans-serif;
      text-align:center;
      margin-bottom:0.8em;
    }

    `}
    </style>

    <div className="certificate-body">
      <div className="accredited-paragraph">
        Accredited Training Institution Scheme
        <br />
        for
        <br />
        Fire Safety Manager
      </div>

      <div className="recipient-paragraph">This is to certify that</div>

      <div className="recipient-name">{certificate.recipient.name}</div>

      <div className="recipient-paragraph">
        has successfully completed the {certificate.name} Module in the
        <br />
        {certificate.additionalData.recognizedTowardsCourseName}
      </div>

      <div className="received-date">
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
