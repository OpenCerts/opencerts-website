import PropTypes from "prop-types";

const TranscriptFooter = ({ certificate }) => (
  <div className="container">
    <style>
      {`
      .end-of-records{
        text-align: center;
        font-size:0.8em;
      }

      .issue-date{
        text-decoration:underline;
      }

      .registrar-sign{
        text-decoration:underline;
      }

      .registrar-sign-label{
        text-align: left;
      }

      .signature-container{
        float:right;
      }

    `}
    </style>

    <br />
    <div className="end-of-records">-------- End of Records --------</div>

    <br />

    <div className="row">
      <div className="col-2">
        <span className="issue-date">
          &nbsp;&nbsp;&nbsp;&nbsp;
          {new Date(certificate.issuedOn).toLocaleDateString("en-SG")}
          &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <br />
        Date
      </div>
      <div className="col-8">&nbsp;</div>
      <div className="col-2">
        <span className="signature-container">
          <span className="registrar-sign">
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
          </span>
          <br />
          <span className="registrar-sign-label">for Registrar</span>
        </span>
      </div>
    </div>
  </div>
);

TranscriptFooter.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default TranscriptFooter;
