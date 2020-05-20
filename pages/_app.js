import withRedux from "next-redux-wrapper";
import App from "next/app";
import Router from "next/router";
import withGA from "next-ga";
import React from "react";
import { Provider } from "react-redux";
import fetch from "isomorphic-fetch";
import { mapValues } from "lodash";
import { DefaultSeo } from "next-seo";
import initStore from "../src/store";
import { DEFAULT_SEO, ENVIRONMENT, GA_ID } from "../src/config";
import { types } from "../src/reducers/featureToggle";

const FeatureFlagLoader = ({ dispatch, children }) => {
  React.useEffect(() => {
    const run = async () => {
      const featureToggle = await fetch(
        "https://s3-ap-southeast-1.amazonaws.com/opencerts.io/feature-toggle.json",
        { METHOD: "GET" }
      ).then(response => response.json());
      dispatch({
        type: types.UPDATE_FEATURE_TOGGLES,
        payload: mapValues(featureToggle, ENVIRONMENT)
      });
    };
    run();
  }, [dispatch]);
  return children;
};

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
      <Provider store={store}>
        <FeatureFlagLoader dispatch={store.dispatch}>
          <DefaultSeo {...DEFAULT_SEO} />
          <Component {...pageProps} />
        </FeatureFlagLoader>
      </Provider>
    );
  }
}

const appWrappedWithGA = withGA(GA_ID, Router)(MyApp);
export default withRedux(initStore)(appWrappedWithGA);
