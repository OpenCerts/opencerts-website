import PropTypes from "prop-types";
import { IMG_LOGO_TP, IMG_LOGO_NIEC } from "../common/images";

const Certificate = ({ certificate }) => (
  <div className="container">
    <style>
      {`
    .niec-logo {
      padding-top:3em;
      float:left;
      width: 25%;
    }

    .tp-logo {
      padding-top:3.5em;
      float:right;
      width:30%;
    }

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

    .niec-director-sign,
    .principal-sign,
    .registrar-sign{
      border-bottom: 1px solid #aaa;
      width:100%;
      color: #aaa;        
    }

    .niec-director-sign-label,
    .principal-sign-label,
    .registrar-sign-label{
      text-align:center;
      color: #aaa;
    }

    .signature-container{
      width:100%;
      float:right;
      text-align:center;
      color:#aaa;
    }
    `}
    </style>

    <div className="row">
      <div className="col-12">
        <img src={IMG_LOGO_NIEC} className="niec-logo" />
        <img src={IMG_LOGO_TP} className="tp-logo" />
      </div>
    </div>

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
      by the National Institute of Early Childhood Development in collaboration
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
    <br />

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    <div className="row">
      <div className="col-6">
        <span className="signature-container">
          <div className="niec-director-sign">&nbsp;</div>
          <span className="niec-director-sign-label">
            Director
            <br />
            National Institute of Early Childhood Development
          </span>
        </span>
      </div>
      <div className="col-6">
        <div className="row">
          <div className="col-6">
            <span className="signature-container">
              <div className="principal-sign">&nbsp;</div>
              <span className="principal-sign-label">
                Principal
                <br />
                Temasek Polytechnic
              </span>
            </span>
          </div>
          <div className="col-6">
            <span className="signature-container">
              <div className="registrar-sign">&nbsp;</div>
              <span className="registrar-sign-label">
                Registrar
                <br />
                Temasek Polytechnic
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <br />
    <br />
    <br />
    <br />
  </div>
);

Certificate.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Certificate;
