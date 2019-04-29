import withRedux from "next-redux-wrapper";
import App, { Container } from "next/app";
import Router from "next/router";
import NextSeo from "next-seo";
import withGA from "next-ga";
import { merge } from "lodash/fp";
import React from "react";
import { Provider } from "react-redux";
import initStore from "../src/store";
import { GA_ID, SEO } from "../src/config";

class MyApp extends App {
  getSEOConfig = path => {
    let SEO_CONFIG = SEO.default;
    const currentRoute = path.substr(1, path.length);
    if (currentRoute !== "" && SEO[currentRoute]) {
      SEO_CONFIG = merge({}, SEO[currentRoute], SEO.default);
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
