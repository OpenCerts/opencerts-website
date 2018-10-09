import Head from "next/head";
import "../../../styles.scss";

const Meta = () => (
  <div>
    <Head>
      <title>OpenCerts</title>
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

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link
        href="https://fonts.googleapis.com/css?family=Montserrat|Source+Sans+Pro"
        rel="stylesheet"
      />

      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
        crossOrigin="anonymous"
      />
    </Head>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossOrigin="anonymous"
    />

    <script
      src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
      integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
      crossOrigin="anonymous"
    />
    <script
      src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
      integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
      crossOrigin="anonymous"
    />
    <script
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
      integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
      crossOrigin="anonymous"
    />

    <style jsx global>{`
      :root {
        font: "Source Sans Pro", sans-serif;
        --font-monospace: "Source Sans Pro", sans-serif;
        --font-monospace-size: 0.8rem !important;
      }

      .btn {
        font-family: source sans pro;
      }
      body {
        background: white;
        font-family: "Source Sans Pro", sans-serif;
        line-height: 1.5;
        margin: 0px;
      }

      .navbar-toggler {
        position: absolute;
        right: 30px;
      }

      .main {
        max-width: 1280px;
        display: flex;
        justify-content: flex-start;
        margin: 0 auto;
        width: 100%;
        padding: 2rem;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: "Montserrat";
      }

      .bg-light {
        background-color: #fcf9f6 !important;
      }

      .bg-brand-dark {
        background-color: #324353;
      }

      .text-red {
        color: #ff5268;
      }

      .text-blue {
        color: #099de3;
      }

      .text-orange {
        color: #ffb152;
      }

      .text-green {
        color: #00c04a;
      }

      .text-brand-dark {
        color: #324353;
      }

      li.nav-item a.slanted-tab {
        background-color: transparent;
        border-color: transparent;
        z-index: 1;
        position: relative;
        display: inline-block;
        padding: 1.5em 1.5em 1em;
        color: inherit;
        text-decoration: none;
        margin: 0 -7px;
      }

      ul.navbar-nav > li.nav-item > a.nav-link::hover {
        color: #fff !important;
      }

      ul.navbar-nav > li.nav-item > a.nav-link.active {
        font-family: Montserrat;
        color: #fff !important;
      }

      li.nav-item a.slanted-tab::before {
        content: ""; /* To generate the box */
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0.5em;
        left: 0;
        z-index: -1;
        border-bottom: none;
        border-radius: 10px 10px 0 0;
        background: #ddd;
        box-shadow: 0 2px hsla(0, 0%, 100%, 0.5) inset;
        transform: perspective(5px) rotateX(2deg);
        transform-origin: bottom;
      }

      li.nav-item a.slanted-tab.active::before {
        background: #aaa;
      }

      li.nav-item a.slanted-tab.active {
        z-index: 2;
      }

      .fill {
        min-height: 100%;
        min-height: 100vh;
      }

      .pointer {
        cursor: pointer;
      }

      .bg-red {
        background: #ff6565;
      }

      .no-padding {
        padding: 0 !important;
      }

      #how-it-works-section .nav-link {
        color: black;
        background-color: transparent;
      }

      #how-it-works-section .nav-link.active {
        color: black;
        background-color: white;
        border-radus: 0;
        border-bottom-left-radius: 0.25rem;
        border-top-left-radius: 0.25rem;
      }
    `}</style>
  </div>
);

export default Meta;
