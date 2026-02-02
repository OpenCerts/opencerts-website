import { NextSeo } from "next-seo";
import React from "react";
import { connect } from "react-redux";
import { CollaboratorTermsContent } from "../src/components/Collaborate/CollaboratorTermsContent";
import { Wrapper, Main } from "../src/components/Layout/Body";
import { FooterBar } from "../src/components/Layout/FooterBar";
import { NavigationBar } from "../src/components/Layout/NavigationBar";
import { URL } from "../src/config";

const PAGE_SEO = {
  title: "Collaborator Terms and Conditions",
  description:
    "Notice (administrative change): With effect from [01 Oct 2025], the OpenCerts Collaborator programme is administered by the Info-communications Media Development Authority (\"IMDA\"). These Collaborator Terms explain how to request listing and the obligations of the Collaboration.",
  openGraph: {
    title: "OpenCerts - Collaborator Terms and Conditions",
    description:
      "Notice (administrative change): With effect from [01 Oct 2025], the OpenCerts Collaborator programme is administered by the Info-communications Media Development Authority (\"IMDA\"). These Collaborator Terms explain how to request listing and the obligations of the Collaboration.",
    url: `${URL}/collaborator`,
  },
};

const CollaboratorTermsPage: React.FunctionComponent = () => (
  <>
    <NextSeo {...PAGE_SEO} />
    <Wrapper>
      <NavigationBar />
      <Main>
        <CollaboratorTermsContent />
      </Main>
      <FooterBar />
    </Wrapper>
  </>
);

export default connect()(CollaboratorTermsPage);
