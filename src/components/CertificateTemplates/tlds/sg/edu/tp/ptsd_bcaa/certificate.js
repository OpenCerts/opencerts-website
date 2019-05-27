import PropTypes from "prop-types";
import CertificateHeader from "../common/certificateHeader";
import CertificateBody from "../common/certificateBody";
import CertificateFooter from "../common/certificateFooter";
import CertificateSupporter from "../common/certificateSupporter";
import { IMG_LOGO_BCAA } from "../common/images";

const Certificate = ({ certificate }) => {
  const supporter = {
    logo: IMG_LOGO_BCAA,
    logoStyle: "bcaa-logo"
  };

  return (
    <div className="container">
      <style>
        {`
          .bcaa-logo {
            width: 98%;
            margin-top: 0em;
          }
        `}
      </style>
      <CertificateHeader />
      <CertificateBody certificate={certificate} />
      <CertificateFooter />
      <CertificateSupporter supporter={supporter} />
    </div>
  );
};

Certificate.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default Certificate;
