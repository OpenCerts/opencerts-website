import withRedux from "next-redux-wrapper";
import initStore from "../store";
import Meta from "../components/Layout/Meta";
import NavigationBar from "../components/Layout/NavigationBar";
import FooterBar from "../components/Layout/FooterBar";
import MainPageContainer from "../components/MainPageContainer";

const VerifierPage = () => (
  <div>
    <Meta />
    <NavigationBar active="home" />
    <MainPageContainer />
    <FooterBar />
  </div>
);

export default withRedux(initStore)(VerifierPage);
