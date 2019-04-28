import { IMG_LOGO_TP, IMG_LOGO_NIEC } from "../common/images";

const TranscriptHeader = () => (
  <div className="container">
    <style>
      {`
      .niec-logo {
        padding-top:1em;
        float:left;
        width: 20%;
      }

      .tp-logo {
        padding-top:1.2em;
        float:right;
        width:25%;
      }
      
      .page-title {
        font-weight:bold;
        font-size:1.5em;
        padding-top:3em;
        text-align:center;
      }
      `}
    </style>
    <br />
    <br />
    <div className="row">
      <div className="col-12">
        <img src={IMG_LOGO_NIEC} className="niec-logo" />
        <img src={IMG_LOGO_TP} className="tp-logo" />
      </div>
    </div>
    <div className="row">
      <div className="col-12 page-title">ACADEMIC TRANSCRIPT</div>
    </div>

    <br />
    <br />
  </div>
);

export default TranscriptHeader;
