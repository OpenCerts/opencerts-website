import { get } from "lodash";
import { IMG_LOGO_NTU, IMG_CERTIFICATE_SEAL } from "./images";

import { formatDate, formatCertID } from "./functions";

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

export const fullWidthStyleNTUText = {
  width: "70%",
  height: "auto"
};

export const fullWidthStyleSignature = {
  width: "80%",
  height: "auto"
};

export const certificateDimension = {
  width: "100%",
  height: "auto"
};

export const hrLineStyle = {
  backgroundColor: "black"
};

export const printTextStyle = {
  fontFamily: "Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "500!important",
  fontSize: "1.3rem",
  textAlign: "left",
  marginBottom: "0",
  bottom: 0,
  position: "absolute"
  // textAlignVertical: "bottom"
};

export const universityNameTextStyle = {
  fontFamily: "Poppins,Century Gothic,CenturyGothic,AppleGothic,sans-serif",
  fontWeight: "600",
  fontSize: "2rem",
  color: "#BE781B",
  marginBottom: "0",
  textAlign: "left"
};

export const singaporeTextStyle = {
  fontFamily: "Poppins,Century Gothic,CenturyGothic,AppleGothic,sans-serif",
  color: "#BE781B",
  fontSize: "1.5rem"
};

export const certNameTextStyle = {
  fontFamily:
    "FootlightMT,TimesNewRoman,Times New Roman,Times,Baskerville,Georgia",
  fontWeight: "700",
  fontStyle: "italic",
  fontSize: "2.2rem",
  marginBottom: "0",
  textAlign: "left",
  lineHeight: 1
};

export const certNameHonorTextStyle = {
  fontFamily: "Avantgarde,Avant Garde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "700",
  fontStyle: "italic",
  fontSize: "1.7rem",
  marginBottom: "0",
  textAlign: "left",
  bottom: 0,
  position: "absolute"

  // textAlignVertical: "bottom"
};

export const certIssueDateTextStyle = {
  fontFamily: "Avantgarde,Avant Garde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "700",
  fontStyle: "italic",
  fontSize: "1.5rem",
  marginBottom: "0",
  textAlign: "left",
  bottom: 0,
  position: "absolute"
  // textAlignVertical: "bottom"
};

export const nameTextStyle = {
  fontFamily: "FootlightMT",
  fontSize: "2.5rem",
  textAlign: "left",
  fontStyle: "italic",
  fontWeight: "700",
  lineHeight: 1
};

export const titleTextStyle = {
  color: "rgb(30,93,200)",
  fontSize: "3rem",
  textAlign: "center"
};

export const renderSingapore = () => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "2rem" }}
  >
    <p style={singaporeTextStyle}>SINGAPORE</p>
  </div>
);

export const renderLogoNTU = () => (
  <div className="row d-flex justify-content-between">
    {/* <div className="col">
      <img style={certificateDimension} src={IMG_LOGO_NTU} />
    </div> */}

    <div className="col-1" />
    <div className="col-8">
      <img style={fullWidthStyle} src={IMG_LOGO_NTU} />
    </div>
    {/* <div className="col-1" /> */}
  </div>
);

export const renderLogoNTUPartner = logo => (
  <div
    className="row d-flex justify-content-center align-items-center"
    style={{ marginTop: "3rem" }}
  >
    <div className="col-1" />
    <div className="col-5">
      <img style={fullWidthStyle} src={IMG_LOGO_NTU} />
    </div>
    <div className="col-5">
      <img style={fullWidthStyle} src={logo} />
    </div>
    <div className="col-1" />
  </div>
);

export const renderTwoSignatures = certificate => (
  <div className="row d-flex justify-content-between mt-5">
    <div className="col-3 ml-3 mt-4 mb-1">
      <img style={fullWidthStyle} src={IMG_CERTIFICATE_SEAL} />
    </div>

    <div className="col-3 mr-5 mt-4">
      <div className="row mb-3">
        <div className="col-10">
          <img
            style={fullWidthStyleSignature}
            src={get(certificate, "additionalData.president")}
          />
          <hr className="mt-1 mb-0" style={hrLineStyle} />
          <span>President</span>
        </div>
      </div>

      <div className="row">
        <div className="col-10">
          <img
            style={fullWidthStyleSignature}
            src={get(certificate, "additionalData.registrar")}
          />
          <hr className="mt-1 mb-0" style={hrLineStyle} />
          <span>Registrar</span>
        </div>
      </div>
    </div>
  </div>
);

export const renderSchoolName = (
  <div>
    {/* <div className="row d-flex justify-content-start">
      <div className="col">
        <img style={fullWidthStyleNTUText} src={IMG_NTU_TEXT} />
      </div>
    </div> */}

    <div className="row d-flex justify-content-start">
      <div className="col">
        <p style={universityNameTextStyle}>Nanyang Technological University</p>
      </div>
    </div>

    <div className="row d-flex justify-content-start">
      <div className="col">
        <p style={singaporeTextStyle}>Republic of Singapore</p>
      </div>
    </div>
  </div>
);

export const renderCertName = certificate => (
  <div>
    <div className="row d-flex justify-content-start">
      <div className="col">
        <p style={certNameTextStyle}>{certificate.name}</p>
      </div>
    </div>

    {certificate.additionalData.classification && (
      <div className="row d-flex mt-4 justify-content-start">
        <div className="col-1 mt-3">
          <p style={printTextStyle}>with</p>
        </div>

        <div className="col-11 mt-4">
          <p style={certNameHonorTextStyle}>
            {certificate.additionalData.classification}
          </p>
        </div>
      </div>
    )}
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div
      className="row d-flex justify-content-start pb-1"
      style={{ marginTop: "1.5rem" }}
    >
      <div className="col pt-5">
        {/* <img src={IMG_AWARD_TEXT_A} /> */}
        <p style={printTextStyle}>It is hereby certified that</p>
      </div>
    </div>
    <div className="row d-flex justify-content-start">
      <div className="col-12 mt-2 mb-2">
        <p style={nameTextStyle}>{certificate.recipient.name}</p>
      </div>
    </div>
    <div className="row d-flex justify-content-start mb-1 mt-5">
      <div className="col">
        {/* <img src={IMG_AWARD_TEXT_B} /> */}
        <p style={printTextStyle}>
          having satisfied the requirements of the University, <br />
          was conferred the degree of
        </p>
      </div>
    </div>

    {/* <div
      className="row d-flex justify-content-start"
      style={{ marginTop: "1.5rem" }}
    >
      <p style={printTextStyle}>It is hereby certified that</p>
    </div>
    <div className="row d-flex justify-content-start">
      <p style={nameTextStyle}>{certificate.recipient.name}</p>
    </div>
    <div className="row d-flex justify-content-start">
      <p style={printTextStyle}>
        having satisfied the requirements of the University, <br />
        was conferred the degree of
      </p>
    </div> */}

    {renderCertName(certificate)}
  </div>
);

export const renderIssuingDate = certificate => (
  <div className="row mt-4 ">
    {/* <div className="col-1 mt-2">
      <p style={printTextStyle}>on</p>
    </div>
    <div className="col-5 mt-2">
      <p style={certIssueDateTextStyle}>{formatDate(certificate.issuedOn)}.</p>
    </div> */}

    <div
      className={
        certificate.additionalData.classification ? "col-1 mt-2" : "col-1 mt-3"
      }
    >
      <p style={printTextStyle}>on</p>
    </div>
    <div
      className={
        certificate.additionalData.classification
          ? "col-10 mt-2"
          : "col-10 mt-3"
      }
    >
      <p style={certIssueDateTextStyle}>{formatDate(certificate.issuedOn)}.</p>
    </div>
  </div>
);

export const renderFooter = certificate => (
  <div className="container">
    <div className="row d-flex justify-content-center">
      <div className="col-6 text-left">
        {get(certificate, "additionalData.additionalCertId")}
      </div>
      <div className="col-6 text-right">{formatCertID(certificate.id)}</div>
    </div>
  </div>
);

/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
export default ({ logo }) => ({ certificate }) => (
  <div>
    <head>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:400,600&display=swap"
        rel="stylesheet"
      />
    </head>
    <div
      className="container"
      style={{ border: 1, borderColor: "#AAA", borderStyle: "solid" }}
    >
      <div className="row justify-content-start mt-5 ml-5 mr-1">
        <div className="col-9">
          {renderSchoolName}
          {renderAwardText(certificate)}
          {renderIssuingDate(certificate)}
        </div>

        <div className="col-2">
          <div className="row">{renderLogoNTU()}</div>
        </div>
      </div>
      <div className="row ml-4 mb-5">
        <div className="col">{renderTwoSignatures(certificate)}</div>
      </div>
    </div>
    {renderFooter(certificate)}
  </div>
);
