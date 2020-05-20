import { NextSeo } from "next-seo";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import RegistryPageContainer from "../src/components/RegistryPageContainer";
import { URL } from "../src/config";

const PAGE_SEO = {
  title: "Registry",
  description:
    "The registry is a list of recognised issuers with their certificate store addresses. Certificates from these issuers can be recognised and verified by our viewer.",
  openGraph: {
    title: "OpenCerts - Registry",
    description:
      "The registry is a list of recognised issuers with their certificate store addresses. Certificates from these issuers can be recognised and verified by our viewer.",
    url: `${URL}/registry`,
  },
};

const RegistryPage = () => (
  <>
    <NextSeo {...PAGE_SEO} />
    <NavigationBar active="registry" />
    <RegistryPageContainer />
    <FooterBar />
  </>
);

export default connect()(RegistryPage);
