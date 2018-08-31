import Head from "next/head";

const Meta = () => (
  <div>
    <Head>
      <title>certificate-web-ui</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link
        href="https://fonts.googleapis.com/css?family=Roboto+Mono"
        rel="stylesheet"
      />
    </Head>
    <link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
      integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
      crossOrigin="anonymous"
    />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
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
        --font-monospace: "Roboto Mono", monospace;
        --font-monospace-size: 0.8rem !important;
      }

      body {
        background: white;
        font-family: arial, sans-serif;
        line-height: 1.5;
        margin: 0px;
      }

      .bg-brand-dark {
        background-color: #324353;
      }

      .text-red {
        color: #ff5268;
      }

      .text-orange {
        color: #ffbd52;
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
