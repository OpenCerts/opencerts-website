import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import FooterBar from "../src/components/Layout/FooterBar";
import NavigationBar from "../src/components/Layout/NavigationBar";
import { ViewerContainer } from "../src/components/ViewerPageContainer";

const ViewerPage = (props) => (
  <>
    <NavigationBar />
    <ViewerContainer document={props.document} />
    <FooterBar />
  </>
);

export default connect()(ViewerPage);

ViewerPage.propTypes = {
  document: PropTypes.object,
};
