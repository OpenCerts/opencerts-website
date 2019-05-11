import React from "react";
import NextSeo from "next-seo";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import MainPageContainer from "../src/components/MainPageContainer";
import { DEFAULT_SEO } from "../src/config";

const VerifierPage = () => (
  <>
    <NextSeo config={DEFAULT_SEO} />
    <NavigationBar active="home" />
    <MainPageContainer />
    <FooterBar />
  </>
);

export default connect()(VerifierPage);
