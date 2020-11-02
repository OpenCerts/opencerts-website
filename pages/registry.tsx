import { NextSeo } from "next-seo";
import React from "react";
import { connect } from "react-redux";
import { Wrapper, Main } from "../src/components/Layout/Body";
import { FooterBar } from "../src/components/Layout/FooterBar";
import { NavigationBar } from "../src/components/Layout/NavigationBar";
import { RegistryPage as RegistryPageContainer } from "../src/components/RegistryPageContainer";
import { URL } from "../src/config";

const PAGE_SEO = {
  title: "Registry",
  description:
    "The registry is a list of recognised issuers with their certificate store addresses. Certificates from these issuers can be recognised and verified by our viewer.",
  openGraph: {
    title: "OpenCerts - Registry",
    description:
      "The registry is a list of recognised issuers with their certificate store addresses. Certificates from these issuers can be recognised and verified by our viewer.",
    url: `${URL}/registry`,
  },
};

const RegistryPage: React.FunctionComponent = () => (
  <>
    <NextSeo {...PAGE_SEO} />
    <Wrapper>
      <NavigationBar />
      <Main>
        <RegistryPageContainer />
      </Main>
      <FooterBar />
    </Wrapper>
  </>
);

export default connect()(RegistryPage);
