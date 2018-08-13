import withRedux from "next-redux-wrapper";
import initStore from "../store";
import Meta from "../components/Meta";
// import CertificateVerifierContainer from "../components/CertificateVerifierContainer";
import NavigationBar from "../components/NavigationBar";
import FooterBar from "../components/FooterBar";
import MainPageContainer from "../components/MainPageContainer";

const VerifierPage = props => (
  <div className="fill">
    <Meta />
    <NavigationBar />
    <MainPageContainer {...props} />
    <FooterBar />
  </div>
);

export default withRedux(initStore)(VerifierPage);

// <CertificateVerifierContainer {...props} />
