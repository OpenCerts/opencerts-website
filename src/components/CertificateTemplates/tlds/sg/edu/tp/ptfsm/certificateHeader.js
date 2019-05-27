import { IMG_LOGO_TP, IMG_LOGO_SCDF } from "../common/images";

const CertificateHeader = () => (
  <div className="container">
    <style>
      {`
      .scdf-logo {
        padding-top:4em;
        float:left;
        width: 30%;
      }

      .tp-logo {
        padding-top:3.5em;
        float:right;
        width:30%;
      }
      `}
    </style>

    <div className="row">
      <div className="col-12">
        <img src={IMG_LOGO_SCDF} className="scdf-logo" />
        <img src={IMG_LOGO_TP} className="tp-logo" />
      </div>
    </div>
  </div>
);

export default CertificateHeader;
