import withRedux from "next-redux-wrapper";
import initStore from "../src/store";
import Meta from "../src/components/Layout/Meta";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import ViewerPageContainer from "../src/components/ViewerPageContainer";
import PrintWatermark from "../src/components/PrintWatermark";

const VerifierPage = () => (
  <div>
    <Meta />
    <PrintWatermark />
    <NavigationBar />
    <ViewerPageContainer />
    <FooterBar />
  </div>
);

export default withRedux(initStore)(VerifierPage);
