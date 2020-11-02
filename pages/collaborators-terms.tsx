import { NextSeo } from "next-seo";
import React from "react";
import { CollaboratorsTerms } from "../src/components/Collaborate/CollaboratorsTerms";
import { Wrapper, Main } from "../src/components/Layout/Body";
import { FooterBar } from "../src/components/Layout/FooterBar";
import { NavigationBar } from "../src/components/Layout/NavigationBar";
import { URL } from "../src/config";

const PAGE_SEO = {
  title: "Terms of use for collaborators",
  description: "These Terms of Use govern your way of collaborating on opencerts",
  openGraph: {
    title: "OpenCerts - Collaborators terms of use",
    description: "These Terms of Use govern your way of collaborating on opencerts",
    url: `${URL}/collaborators-terms`,
  },
};

const CollaboratorsTermsPage: React.FunctionComponent = () => (
  <>
    <NextSeo {...PAGE_SEO} />
    <Wrapper>
      <NavigationBar />
      <Main>
        <CollaboratorsTerms />
      </Main>
      <FooterBar />
    </Wrapper>
  </>
);

export default CollaboratorsTermsPage;
