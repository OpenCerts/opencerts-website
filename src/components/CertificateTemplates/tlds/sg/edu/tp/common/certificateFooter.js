import { IMG_SIGN_TP_PCEO, IMG_SIGN_TP_REGISTRAR } from "./images";

const CertificateFooter = () => (
  <div className="container">
    <style>
      {`
      
      .principal-sign{
        pointer-events: none !important;
        width: 90%;
        padding-top: 2em;
        padding-bottom: 1em;
      }
      
      .registrar-sign{
        pointer-events: none !important;
        width: 90%;
        padding-top: 3.5em;
        padding-bottom: 1.1em;
      }

      .signature-container{
        width:100%;
        float:right;
        text-align:center;
        color:#aaa;
      }

      .principal-sign-label,
      .registrar-sign-label{
        border-top:1px solid #aaa;
        text-align:center;
        color: #aaa;
      }

      .signature-label-row {
        margin-bottom:3em;
      }
      `}
    </style>

    <div className="row ">
      <div className="col-6">&nbsp;</div>
      <div className="col-3">
        <div className="signature-container">
          <img src={IMG_SIGN_TP_PCEO} className="principal-sign" />
        </div>
      </div>
      <div className="col-3">
        <div className="signature-container">
          <img src={IMG_SIGN_TP_REGISTRAR} className="registrar-sign" />
        </div>
      </div>
    </div>
    <div className="row signature-label-row">
      <div className="col-6">&nbsp;</div>
      <div className="col-3">
        <div className="signature-container principal-sign-label">
          Principal
        </div>
      </div>
      <div className="col-3">
        <div className="signature-container registrar-sign-label">
          Registrar
        </div>
      </div>
    </div>
  </div>
);

export default CertificateFooter;
