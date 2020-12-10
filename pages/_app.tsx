import { mapValues } from "lodash";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore repository has been archived, will wait to upgrade to fix
import withGA from "next-ga";
import { DefaultSeo } from "next-seo";
import App from "next/app";
import Router from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { DEFAULT_SEO, ENVIRONMENT, GA_ID } from "../src/config";
import { updateFeatureToggles } from "../src/reducers/featureToggle.actions";
import { wrapper } from "../src/store";
import "../src/tailwind.css";

const FeatureFlagLoader: React.FunctionComponent = ({ children }) => {
  const dispatch = useDispatch();
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

class MyApp extends App {
  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <>
        <FeatureFlagLoader>
          <DefaultSeo {...DEFAULT_SEO} />
          <Component {...pageProps} />
        </FeatureFlagLoader>
      </>
    );
  }
}

const appWrappedWithGA = withGA(GA_ID, Router)(MyApp);
export default wrapper.withRedux(appWrappedWithGA);
