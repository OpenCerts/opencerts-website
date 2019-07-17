import React from "react";
import NextSeo from "next-seo";
import { merge } from "lodash/fp";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import TermsOfUse from "../src/components/TermsOfUse";
import { URL, DEFAULT_SEO } from "../src/config";

const PAGE_SEO = {
  title: "Terms of use",
  description:
    'These Terms of Use govern your access to and use of our services, including the application (whether as software or as a website or otherwise), its contents, push notifications and all other accompanying materials as identified in the Schedule below (collectively, the "Service").',
  openGraph: {
    title: "OpenCerts - Terms of use",
    description:
      'These Terms of Use govern your access to and use of our services, including the application (whether as software or as a website or otherwise), its contents, push notifications and all other accompanying materials as identified in the Schedule below (collectively, the "Service").',
    url: `${URL}/tou`
  }
};

const PrivacyPage = () => (
  <>
    <NextSeo config={merge(DEFAULT_SEO, PAGE_SEO)} />
    <NavigationBar active="tou" />
    <TermsOfUse />
    <FooterBar />
  </>
);

export default connect()(PrivacyPage);
