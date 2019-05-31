import PropTypes from "prop-types";
import CertificateHeader from "../common/certificateHeader";
import CertificateBody from "../common/certificateBody";
import CertificateFooter from "../common/certificateFooter";
import {
  IMG_LOGO_SINGAPORE_POLICE_FORCE,
  IMG_LOGO_CERTIS_CISCO,
  IMG_LOGO_AUXILIARY_POLICE_FORCE
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

          .supporter-logos .singapore-police-force{
            width:95%;
            margin-top:1em;
          }

          .supporter-logos .certis-cisco{
            width:90%;
            margin-top: 1em;
          }

          .supporter-logos .auxiliary-police-force {
            width:80%;
            margin-top:0;
          }
        `}
      </style>

      <div className="col-12 supporters-paragraph">
        The programme is supported by
      </div>

      <div className="row col-12 supporter-logos">
        <div className="col-3">
          <img
            src={IMG_LOGO_SINGAPORE_POLICE_FORCE}
            className="singapore-police-force"
            title="Singapore Police Force"
          />
        </div>
        <div className="col-3">
          <img 
            src={IMG_LOGO_CERTIS_CISCO} 
            className="certis-cisco"
            title="Certis"
          />
        </div>
        <div className="col-2">
          <img
            src={IMG_LOGO_AUXILIARY_POLICE_FORCE}
            className="auxiliary-police-force"
            title="Auxiliary Police Force"
          />
        </div>
        <div className="col-4" />
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
