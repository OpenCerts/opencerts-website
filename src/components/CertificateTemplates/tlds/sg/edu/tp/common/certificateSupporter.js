import PropTypes from "prop-types";

const CertificateSupporter = ({ supporter }) => {
  const paragraph = supporter.paragraph
    ? supporter.paragraph
    : "The programme is supported by";

  return (
    <div>
      <style>
        {`
          .supporters-paragraph{
            font-style: italic;
            font-family: "Times New Roman", Times, serif;
          }

          .supporter-logos {
            margin-top:1em;
            margin-bottom:3em;
          }

        `}
      </style>

      <div className="col-12 supporters-paragraph">{paragraph}</div>

      <div className="row col-12 supporter-logos">
        <div className="col-3">
          <img src={supporter.logo} className={supporter.logoStyle} />
        </div>
        <div className="col-10" />
      </div>
    </div>
  );
};

CertificateSupporter.propTypes = {
  supporter: PropTypes.object.isRequired
};

export default CertificateSupporter;
