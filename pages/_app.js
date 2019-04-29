import withRedux from "next-redux-wrapper";
import App, { Container } from "next/app";
import Router from "next/router";
import NextSeo from "next-seo";
import withGA from "next-ga";
import { merge } from "lodash/fp";
import React from "react";
import { Provider } from "react-redux";
import initStore from "../src/store";
import { GA_ID, DEFAULT_SEO } from "../src/config";

const ALL_SEO_CONFIG = {
  faq: {
    title: "Frequently Asked Questions",
    description:
      "Have some questions in mind? Here are a list of collated questions and answers that might answer your questions.",
    openGraph: {
      title: "OpenCerts - Frequently Asked Questions",
      description:
        "Have some questions in mind? Here are a list of collated questions and answers that might answer your questions.",
      url: "https://opencerts.io/faq"
    }
  },
  registry: {
    title: "Registry",
    description:
      "The registry is a list of recognised issuers with their certificate store addresses. Certificates from these issuers can be recognised and verified by our viewer.",
    openGraph: {
      title: "OpenCerts - Registry",
      description:
        "The registry is a list of recognised issuers with their certificate store addresses. Certificates from these issuers can be recognised and verified by our viewer.",
      url: "https://opencerts.io/registry"
    }
  },
  privacy: {
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
  viewer: DEFAULT_SEO
};

class MyApp extends App {
  getSEOConfig = path => {
    let SEO_CONFIG = DEFAULT_SEO;
    const currentRoute = path.substr(1, path.length);
    if (currentRoute !== "") {
      SEO_CONFIG = merge({}, ALL_SEO_CONFIG[currentRoute], DEFAULT_SEO);
    }
    return SEO_CONFIG;
  };

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <>
            <NextSeo config={this.getSEOConfig(this.props.router.route)} />
            <Component {...pageProps} />
          </>
        </Provider>
      </Container>
    );
  }
}

const appWrappedWithGA = withGA(GA_ID, Router)(MyApp);
export default withRedux(initStore)(appWrappedWithGA);
