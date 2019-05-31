import PropTypes from "prop-types";
import CertificateHeader from "../common/certificateHeader";
import CertificateBody from "../common/certificateBody";
import CertificateFooter from "../common/certificateFooter";
import CertificateSupporter from "../common/certificateSupporter";
import { IMG_LOGO_SMU } from "../common/images";

const Certificate = ({ certificate }) => {
  const supporter = {
    logo: IMG_LOGO_SMU,
    logoStyle: "smu-logo",
    logoTitle: "Singapore Management University"
  };

  return (
    <div className="container">
      <style>
        {`
          .smu-logo {
            width: 90%;
            margin-top: -1em;
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
