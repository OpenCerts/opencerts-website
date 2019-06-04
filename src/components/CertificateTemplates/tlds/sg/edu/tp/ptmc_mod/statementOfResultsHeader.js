import { IMG_LOGO_TP } from "../common/images";

const StatementOfResultsHeader = () => (
  <div className="container">
    <style>
      {`
      .tp-logo {
        padding-top:1em;
        width:40%;
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
        <img src={IMG_LOGO_TP} className="tp-logo" />
      </div>
      <div className="col-5 page-title">STATEMENT OF RESULTS</div>
    </div>

    <br />
    <br />
  </div>
);

export default StatementOfResultsHeader;
