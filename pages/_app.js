import withRedux from "next-redux-wrapper";
import App, { Container } from "next/app";
import Router from "next/router";
import withGA from "next-ga";
import React from "react";
import { Provider } from "react-redux";
import initStore from "../src/store";
import { GA_ID } from "../src/config";

class MyApp extends App {
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
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

const appWrappedWithGA = withGA(GA_ID, Router)(MyApp);
export default withRedux(initStore)(appWrappedWithGA);
