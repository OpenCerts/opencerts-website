import withRedux from "next-redux-wrapper";
import initStore from "../store";
import Meta from "../components/Layout/Meta";
import NavigationBar from "../components/Layout/NavigationBar";
import FooterBar from "../components/Layout/FooterBar";
import RegistryPageContainer from "../components/RegistryPageContainer";

const RegistryPage = () => (
  <div>
    <Meta />
    <NavigationBar active="registry" />
    <RegistryPageContainer />
    <FooterBar />
  </div>
);

export default withRedux(initStore)(RegistryPage);
