import withRedux from "next-redux-wrapper";
import initStore from "../src/store";
import Meta from "../src/components/Layout/Meta";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import RegistryPageContainer from "../src/components/RegistryPageContainer";

const RegistryPage = () => (
  <div>
    <Meta />
    <NavigationBar active="registry" />
    <RegistryPageContainer />
    <FooterBar />
  </div>
);

export default withRedux(initStore)(RegistryPage);
