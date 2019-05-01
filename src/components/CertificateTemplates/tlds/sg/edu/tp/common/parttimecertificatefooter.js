import { IMG_SIGN_TP_REGISTRAR } from "./images";

const CertificateFooter = () => (
  <div className="container">
    <style>
      {`
      
      .registrar-sign{
        pointer-events: none !important;
        width: 90%;
        padding-top: 3.5em;
        padding-bottom: 1.25em;
        border-bottom: 1px solid #aaa;
      }

      .signature-container{
        float:right;
        text-align:center;
        color:#aaa;
      }
      `}
    </style>

    <div className="row">
      <div className="col-9">&nbsp;</div>
      <div className="col-3">
        <span className="signature-container">
          <img src={IMG_SIGN_TP_REGISTRAR} className="registrar-sign" />
          <br />
          Registrar
        </span>
      </div>
    </div>

    <br />
    <br />
    <br />
    <br />

  </div>
);

export default CertificateFooter;
