import { mapValues } from "lodash";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore repository has been archived, will wait to upgrade to fix
import { DefaultSeo } from "next-seo";
import App from "next/app";
import React from "react";
import ReactGA from "react-ga4";
import { useDispatch } from "react-redux";
import { DEFAULT_SEO, ENVIRONMENT, GA4_TAG_ID } from "../src/config";
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
  setGA = () => {
    if (GA4_TAG_ID) {
      ReactGA.initialize(GA4_TAG_ID);
      ReactGA.send("pageview");
    }
  };
  componentDidMount() {
    this.setGA();
  }
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

export default wrapper.withRedux(MyApp);
