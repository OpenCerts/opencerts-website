import { connect } from "react-redux";
import Head from "next/head";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import FaqContent from "../src/components/FAQ/FaqContent";

const FaqPage = () => (
  <div>
    <Head>
      <title>OpenCerts - FAQ</title>
    </Head>
    <NavigationBar active="faq" />
    <FaqContent />
    <FooterBar />
  </div>
);

export default connect()(FaqPage);
