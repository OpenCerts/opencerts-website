import PropTypes from "prop-types";
import AboutSection from "./ContentPage/AboutSection";
import DropZoneSection from "./ContentPage/DropZoneSection";
import PartnerSection from "./ContentPage/PartnersSection";

const MainContent = ({ handleCertificateChange }) => (
  <div className="container-fluid">
    <DropZoneSection handleCertificateChange={handleCertificateChange} />
    <AboutSection />
    <PartnerSection />
  </div>
);

MainContent.propTypes = {
  handleCertificateChange: PropTypes.func
};

export default MainContent;
