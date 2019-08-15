import React from "react";
import NextSeo from "next-seo";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import ViewerPageContainer from "../src/components/ViewerPageContainer";
import PrintWatermark from "../src/components/PrintWatermark";
import { DEFAULT_SEO } from "../src/config";
import { isWatermarkFeatureActive } from "../src/config/feature-config";

const VerifierPage = () => (
  <>
    <NextSeo config={DEFAULT_SEO} />
    {isWatermarkFeatureActive && <PrintWatermark />}
    <NavigationBar />
    <ViewerPageContainer />
    <FooterBar />
  </>
);

export default connect()(VerifierPage);
