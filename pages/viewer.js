import React from "react";
import PropTypes from "prop-types";
import NextSeo from "next-seo";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import { ViewerContainer } from "../src/components/ViewerPageContainer";
import { DEFAULT_SEO } from "../src/config";

const ViewerPage = props => (
  <>
    <NextSeo config={DEFAULT_SEO} />
    <NavigationBar />
    <ViewerContainer document={props.document} />
    <FooterBar />
  </>
);

export default connect()(ViewerPage);

ViewerPage.propTypes = {
  document: PropTypes.object
};
