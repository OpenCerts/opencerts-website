import React from "react";
import { connect } from "react-redux";
import { merge } from "lodash/fp";
import NextSeo from "next-seo";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import PrivacyContent from "../src/components/Privacy";

import { DEFAULT_SEO } from "../src/config";

const SEO = merge(
  {},
  {
    title: "Privacy Policy",
    description:
      "This is a Government Agency digital service that may use “cookies”, where a small data file is sent to your browser to store and track information about you when you enter our websites.",
    openGraph: {
      title: "OpenCerts - Privacy Policy",
      description:
        "This is a Government Agency digital service that may use “cookies”, where a small data file is sent to your browser to store and track information about you when you enter our websites.",
      url: "https://opencerts.io/privacy"
    }
  },
  DEFAULT_SEO
);

const PrivacyPage = () => (
  <>
    <NextSeo config={SEO} />
    <NavigationBar active="privacy" />
    <PrivacyContent />
    <FooterBar />
  </>
);

export default connect()(PrivacyPage);
