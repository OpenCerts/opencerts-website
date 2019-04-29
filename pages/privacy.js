import React from "react";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import PrivacyContent from "../src/components/Privacy";

const PrivacyPage = () => (
  <>
    <NavigationBar active="privacy" />
    <PrivacyContent />
    <FooterBar />
  </>
);

export default connect()(PrivacyPage);
