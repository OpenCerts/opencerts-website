import PropTypes from "prop-types";

const Certificate = ({ certificate }) => (
  <div className="container">
    <style>
      {`
      .tp-logo {
        padding-top:3em;
        float:right;
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

      .principal-sign,
      .registrar-sign{
        text-decoration: underline;
        color: #aaa;        
      }

      .principal-sign-label,
      .registrar-sign-label{
        text-align:center;
        color: #aaa;
      }

      .signature-container{
        float:right;
        text-align:center;
        color:#aaa;
      }
      `}
    </style>

    <div className="row">
      <div className="col-12">
        <img src="/static/images/TP_logo.svg" className="tp-logo" />
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
    <div className="recipient-paragraph">has successfully completed the</div>
    <div className="certificate-name">
      <span>{certificate.name}</span>
    </div>
    <div className="recipient-paragraph">
      at Temasek Polytechnic (Singapore) on{" "}
      {new Date(certificate.issuedOn).toLocaleDateString("en-SG", {
        day: "numeric",
        month: "long",
        year: "numeric"
      })}
      <br />
      This Certificate is recognized towards the{" "}
      {certificate.additionalData.recoginzedTowardsCourseName}.
    </div>
    <br />

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />

    <div className="row">
      <div className="col-6">&nbsp;</div>
      <div className="col-6">
        <div className="row">
          <div className="col-6">&nbsp;</div>
          <div className="col-6">
            <span className="signature-container">
              <span className="registrar-sign">
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
              </span>
              <br />
              <span className="registrar-sign-label">Registrar</span>
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
