import PropTypes from "prop-types";
import { IMG_SIGN_TP_REGISTRAR } from "./images";


const TranscriptFooter = ({ certificate }) => (
  <div className="container">
    <style>
      {`
      .end-of-records{
        text-align: center;
        font-size:0.8em;
      }

      .issue-date{
        border-bottom: 1px solid #212529;
        text-align:left;
        margin-top:2.5em;
      }

      .registrar-sign{
        pointer-events: none !important;
        width: 90%;
        border-bottom: 1px solid #212529;
        padding-bottom:0.2em;
      }

      .signature-container{
        float:right;
        text-align: left;
      }

    `}
    </style>

    <br />
    <div className="end-of-records">-------- End of Records --------</div>

    <br />

    <div className="row">
      <div className="col-2">
        <div className="issue-date">
          &nbsp;&nbsp;
          {new Date(certificate.issuedOn).toLocaleDateString("en-SG")}
        </div>
        Date
      </div>
      <div className="col-8">&nbsp;</div>
      <div className="col-2">
        <span className="signature-container">
          <img src={IMG_SIGN_TP_REGISTRAR} className="registrar-sign" />
          <br />
          for REGISTRAR
        </span>
      </div>
    </div>

    <br/>
    <br/>
  </div>
);

TranscriptFooter.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default TranscriptFooter;
