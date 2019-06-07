import React from "react";
import NextSeo from "next-seo";
import { connect } from "react-redux";
import NavigationBar from "../src/components/Layout/NavigationBar";
import FooterBar from "../src/components/Layout/FooterBar";
import css from "../src/components/error.scss";
import PrintWatermark from "../src/components/PrintWatermark";
import { DEFAULT_SEO } from "../src/config";

const ErrorPage = () => (
  <>
    <NextSeo config={DEFAULT_SEO} />
    <PrintWatermark />
    <NavigationBar />
    <div className={`${css.box}`}>
      <div id="error">
        <div className={`${css.error}`}>
          <br />
          <img
            src="/static/images/errorpage/error.png"
            style={{ height: "15vh" }}
          />
          <h2>Something went wrong!</h2>
          <p>
            There is an error with this certificate, please contact your issuing
            institution.
          </p>
          <a href="/">Go Back</a>
        </div>
      </div>
    </div>
    <FooterBar />
  </>
);

export default connect()(ErrorPage);
