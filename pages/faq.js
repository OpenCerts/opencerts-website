import { connect } from "react-redux";
import Meta from "../src/components/Layout/Meta";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import FaqContent from "../src/components/FAQ/FaqContent";

const FaqPage = () => (
  <div>
    <Meta />
    <NavigationBar active="faq" />
    <FaqContent />
    <FooterBar />
  </div>
);

export default connect()(FaqPage);
