import { connect } from "react-redux";
import NextSeo from "next-seo";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import RegistryPageContainer from "../src/components/RegistryPageContainer";
import { SEO } from "../src/config";

const _ = require("lodash");

_.merge(SEO, {
  title: "Registry",
  description:
    "The registry is a list of recognised issuers with their certificate store addresses. Certificates from these issuers can be recognised and verified by our viewer.",
  openGraph: {
    title: "OpenCerts - Registry",
    description:
      "The registry is a list of recognised issuers with their certificate store addresses. Certificates from these issuers can be recognised and verified by our viewer.",
    url: "https://opencerts.io/registry"
  }
});

const RegistryPage = () => (
  <>
    <NextSeo config={SEO} />
    <NavigationBar active="registry" />
    <RegistryPageContainer />
    <FooterBar />
  </>
);

export default connect()(RegistryPage);
