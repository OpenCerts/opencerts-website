import NextSeo from "next-seo";
import { merge } from "lodash/fp";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import { DEFAULT_SEO, URL } from "../src/config";
import { CollaboratorsTerms } from "../src/components/Collaborate/CollaboratorsTerms";

const PAGE_SEO = {
  title: "Terms of use for collaborators",
  description:
    "These Terms of Use govern your way of collaborating on opencers",
  openGraph: {
    title: "OpenCerts - Collaborators terms of use",
    description:
      "These Terms of Use govern your way of collaborating on opencerts",
    url: `${URL}/collaborators-terms`
  }
};

const CollaboratorsTermsPage = () => (
  <>
    <NextSeo config={merge(DEFAULT_SEO, PAGE_SEO)} />
    <NavigationBar />
    <CollaboratorsTerms />
    <FooterBar />
  </>
);

export default CollaboratorsTermsPage;
