import { IMG_LOGO_TP } from "./images";

const CertificateHeader = () => (
  <div className="container">
    <style>
      {`
      .tp-logo {
        padding-top:3em;
        float:right;
        width:30%;
      }
      `}
    </style>

    <div className="row">
      <div className="col-12">
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
