import { IMG_LOGO_TP, IMG_LOGO_NP } from "../common/images";

const CertificateHeader = () => (
  <div className="container">
    <style>
      {`
        .tp-logo {
          padding-top:3.5em;
          float:left;
          width:30%;
        }

        .np-logo {
          padding-top:3em;
          float:right;
          width: 36%;
        }
      `}
    </style>

    <div className="row">
      <div className="col-12">
        <img src={IMG_LOGO_TP} className="tp-logo" />
        <img src={IMG_LOGO_NP} className="np-logo" />
      </div>
    </div>
  </div>
);

export default CertificateHeader;
