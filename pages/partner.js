import NextSeo from "next-seo";
import { merge } from "lodash/fp";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import PartnerPageContainer from "../src/components/PartnerPageContainer";
import { URL, DEFAULT_SEO } from "../src/config";

const PAGE_SEO = {
  title: "Partners",
  description:
    "We work closely with these partners to provide a better certificate system for all.",
  openGraph: {
    title: "OpenCerts - Partners",
    description:
      "We work closely with these partners to provide a better certificate system for all.",
    url: `${URL}/registry`
  }
};

const PartnerPage = () => (
  <>
    <NextSeo config={merge(DEFAULT_SEO, PAGE_SEO)} />
    <NavigationBar active="registry" />
    <PartnerPageContainer />
    <FooterBar />
  </>
);

export default connect()(PartnerPage);
