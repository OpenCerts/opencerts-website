import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Wrapper, Main } from "../src/components/Layout/Body";
import { FooterBar } from "../src/components/Layout/FooterBar";
import { NavigationBar } from "../src/components/Layout/NavigationBar";
import { MainPageContainer } from "../src/components/MainPageContainer";
import {
  resetCertificateState,
  retrieveCertificateByActionFailure,
  retrieveCertificateByAction,
} from "../src/reducers/certificate.actions";

interface HomePageProps {
  resetCertificateState: () => void;
  retrieveCertificateByAction: (payload: { uri: string; key?: string }) => void;
  retrieveCertificateByActionFailure: (message: string) => void;
}
const HomePage: React.FunctionComponent<HomePageProps> = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.resetCertificateState();
    if (router.query.q) {
      const action = JSON.parse(window.decodeURI(router.query.q as string));
      if (action.type === "DOCUMENT") {
        props.retrieveCertificateByAction(action.payload);
      } else {
        props.retrieveCertificateByActionFailure(`The type ${action.type} provided from the action is not supported`);
      }
    }
  }, [props, router]);

  return (
    <Wrapper>
      <NavigationBar />
      <Main>
        <MainPageContainer />
      </Main>
      <FooterBar />
    </Wrapper>
  );
};

export default connect(null, {
  resetCertificateState,
  retrieveCertificateByAction,
  retrieveCertificateByActionFailure,
})(HomePage);
