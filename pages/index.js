import React, { useEffect } from "react";
import PropTypes from "prop-types";
import NextSeo from "next-seo";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import {
  getEncryptedCertificate,
  retrieveCertificateByLink,
  getEncryptedCertificateStatus
} from "../src/reducers/certificate";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import MainPageContainer from "../src/components/MainPageContainer";
import { DEFAULT_SEO } from "../src/config";

const VerifierPage = props => {
  const getCertificate = () => {
    const hash = window.location.hash.substring(1);
    const { router } = props;
    const { documentId } = router.query;
    if (documentId) {
      const payload = {
        id: documentId,
        encryptionKey: hash
      };
      props.retrieveCertificateByLink(payload);
    }
  };

  useEffect(() => {
    getCertificate();
  }, []);

  return (
    <>
      <NextSeo config={DEFAULT_SEO} />
      <NavigationBar active="home" />
      <MainPageContainer />
      <FooterBar />
    </>
  );
};

const mapStateToProps = store => ({
  encryptedCertificate: getEncryptedCertificate(store),
  encryptedCertificateStatus: getEncryptedCertificateStatus(store)
});

const mapDispatchToProps = dispatch => ({
  retrieveCertificateByLink: payload =>
    dispatch(retrieveCertificateByLink(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(VerifierPage));

VerifierPage.propTypes = {
  router: PropTypes.object,
  encryptedCertificate: PropTypes.object,
  encryptedCertificateStatus: PropTypes.string,
  retrieveCertificateByLink: PropTypes.func
};
