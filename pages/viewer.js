import React from "react";
import PropTypes from "prop-types";
import NextSeo from "next-seo";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import ViewerPageContainer from "../src/components/ViewerPageContainer";
import PrintWatermark from "../src/components/PrintWatermark";
import { DEFAULT_SEO } from "../src/config";

const VerifierPage = props => (
  <>
    <NextSeo config={DEFAULT_SEO} />
    <PrintWatermark />
    <NavigationBar />
    <ViewerPageContainer document={props.document} />
    <FooterBar />
  </>
);

export default connect()(VerifierPage);

VerifierPage.propTypes = {
  document: PropTypes.object
};
