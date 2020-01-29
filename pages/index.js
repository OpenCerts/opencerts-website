import React, { useEffect } from "react";
import PropTypes from "prop-types";
import NextSeo from "next-seo";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import {
  resetCertificateState,
  retrieveCertificateByAction,
  retrieveCertificateByActionFailure
} from "../src/reducers/certificate";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import MainPageContainer from "../src/components/MainPageContainer";
import { DEFAULT_SEO } from "../src/config";

const HomePage = props => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.q) {
      props.resetCertificateState();
      const action = JSON.parse(window.decodeURI(router.query.q));
      if (action.type === "DOCUMENT") {
        props.retrieveCertificateByAction(action.payload);
      } else {
        props.retrieveCertificateByActionFailure(
          `The type ${action.type} provided from the action is not supported`
        );
      }
    }
  }, [props, router]);

  return (
    <>
      <NextSeo config={DEFAULT_SEO} />
      <NavigationBar active="home" />
      <MainPageContainer />
      <FooterBar />
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  retrieveCertificateByAction: payload =>
    dispatch(retrieveCertificateByAction(payload)),
  retrieveCertificateByActionFailure: payload =>
    dispatch(retrieveCertificateByActionFailure(payload)),
  resetCertificateState: () => dispatch(resetCertificateState())
});

export default connect(
  null,
  mapDispatchToProps
)(HomePage);

HomePage.propTypes = {
  retrieveCertificateByAction: PropTypes.func,
  resetCertificateState: PropTypes.func,
  retrieveCertificateByActionFailure: PropTypes.func
};
