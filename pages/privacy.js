import { connect } from "react-redux";
import Meta from "../src/components/Layout/Meta";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import PrivacyContent from "../src/components/Privacy";

const PrivacyPage = () => (
  <div>
    <Meta />
    <NavigationBar active="privacy" />
    <PrivacyContent />
    <FooterBar />
  </div>
);

export default connect()(PrivacyPage);
