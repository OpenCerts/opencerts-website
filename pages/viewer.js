import withRedux from "next-redux-wrapper";
import initStore from "../store";
import Meta from "../components/Meta";
// import CertificateVerifierContainer from "../components/CertificateVerifierContainer";
import NavigationBar from "../components/NavigationBar";
import FooterBar from "../components/FooterBar";
import ViewerPageContainer from "../components/ViewerPageContainer";

const VerifierPage = props => (
  <div>
    <Meta />
    <NavigationBar />
    <ViewerPageContainer {...props} />
    <FooterBar />
  </div>
);

export default withRedux(initStore)(VerifierPage);

// <CertificateVerifierContainer {...props} />
