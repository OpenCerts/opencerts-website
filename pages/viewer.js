import React from "react";
import { connect } from "react-redux";
import NextSeo from "next-seo";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import ViewerPageContainer from "../src/components/ViewerPageContainer";
import PrintWatermark from "../src/components/PrintWatermark";

import { SEO } from "../src/config";

const VerifierPage = () => (
  <>
    <NextSeo config={SEO} />
    <PrintWatermark />
    <NavigationBar />
    <ViewerPageContainer />
    <FooterBar />
  </>
);

export default connect()(VerifierPage);
