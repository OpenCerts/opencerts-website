const TranscriptFooter = () => (
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

      .niec-dean-sign,
      .registrar-sign{
        border-bottom:1px solid #aaa;
        width:100%;
      }

      .niec-dean-sign-label,
      .registrar-sign-label{
        text-align: left;
      }

      .signature-container{
        width:100%;
        float:right;
        text-align:left;
      }

    `}
    </style>

    <br />
    <div className="end-of-records">-------- End of Records --------</div>

    <br />

    <div className="row">
      <div className="col-6">
        <span className="signature-container">
          <div className="niec-dean-sign">&nbsp;</div>
          <span className="niec-dean-sign-label">
            DEAN, ACADEMIC & STUDENT MANAGEMENT
            <br />
            NATIONAL INSTITUTE OF EARLY CHILDHOOD DEVELOPMENT
          </span>
        </span>
      </div>
      <div className="col-3">&nbsp;</div>
      <div className="col-3">
        <span className="signature-container">
          <div className="registrar-sign">&nbsp;</div>
          <span className="registrar-sign-label">
            for REGISTRAR
            <br />
            TEMASEK POLYTECHNIC
          </span>
        </span>
      </div>
    </div>
  </div>
);

export default TranscriptFooter;
