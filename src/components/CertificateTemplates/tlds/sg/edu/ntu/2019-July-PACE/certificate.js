// import { Certificate } from "../common";
import { get } from "lodash";
import { IMG_LOGO_NTU_COAT_OF_ARMS } from "../common/images";
import { formatDate, formatCertID } from "../common/functions";

// export default Template;

// NTU Logo styling
export const ntuLogoFullWidthStyle = {
  width: "80%",
  height: "auto"
};

export const fullWidthStyle = {
  width: "90%",
  height: "auto"
};

export const printTextStyle = {
  fontFamily: "Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "700!important",
  fontStyle: "italic",
  fontSize: "1.3rem",
  textAlign: "center",
  marginBottom: "0",
  bottom: 0
  // position: "absolute"
  // textAlignVertical: "bottom"
};

export const printTextStyleLeft = {
  fontFamily: "Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "700!important",
  fontStyle: "italic",
  fontSize: "1.3rem",
  marginLeft: "-2%",
  textAlign: "left"
};

export const printTextStyleRight = {
  fontFamily: "Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "700!important",
  fontStyle: "italic",
  fontSize: "1.3rem",
  marginRight: "-3%",
  textAlign: "right"
};

export const certNameTextStyle = {
  // fontFamily:
  //   "FootlightMT,TimesNewRoman,Times New Roman,Times,Baskerville,Georgia",
  fontFamily: "Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "600",
  fontSize: "1.8rem",
  marginBottom: "0",
  textAlign: "center",
  lineHeight: 1
};

export const nameTextStyle = {
  // fontFamily: "FootlightMT",
  // fontSize: "2.5rem",
  fontFamily: "Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "600",
  fontSize: "1.8rem",
  textAlign: "center",
  fontStyle: "normal",
  lineHeight: 1
};

export const certIssueDateTextStyle = {
  fontFamily: "Avantgarde,Avant Garde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "normal",
  fontStyle: "normal",
  fontSize: "1.5rem",
  marginBottom: "0",
  textAlign: "center",
  bottom: 0
  // position: "absolute"
  // textAlignVertical: "bottom"
};

export const fineprintTextStyle = {
  fontFamily: "FootlightMT",
  fontSize: "0.75rem",
  textAlign: "right",
  fontStyle: "normal",
  fontWeight: "700",
  textAlignVertical: "bottom",
  lineHeight: 1
};

export const renderLogoNTU = () => (
  <div>
    <div className="row d-flex justify-content-center">
      <div className="col-4">
        <img style={ntuLogoFullWidthStyle} src={IMG_LOGO_NTU_COAT_OF_ARMS} />
      </div>
      <div className="col-8" />
    </div>

    <div className="row d-flex justify-content-center">
      <div className="col-11">
        <p style={fineprintTextStyle}>Reg. No. 200604393R</p>
      </div>
      <div className="col-1" />
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
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div
      className="row d-flex justify-content-start"
      // Rem: Add top space
      // style={{ marginTop: "1.5rem" }}
    >
      <div className="col-12 mt-2 mb-2">
        <p style={printTextStyle}>This is to certify that</p>
      </div>
    </div>
    <div className="row d-flex justify-content-start">
      <div className="col-12 mt-2 mb-0">
        <p style={nameTextStyle}>{certificate.recipient.name}</p>
      </div>
    </div>
    <div className="row mt-2 mb-2">
      <div className="col-6 mt-2 ">
        <p style={printTextStyleRight}>has sucessfully completed the</p>
      </div>
      <div className="col-6 mt-2">
        <p style={printTextStyleLeft}>{certificate.description}</p>
      </div>
    </div>

    {renderCertName(certificate)}
  </div>
);

export const renderIssuingDate = certificate => (
  <div className="row mt-4 mb-4">
    <div className="col-12 ">
      <p style={certIssueDateTextStyle}>
        {formatDate(certificate.graduationDate)}
      </p>
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
    {/* <head>
      <link
        href="https://fonts.googleapis.com/css?family=Poppins:400,600&display=swap"
        rel="stylesheet"
      />
    </head> */}
    <div
      className="container"
      style={{ border: 1, borderColor: "#AAA", borderStyle: "solid" }}
    >
      <div className="row justify-content-start mt-5 ml-5 mr-1">
        <div className="col-12">
          <div className="row">{renderLogoNTU()}</div>
        </div>
      </div>
      <div className="row justify-content-start mt-5 ml-5 mr-1">
        <div className="col-12">
          {renderAwardText(certificate)}
          {renderIssuingDate(certificate)}
        </div>
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-12 " />
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-12 " />
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-12 " />
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-12 " />
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-12 " />
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-12 " />
      </div>
      <div className="row mt-4 mb-4">
        <div className="col-12 " />
      </div>
    </div>

    {renderFooter(certificate)}
  </div>
);
