import { NextSeo } from "next-seo";
import React from "react";
import { connect } from "react-redux";
import { Wrapper, Main } from "../src/components/Layout/Body";
import { FooterBar } from "../src/components/Layout/FooterBar";
import { NavigationBar } from "../src/components/Layout/NavigationBar";
import { PrivacyContent } from "../src/components/Privacy";
import { URL } from "../src/config";

const PAGE_SEO = {
  title: "Privacy Policy",
  description:
    "This Privacy Policy must be read in conjunction with the Terms of Use that accompany the applicable service you are requesting from us (the “Service”). In this Privacy Policy, “Public Sector Entities” means the Government (including its ministries, departments and organs of state) and public authorities (such as statutory boards).",
  openGraph: {
    title: "OpenCerts - Privacy Policy",
    description:
      "This Privacy Policy must be read in conjunction with the Terms of Use that accompany the applicable service you are requesting from us (the “Service”). In this Privacy Policy, “Public Sector Entities” means the Government (including its ministries, departments and organs of state) and public authorities (such as statutory boards).",
    url: `${URL}/privacy`,
  },
};

const PrivacyPage: React.FunctionComponent = () => (
  <>
    <NextSeo {...PAGE_SEO} />
    <Wrapper>
      <NavigationBar />
      <Main>
        <PrivacyContent />
      </Main>
      <FooterBar />
    </Wrapper>
  </>
);

export default connect()(PrivacyPage);
