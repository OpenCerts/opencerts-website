import { connect } from "react-redux";
import Head from "next/head";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import PrivacyContent from "../src/components/Privacy";

const PrivacyPage = () => (
  <div>
    <Head>
      <title>OpenCerts - Privacy Policy</title>
    </Head>
    <NavigationBar active="privacy" />
    <PrivacyContent />
    <FooterBar />
  </div>
);

export default connect()(PrivacyPage);
