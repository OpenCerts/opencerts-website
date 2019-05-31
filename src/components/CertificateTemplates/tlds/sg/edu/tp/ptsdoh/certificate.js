import PropTypes from "prop-types";
import CertificateHeader from "../common/certificateHeader";
import CertificateBody from "../common/certificateBody";
import CertificateFooter from "../common/certificateFooter";
import {
  IMG_LOGO_MOH,
  IMG_LOGO_NEA,
  IMG_LOGO_NPARK,
  IMG_LOGO_SFA
} from "../common/images";

const Certificate = ({ certificate }) => {
  const supporters = () => (
    <div>
      <style>
        {`

          .supporters-paragraph{
            font-style: italic;
            font-family: "Times New Roman", Times, serif;
          }

          .supporter-logos {
            margin-top:1em;
            margin-bottom:3em;
          }

          .supporter-logos .moh{
            width:90%;
            margin-top:0.8em;
          }

          .supporter-logos .nea{
            width:85%;
            margin-top: 0.4em;
          }

          .supporter-logos .npark {
            width:80%;
            margin-top:0;
          }

          .supporter-logos .sfa {
            width:80%;
            margin-top:0;
          }
        `}
      </style>

      <div className="col-12 supporters-paragraph">
        The programme is supported by
      </div>

      <div className="row col-12 supporter-logos">
        <div className="col-2">
          <img src={IMG_LOGO_MOH} className="moh" title="Ministry of Health" />
        </div>
        <div className="col-3">
          <img
            src={IMG_LOGO_NEA}
            className="nea"
            title="National Environment Agency"
          />
        </div>
        <div className="col-2">
          <img src={IMG_LOGO_NPARK} className="npark" title="National Parks" />
        </div>
        <div className="col-3">
          <img
            src={IMG_LOGO_SFA}
            className="sfa"
            title="Singapore Food Agency"
          />
        </div>
        <div className="col-2" />
      </div>
    </div>
  );

  return (
    <div className="container">
      <CertificateHeader />
      <CertificateBody certificate={certificate} />
      <CertificateFooter />
      {supporters()}
    </div>
  );
};

Certificate.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Certificate;
