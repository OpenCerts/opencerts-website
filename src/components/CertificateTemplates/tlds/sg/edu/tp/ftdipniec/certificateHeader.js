import { IMG_LOGO_TP, IMG_LOGO_NIEC } from "../common/images";

const CertificateHeader = () => (
  <div className="container">
    <style>
      {`
      .niec-logo {
        padding-top:3em;
        float:left;
        width: 25%;
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
        <img
          src={IMG_LOGO_NIEC}
          className="niec-logo"
          title="National Institute of Early Childhood Development"
        />
        <img
          src={IMG_LOGO_TP}
          className="tp-logo"
          title="Temasek Polytechnic"
        />
      </div>
    </div>
  </div>
);

export default CertificateHeader;
