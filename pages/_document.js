/* eslint-disable class-methods-use-this */
import Document, { Head, Main, NextScript } from "next/document";
import { BootstrapCss, BootstrapJs } from "../src/components/Layout/Bootstrap";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link
            rel="icon"
            type="image/png"
            href="/static/images/favicon/favicon-32x32.png"
            sizes="32x32"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/favicon/favicon-16x16.png"
            sizes="16x16"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Montserrat"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Source+Sans+Pro"
            rel="stylesheet"
            type="text/css"
          />
          <BootstrapCss />
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
            integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="/static/style.css" />
        </Head>
        <body>
          <Main />
          <NextScript />

          <BootstrapJs />
        </body>
      </html>
    );
  }
}
