import { IMG_SIGN_NIEC_DEAN, IMG_SIGN_TP_REGISTRAR } from "../common/images";

const NiecTranscriptFooter = () => (
  <div className="container">
    <style>
      {`
      .niec-dean-sign{
        width:30%;
        padding-bottom:1em;
      }

      .registrar-sign{
        width:80%;
        padding-top:1em;
        padding-bottom:1em;
      }

      .niec-dean-sign-label,
      .registrar-sign-label{
        border-top: 1px solid #212529;
        text-align: left;
      }
      `}
    </style>

    <br />
    <div className="end-of-records">-------- End of Records --------</div>

    <br />

    <div className="row">
      <div className="col-6">
        <div className="signature-container">
          <img src={IMG_SIGN_NIEC_DEAN} className="niec-dean-sign" />
        </div>
      </div>
      <div className="col-3">&nbsp;</div>
      <div className="col-3">
        <div className="signature-container">
          <img src={IMG_SIGN_TP_REGISTRAR} className="registrar-sign" />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col-6">
        <div className="signature-container niec-dean-sign-label">
          DEAN, ACADEMIC & STUDENT MANAGEMENT
          <br />
          NATIONAL INSTITUTE OF EARLY CHILDHOOD DEVELOPMENT
        </div>
      </div>
      <div className="col-3">&nbsp;</div>
      <div className="col-3">
        <div className="signature-container registrar-sign-label">
          for REGISTRAR
          <br />
          TEMASEK POLYTECHNIC
        </div>
      </div>
    </div>

    <br />
    <br />
  </div>
);

export default NiecTranscriptFooter;
