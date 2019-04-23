import React from "react";
import { connect } from "react-redux";
import NextSeo from "next-seo";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import PrivacyContent from "../src/components/Privacy";

import { SEO } from "../src/config";

const _ = require("lodash");

_.merge(SEO, {
  title: "Privacy Policy",
  description:
    "This is a Government Agency digital service that may use “cookies”, where a small data file is sent to your browser to store and track information about you when you enter our websites.",
  openGraph: {
    title: "OpenCerts - Privacy Policy",
    description:
      "This is a Government Agency digital service that may use “cookies”, where a small data file is sent to your browser to store and track information about you when you enter our websites.",
    url: "https://opencerts.io/privacy"
  }
});

const PrivacyPage = () => (
  <>
    <NextSeo config={SEO} />
    <NavigationBar active="privacy" />
    <PrivacyContent />
    <FooterBar />
  </>
);

export default connect()(PrivacyPage);
