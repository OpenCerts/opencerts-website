import AboutSection from "./HomePageContent/AboutSection";
import DropZoneSection from "./HomePageContent/DropZoneSection";
import PartnerSection from "./HomePageContent/PartnersSection";

const MainPageContainer = () => (
  <div
    className="container-fluid"
    style={{ fontFamily: "sans-serif", fontWeight: 100 }}
  >
    <DropZoneSection />
    <AboutSection />
    <PartnerSection />
  </div>
);

export default MainPageContainer;
