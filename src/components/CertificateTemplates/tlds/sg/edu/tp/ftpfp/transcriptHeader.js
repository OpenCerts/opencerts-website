import { IMG_LOGO_TP } from "../common/images";

const TranscriptHeader = () => (
  <div className="container">
    <style>
      {`
      .tp-logo {
        padding-top:1em;
        width:80%;
      }

      .page-title {
        font-weight:bold;
        font-size:1.5em;
        padding-top:3em;
        text-align:right;
      }
      `}
    </style>
    <br />
    <br />
    <div className="row">
      <div className="col-4">
        <img src={IMG_LOGO_TP} className="tp-logo" />
      </div>
      <div className="col-8 page-title">
        Polytechnic Foundation Programme
        <br />
        STATEMENT OF EXAMINATION RESULTS
      </div>
    </div>

    <br />
    <br />
  </div>
);

export default TranscriptHeader;
