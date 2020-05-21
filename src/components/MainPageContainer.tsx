import React from "react";
import AboutSection from "./HomePageContent/AboutSection";
import DropZoneSection from "./HomePageContent/DropZoneSection";
import PartnerSection from "./HomePageContent/PartnersSection";

const MainPageContainer: React.FunctionComponent = () => (
  <div className="container-fluid">
    <DropZoneSection />
    <PartnerSection />
    <AboutSection />
  </div>
);

export default MainPageContainer;
