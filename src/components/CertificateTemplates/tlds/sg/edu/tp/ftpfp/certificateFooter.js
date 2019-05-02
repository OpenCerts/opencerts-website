import PropTypes from "prop-types";
import { IMG_SIGN_TP_REGISTRAR, IMG_SIGN_TP_DIR_HSS } from "../common/images";

const CertificateFooter = ({ certificate }) => {
  const Director = () => {
    const issuedYear = new Date(certificate.issuedOn).getFullYear();

    if (issuedYear <= 2017) {
      return <span>Centre Director</span>;
    }

    return (
      <span>
        Director
        <br />
        School of Humanities
        <br />& Social Sciences
      </span>
    );
  };

  return (
    <div className="container">
      <style>
        {`
      
      .director-sign{
        pointer-events: none !important;
        width: 90%;
        padding-top: 2em;
        padding-bottom: 0.3em;
      }
      
      .registrar-sign{
        pointer-events: none !important;
        width: 90%;
        padding-top: 3.5em;
        padding-bottom: 1.25em;
      }

      .signature-container{
        width:100%;
        float:right;
        text-align:center;
        color:#aaa;
      }

      .director-sign-label,
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

      <div className="row">
        <div className="col-6">&nbsp;</div>
        <div className="col-3">
          <div className="signature-container">
            <img src={IMG_SIGN_TP_DIR_HSS} className="director-sign" />
          </div>
        </div>
        <div className="col-3">
          <span className="signature-container">
            <img src={IMG_SIGN_TP_REGISTRAR} className="registrar-sign" />
          </span>
        </div>
      </div>

      <div className="row signature-label-row">
        <div className="col-6">&nbsp;</div>
        <div className="col-3">
          <div className="signature-container director-sign-label">
            <Director />
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
};

CertificateFooter.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default CertificateFooter;
