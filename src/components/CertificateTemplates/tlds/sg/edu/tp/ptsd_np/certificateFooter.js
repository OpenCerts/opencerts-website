import { IMG_SIGN_TP_PCEO, IMG_SIGN_NP_PCEO } from "../common/images";

const CertificateFooter = () => (
  <div className="container">
    <style>
      {`
      
      .tp-principal-sign {
        pointer-events: none !important;
        width: 80%;
        color: #aaa;
        padding-bottom: 1em;        
      }

      .np-principal-sign{
        pointer-events: none !important;
        width: 80%;
        color: #aaa;
        padding-top: 1em;
        padding-bottom: 0.6em;       
      }

      .tp-principal-sign-label,
      .np-principal-sign-label{
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
      <div className="col-6" />
      <div className="col-3">
        <div className="signature-container">
          <img src={IMG_SIGN_TP_PCEO} className="tp-principal-sign" />
        </div>
      </div>
      <div className="col-3">
        <div className="signature-container">
          <img src={IMG_SIGN_NP_PCEO} className="np-principal-sign" />
        </div>
      </div>
    </div>

    <div className="row signature-label-row">
      <div className="col-6" />
      <div className="col-3">
        <div className="signature-container tp-principal-sign-label">
          Principal
          <br />
          Temasek Polytechnic
        </div>
      </div>
      <div className="col-3">
        <div className="signature-container np-principal-sign-label">
          Principal
          <br />
          Ngee Ann Polytechnic
        </div>
      </div>
    </div>
  </div>
);

export default CertificateFooter;
