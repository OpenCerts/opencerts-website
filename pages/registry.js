import { connect } from "react-redux";
import Head from "next/head";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import RegistryPageContainer from "../src/components/RegistryPageContainer";

const RegistryPage = () => (
  <div>
    <Head>
      <title>OpenCerts - Registry</title>
    </Head>
    <NavigationBar active="registry" />
    <RegistryPageContainer />
    <FooterBar />
  </div>
);

export default connect()(RegistryPage);
