import React from "react";
import { connect } from "react-redux";
import NextSeo from "next-seo";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import FaqContent from "../src/components/FAQ/FaqContent";

import { SEO } from "../src/config";

export const FAQ_SEO = {
  ...SEO,
  title: "Frequently Asked Questions",
  description:
    "Have some questions in mind? Here are a list of collated questions and answers that might answer your questions.",
  openGraph: {
    ...SEO.openGraph,
    title: "OpenCerts - Frequently Asked Questions",
    description:
      "Have some questions in mind? Here are a list of collated questions and answers that might answer your questions.",
    url: "https://opencerts.io/faq"
  }
};

const FaqPage = () => (
  <React.Fragment>
    <NextSeo config={FAQ_SEO} />
    <NavigationBar active="faq" />
    <FaqContent />
    <FooterBar />
  </React.Fragment>
);

export default connect()(FaqPage);
