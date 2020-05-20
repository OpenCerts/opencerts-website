import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import FooterBar from "../src/components/Layout/FooterBar";
import NavigationBar from "../src/components/Layout/NavigationBar";
import MainPageContainer from "../src/components/MainPageContainer";
import {
  resetCertificateState,
  retrieveCertificateByAction,
  retrieveCertificateByActionFailure,
} from "../src/reducers/certificate";

const HomePage = (props) => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.q) {
      props.resetCertificateState();
      const action = JSON.parse(window.decodeURI(router.query.q));
      if (action.type === "DOCUMENT") {
        props.retrieveCertificateByAction(action.payload);
      } else {
        props.retrieveCertificateByActionFailure(`The type ${action.type} provided from the action is not supported`);
      }
    }
  }, [props, router]);

  return (
    <>
      <NavigationBar active="home" />
      <MainPageContainer />
      <FooterBar />
    </>
  );
};

const mapDispatchToProps = (dispatch) => ({
  retrieveCertificateByAction: (payload) => dispatch(retrieveCertificateByAction(payload)),
  retrieveCertificateByActionFailure: (payload) => dispatch(retrieveCertificateByActionFailure(payload)),
  resetCertificateState: () => dispatch(resetCertificateState()),
});

export default connect(null, mapDispatchToProps)(HomePage);

HomePage.propTypes = {
  retrieveCertificateByAction: PropTypes.func,
  resetCertificateState: PropTypes.func,
  retrieveCertificateByActionFailure: PropTypes.func,
};
