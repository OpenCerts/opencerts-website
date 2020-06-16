import { mapValues } from "lodash";
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore repository has been archived, will wait to upgrade to fix
import withGA from "next-ga";
import withRedux from "next-redux-wrapper";
import { DefaultSeo } from "next-seo";
import App from "next/app";
import Router from "next/router";
import React from "react";
import { Provider } from "react-redux";
import { Store } from "redux";
import { DEFAULT_SEO, ENVIRONMENT, GA_ID } from "../src/config";
import { RootState } from "../src/reducers";
import { updateFeatureToggles } from "../src/reducers/featureToggle.actions";
import initStore from "../src/store";

interface FeatureFlagLoaderProps {
  dispatch: Store<RootState>["dispatch"];
}
const FeatureFlagLoader: React.FunctionComponent<FeatureFlagLoaderProps> = ({ dispatch, children }) => {
  React.useEffect(() => {
    const run = async (): Promise<void> => {
      const featureToggle = await window
        .fetch("https://s3-ap-southeast-1.amazonaws.com/opencerts.io/feature-toggle.json", {
          method: "GET",
        })
        .then((response) => response.json());
      dispatch(updateFeatureToggles(mapValues(featureToggle, ENVIRONMENT)));
    };
    run();
  }, [dispatch]);
  return <>{children}</>;
};

interface MyAppProps {
  store: Store<RootState>;
}
class MyApp extends App<MyAppProps> {
  render(): JSX.Element {
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
