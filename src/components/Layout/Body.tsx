import { ParsedUrlQuery } from "querystring";

import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { Wogaa } from "../Analytics/wogaa";

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
        const savedQueryParam = { ...router.query };

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

interface WrapperProps {
  children: React.ReactNode;
  isScrubUrlBeforeLoadingWogaa?: boolean;
}

export const Wrapper: React.FunctionComponent<WrapperProps> = ({ children, isScrubUrlBeforeLoadingWogaa = false }) => {
  // urlParams being defined means the url has been extracted and scrubbed
  const urlParams = useUrlParamsThenScrubUrl({ enabled: isScrubUrlBeforeLoadingWogaa });
  return (
    <>
      {!isScrubUrlBeforeLoadingWogaa && <Wogaa />}
      {isScrubUrlBeforeLoadingWogaa && urlParams ? <Wogaa /> : null}
      <div className="flex flex-col h-screen wrapper">{children}</div>
    </>
  );
};

interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FunctionComponent<MainProps> = ({ children }) => (
  // https://philipwalton.com/articles/normalizing-cross-browser-flexbox-bugs/
  <main className="main" style={{ flex: "1 0 auto" }}>
    {children}
  </main>
);
