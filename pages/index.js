import { connect } from "react-redux";
import Head from "next/head";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import MainPageContainer from "../src/components/MainPageContainer";

const VerifierPage = () => (
  <div>
    <Head>
      <title>
        OpenCerts - An easy way to check and verify your certificates
      </title>
    </Head>
    <NavigationBar active="home" />
    <MainPageContainer />
    <FooterBar />
  </div>
);

export default connect()(VerifierPage);
