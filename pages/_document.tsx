import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/static/images/favicon/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/static/images/favicon/favicon-16x16.png" sizes="16x16" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&family=Source+Sans+Pro&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
          integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/static/style.css" />
        {process.env.GTM_CONTAINER_ID && (
          // eslint-disable-next-line react/no-danger
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.GTM_CONTAINER_ID}');`,
            }}
          />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Redirect from opencerts.io to www.opencerts.io while preserving hash
              if (window.location.hostname === 'opencerts.io') {
                window.location.replace('https://www.opencerts.io' + window.location.pathname + window.location.search + window.location.hash);
              }
            `,
          }}
        />
      </Head>
      <body>
        {process.env.GTM_CONTAINER_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.GTM_CONTAINER_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
