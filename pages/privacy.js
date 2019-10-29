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
    "This Privacy Policy must be read in conjunction with the Terms of Use that accompany the applicable service you are requesting from us (the “Service”). In this Privacy Policy, “Public Sector Entities” means the Government (including its ministries, departments and organs of state) and public authorities (such as statutory boards).",
  openGraph: {
    title: "OpenCerts - Privacy Policy",
    description:
      "This Privacy Policy must be read in conjunction with the Terms of Use that accompany the applicable service you are requesting from us (the “Service”). In this Privacy Policy, “Public Sector Entities” means the Government (including its ministries, departments and organs of state) and public authorities (such as statutory boards).",
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
