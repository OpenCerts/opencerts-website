import React from "react";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import MainPageContainer from "../src/components/MainPageContainer";

const VerifierPage = () => (
  <>
    <NavigationBar active="home" />
    <MainPageContainer />
    <FooterBar />
  </>
);

export default connect()(VerifierPage);
