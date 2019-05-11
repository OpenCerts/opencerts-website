import React from "react";
import NextSeo from "next-seo";
import { merge } from "lodash/fp";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import PrivacyContent from "../src/components/Privacy";
import { URL, DEFAULT_SEO } from "../src/config";

const PAGE_SEO = {
  title: "Privacy Policy",
  description:
    "This is a Government Agency digital service that may use “cookies”, where a small data file is sent to your browser to store and track information about you when you enter our websites.",
  openGraph: {
    title: "OpenCerts - Privacy Policy",
    description:
      "This is a Government Agency digital service that may use “cookies”, where a small data file is sent to your browser to store and track information about you when you enter our websites.",
    url: `${URL}/privacy`
  }
};

const PrivacyPage = () => (
  <>
    <NextSeo config={merge(DEFAULT_SEO, PAGE_SEO)} />
    <NavigationBar active="privacy" />
    <PrivacyContent />
    <FooterBar />
  </>
);

export default connect()(PrivacyPage);
