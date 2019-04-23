const TranscriptHeader = () => (
  <div className="container">
    <style>
      {`
      .tp-logo {
        padding-top:1em;
      }
      
      .page-title {
        font-weight:bold;
        font-size:1.5em;
        padding-top:3em;
      }
      `}
    </style>
    <br />
    <br />
    <div className="row">
      <div className="col-7">
        <img src="/static/images/TP_logo.svg" className="tp-logo" />
      </div>
      <div className="col-5 page-title">ACADEMIC TRANSCRIPT</div>
    </div>

    <br />
    <br />
  </div>
);

export default TranscriptHeader;
