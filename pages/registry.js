import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import RegistryPageContainer from "../src/components/RegistryPageContainer";

const RegistryPage = () => (
  <>
    <NavigationBar active="registry" />
    <RegistryPageContainer />
    <FooterBar />
  </>
);

export default connect()(RegistryPage);
