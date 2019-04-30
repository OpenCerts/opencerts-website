import React from "react";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import FaqContent from "../src/components/FAQ/FaqContent";

const FaqPage = () => (
  <>
    <NavigationBar active="faq" />
    <FaqContent />
    <FooterBar />
  </>
);

export default connect()(FaqPage);
