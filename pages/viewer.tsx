import React from "react";
import { connect } from "react-redux";
import FooterBar from "../src/components/Layout/FooterBar";
import NavigationBar from "../src/components/Layout/NavigationBar";
import { ViewerContainer } from "../src/components/ViewerPageContainer";

const ViewerPage: React.FunctionComponent = () => (
  <>
    <NavigationBar />
    <ViewerContainer />
    <FooterBar />
  </>
);

export default connect()(ViewerPage);
