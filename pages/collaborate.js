import { NextSeo } from "next-seo";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import CollaboratePageContainer from "../src/components/Collaborate/CollaboratePageContainer";
import { URL } from "../src/config";

const PAGE_SEO = {
  title: "Collaborate",
  description:
    "If you are from an institution and would like to get started on OpenCerts, here are some companies that can help to issue your certificates.",
  openGraph: {
    title: "OpenCerts - Collaborate",
    description:
      "If you are from an institution and would like to get started on OpenCerts, here are some companies that can help to issue your certificates.",
    url: `${URL}/collaborate`
  }
};

const CollaboratePage = () => (
  <>
    <NextSeo {...PAGE_SEO} />
    <NavigationBar active="collaborate" />
    <CollaboratePageContainer />
    <FooterBar />
  </>
);

export default connect()(CollaboratePage);
