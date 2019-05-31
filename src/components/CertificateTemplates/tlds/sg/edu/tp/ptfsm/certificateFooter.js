import { IMG_SIGN_TP_REGISTRAR } from "../common/images";

const CertificateFooter = () => (
  <div className="container">
    <style>
      {`
      
      .director-sign {
        pointer-events: none !important;
        width: 80%;
        color: #aaa;
        padding-top: 1em;
        padding-bottom: 0.6em;       
      }

      .registrar-sign{
        pointer-events: none !important;
        width: 80%;
        color: #aaa;
        padding-top: 1em;
        padding-bottom: 0.6em;       
      }

      .director-sign-label,
      .registrar-sign-label{
        border-top:1px solid #aaa;
        text-align:center;
        color: #aaa;
      }

      .signature-container{
        width:100%;
        float:right;
        text-align:center;
        color:#aaa;
      }
      
      .signature-label-row {
        margin-bottom:3em;
      }
      `}
    </style>

    <div className="row">
      <div className="col-3">
        <div className="signature-container">
          <img src={IMG_SIGN_TP_REGISTRAR} className="director-sign" />
        </div>
      </div>
      <div className="col-6" />
      <div className="col-3">
        <div className="signature-container">
          <img src={IMG_SIGN_TP_REGISTRAR} className="registrar-sign" />
        </div>
      </div>
    </div>

    <div className="row signature-label-row">
      <div className="col-3">
        <div className="signature-container director-sign-label">
          Director
          <br />
          Civil Defence Academy
        </div>
      </div>
      <div className="col-6" />
      <div className="col-3">
        <div className="signature-container registrar-sign-label">
          Registrar
          <br />
          Temasek Polytechnic
        </div>
      </div>
    </div>
  </div>
);

export default CertificateFooter;
