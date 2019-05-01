import PropTypes from "prop-types";
import { IMG_SIGN_TP_REGISTRAR } from "../common/images";
import { IMG_SIGN_TP_DIR_HSS } from "../common/images";

const CertificateFooter = ({certificate}) => {

  const Director = () => {
    const issuedYear = new Date(certificate.issuedOn).getFullYear();

    if (issuedYear <= 2017) {
      return (
        <span className="signature-container">
          <img src={IMG_SIGN_TP_DIR_HSS} className="director-sign" />
          <br />
          Centre Director
        </span>
      );
    }

    return (
      <span className="signature-container">
        <img src={IMG_SIGN_TP_DIR_HSS} className="director-sign" />
        <br />
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
        border-bottom: 1px solid #aaa;
      }
      
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
      <div className="col-6">&nbsp;</div>
      <div className="col-3">
        <Director />
      </div>
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
};


CertificateFooter.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default CertificateFooter;
