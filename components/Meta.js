import Head from "next/head";

const Meta = () => (
  <div>
    <Head>
      <title>certificate-web-ui</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
    <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js" />
    <link
      rel="stylesheet"
      href="https://unpkg.com/tachyons@4.9.1/css/tachyons.min.css"
    />
    <style jsx global>{`
      body {
        background: white;
        font-family: arial, sans-serif;
        line-height: 1.5;
      }

      .noselect {
        user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
      }

      a:visited {
        color: inherit;
      }
    `}</style>
  </div>
);

export default Meta;
