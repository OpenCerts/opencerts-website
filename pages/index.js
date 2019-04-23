import React from "react";
import { connect } from "react-redux";
import NextSeo from "next-seo";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import MainPageContainer from "../src/components/MainPageContainer";

import { SEO } from "../src/config";

const VerifierPage = () => (
  <React.Fragment>
    <NextSeo config={SEO} />
    <NavigationBar active="home" />
    <MainPageContainer />
    <FooterBar />
  </React.Fragment>
);

export default connect()(VerifierPage);
