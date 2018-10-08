import { connect } from "react-redux";
import Meta from "../src/components/Layout/Meta";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import MainPageContainer from "../src/components/MainPageContainer";

const VerifierPage = () => (
  <div>
    <Meta />
    <NavigationBar active="home" />
    <MainPageContainer />
    <FooterBar />
  </div>
);

export default connect()(VerifierPage);
