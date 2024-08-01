import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Wogaa } from "../src/components/Analytics/wogaa";
import { Wrapper, Main } from "../src/components/Layout/Body";
import { FooterBar } from "../src/components/Layout/FooterBar";
import { NavigationBar } from "../src/components/Layout/NavigationBar";
import { MainPageContainer } from "../src/components/MainPageContainer";
import {
  resetCertificateState,
  retreiveCertifcateByActionFailure,
  retrieveCertificateByAction,
} from "../src/reducers/certificate.slice";

const HomePage: React.FunctionComponent = (props) => {
  const urlParams = useUrlParamsThenScrubUrl({ enabled: true });

  const dispatch = useDispatch();

  useEffect(() => {
    if (urlParams === undefined) return;

    dispatch(resetCertificateState());
    if (urlParams.query.q) {
      const action = JSON.parse(window.decodeURI(urlParams.query.q as string));
      const anchorStr = decodeURIComponent(urlParams.uriFragment);
      const anchor = anchorStr ? JSON.parse(anchorStr) : {};
      if (action.type === "DOCUMENT") {
        dispatch(retrieveCertificateByAction({ ...action.payload, anchorKey: anchor?.key }));
      } else {
        dispatch(
          retreiveCertifcateByActionFailure(`The type ${action.type} provided from the action is not supported`)
        );
      }
    }
  }, [props, urlParams, dispatch]);

  return (
    <Wrapper isLoadWogaa={false}>
      {urlParams ? <Wogaa /> : null}
      <NavigationBar />
      <Main>
        <MainPageContainer />
      </Main>
      <FooterBar />
    </Wrapper>
  );
};

export default HomePage;

type UseUrlParamsThenScrubUrlParam = {
  /** extraction and scrubbing will only happen if this is true */
  enabled: boolean;
};
type UrlParams = {
  uriFragment: string;
  query: ParsedUrlQuery;
};
const useUrlParamsThenScrubUrl = ({ enabled }: UseUrlParamsThenScrubUrlParam): UrlParams | undefined => {
  // urlParams will only be undefined before the second render
  // being undefined means the urlParams has not been extracted and the url has not been scrubbed yet
  const [urlParams, setUrlParams] = useState<UrlParams | undefined>(
    !enabled
      ? {
          uriFragment: "",
          query: {},
        }
      : undefined
  );
  const router = useRouter();

  useEffect(() => {
    if (enabled) {
      setUrlParams((currUrlParams) => {
        // once the fragment is set, we never update it again
        if (currUrlParams !== undefined) {
          return currUrlParams;
        }

        const savedFragment = window.location.hash.substring(1);
        // router.query does not work when next is built in static mode
        const urlSearchParams = new URLSearchParams(window.location.search);
        const savedQueryParam = Object.fromEntries(urlSearchParams.entries());

        // scrubbbb itttttt
        window.location.hash = "";
        router.replace({}, undefined, { shallow: true });
        return {
          uriFragment: savedFragment,
          query: savedQueryParam,
        };
      });
    }
  }, [urlParams, router, enabled]);

  return urlParams;
};
