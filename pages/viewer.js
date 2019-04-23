import React from "react";
import { connect } from "react-redux";
import Head from "next/head";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import ViewerPageContainer from "../src/components/ViewerPageContainer";
import PrintWatermark from "../src/components/PrintWatermark";

const VerifierPage = () => (
  <React.Fragment>
    <Head>
      <title>OpenCerts - Certificate Viewer</title>
    </Head>
    <PrintWatermark />
    <NavigationBar />
    <ViewerPageContainer />
    <FooterBar />
  </React.Fragment>
);

export default connect()(VerifierPage);
