import NextSeo from "next-seo";
import { merge } from "lodash/fp";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import CollaboratePageContainer from "../src/components/CollaboratePageContainer";
import { URL, DEFAULT_SEO } from "../src/config";

const PAGE_SEO = {
  title: "Collaborate",
  description:
    "OpenCerts has partnered with key companies to help you issue and distribute certificates easily.",
  openGraph: {
    title: "OpenCerts - Collaborate",
    description:
      "OpenCerts has partnered with key companies to help you issue and distribute certificates easily.",
    url: `${URL}/registry`
  }
};

const CollaboratePage = () => (
  <>
    <NextSeo config={merge(DEFAULT_SEO, PAGE_SEO)} />
    <NavigationBar active="collaborate" />
    <CollaboratePageContainer />
    <FooterBar />
  </>
);

export default connect()(CollaboratePage);
