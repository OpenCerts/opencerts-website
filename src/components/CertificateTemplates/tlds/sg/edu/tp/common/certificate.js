import PropTypes from "prop-types";
import CertificateHeader from "./certificateheader";
import CertificateFooter from "./certificatefooter";

const Certificate = ({ certificate }) => (
  <div className="container">
    <style>
      {`
      .recipient-paragraph{
        font-style: italic;
        font-family: "Times New Roman", Times, serif;
      }

      .exempted-paragraph{
        font-style:normal;
      }

      .recipient-name{
        font-size:1.5em;
        font-style: italic;
        font-variant:small-caps;
        font-family: "Times New Roman", Times, serif;
      }

      .certificate-name{
        font-size:2.7em;
        font-variant:small-caps;
        font-style: italic;
        font-family: "Times New Roman", Times, serif;
        text-transform:uppercase;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
        margin-top:0.25em;
        margin-bottom:0.35em;
        padding-top:1em;
        padding-bottom:5em;
      }
      `}
    </style>

    <CertificateHeader />

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

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

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    <CertificateFooter />
  </div>
);

Certificate.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Certificate;
