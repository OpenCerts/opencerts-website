import React from "react";
import { AboutSection } from "./HomePageContent/AboutSection";
import { DropZoneSectionContainer } from "./HomePageContent/DropZoneSection";
import { PartnerSection } from "./HomePageContent/PartnersSection";

export const MainPageContainer: React.FunctionComponent = () => (
  <div className="container-fluid">
    <DropZoneSectionContainer />
    <PartnerSection />
    <AboutSection />
  </div>
);
