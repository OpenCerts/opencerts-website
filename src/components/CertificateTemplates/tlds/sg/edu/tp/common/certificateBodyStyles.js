const CertificateBodyStyles = () => (
  <style>
    {`
    .recipient-paragraph{
      font-style: italic;
      font-family: "Times New Roman", Times, serif;
    }

    .exempted-paragraph{
      font-style:normal;
    }

    .recipient-name{
      font-size:1.5em;
      font-style: italic;
      font-variant:small-caps;
      font-family: "Times New Roman", Times, serif;
    }

    .certificate-name{
      font-size:2.7em;
      font-variant:small-caps;
      font-style: italic;
      font-family: "Times New Roman", Times, serif;
      text-transform:uppercase;
      border-top:1px solid #ccc;
      border-bottom:1px solid #ccc;
      margin-top:0.25em;
      margin-bottom:0.35em;
      padding-top:1em;
      padding-bottom:5em;
    }

    .certificate-body{
      margin-top:6em;
      margin-bottom:6em;
    }
    `}
  </style>
);

export default CertificateBodyStyles;
