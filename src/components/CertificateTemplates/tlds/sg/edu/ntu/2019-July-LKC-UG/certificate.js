// import { Certificate } from "../common";
import { get } from "lodash";
import {
  IMG_LOGO_NTU_COAT_OF_ARMS,
  IMG_CERTIFICATE_SEAL
} from "../common/images";
import { formatDate, formatCertID } from "../common/functions";
import { IMG_PARTNER_SEAL, IMG_LOGO_IMPERIAL_COLLEGE } from "./images/logo";

// export default Template;

// export const IMG_PARTNER_SINGATURE =
//   "data:image/jpeg;base64,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";

// NTU Logo styling
export const ntuLogoFullWidthStyle = {
  width: "90%",
  height: "auto"
};

// Partner Logo
export const partnerLogoFullWidthStyle = {
  width: "110%",
  height: "auto"
};

export const fullWidthStyle = {
  width: "80%",
  height: "auto"
};

export const partnerFullWidthStyle = {
  width: "70%",
  height: "auto"
};

export const fullWidthStyleNTUText = {
  width: "70%",
  height: "auto"
};

export const fullWidthStyleSignature = {
  width: "60%",
  height: "auto"
};

export const partnerFullWidthStyleSignature = {
  width: "85%",
  height: "auto"
};

export const certificateDimension = {
  width: "100%",
  height: "auto"
};

export const hrLineStyle = {
  backgroundColor: "black"
};

export const LineHeightStyle = {
  lineHeight: "normal"
};

export const printTextStyle = {
  fontFamily: "Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "500!important",
  fontSize: "1.3rem",
  textAlign: "center",
  marginBottom: "0",
  bottom: 0
  // position: "absolute"
  // textAlignVertical: "bottom"
};

export const printTextStyleTitle = {
  fontFamily: "Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "500!important",
  fontSize: "0.85rem",
  textAlign: "left"
  // bottom: 0
  // position: "absolute"
  // textAlignVertical: "bottom"
};

export const printTextStyleRight = {
  fontFamily: "Avant Garde,Avantgarde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "500!important",
  fontSize: "1.3rem",
  textAlign: "right",
  marginBottom: "0",
  // marginLeft: "30%",
  marginRight: "-6%",
  lineHeight: "210%",
  bottom: 0
};

export const universityNameTextStyle = {
  fontFamily: "Poppins,Century Gothic,CenturyGothic,AppleGothic,sans-serif",
  fontWeight: "600",
  fontSize: "2rem",
  color: "#000000",
  marginBottom: "0",
  textAlign: "center"
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
  fontSize: "2.2rem",
  marginBottom: "0",
  textAlign: "center",
  lineHeight: 1
};

export const certNameHonorTextStyle = {
  fontFamily: "Avantgarde,Avant Garde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "700",
  fontStyle: "italic",
  fontSize: "1.7rem",
  marginBottom: "0",
  textAlign: "center",
  bottom: 0,
  position: "absolute"
  // textAlignVertical: "bottom"
};

export const certIssueDateTextStyle = {
  fontFamily: "Avantgarde,Avant Garde,Century Gothic,CenturyGothic,AppleGothic",
  fontWeight: "700",
  fontStyle: "normal",
  fontSize: "1.65rem",
  marginBottom: "0",
  textAlign: "left",
  bottom: 0
  // position: "absolute"
  // textAlignVertical: "bottom"
};

export const nameTextStyle = {
  fontFamily: "FootlightMT",
  fontSize: "2.5rem",
  textAlign: "center",
  fontStyle: "italic",
  fontWeight: "700",
  lineHeight: 1
};

export const titleTextStyle = {
  color: "rgb(30,93,200)",
  fontSize: "3rem",
  textAlign: "center"
};

export const fineprintTextStyle = {
  fontFamily: "FootlightMT",
  fontSize: "0.8rem",
  textAlign: "left",
  fontStyle: "italic",
  fontWeight: "700",
  lineHeight: 1
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
  <div className="row d-flex justify-content-center">
    <div className="col-2" />
    <div className="col-8">
      <img style={ntuLogoFullWidthStyle} src={IMG_LOGO_NTU_COAT_OF_ARMS} />
    </div>
    <div className="col-2" />
  </div>
);

export const renderLogoNTUPartner = () => (
  <div className="row d-flex justify-content-between mt-5">
    <div className="col-12 mr-5 mt-4">
      <div className="row mb-3">
        <div className="col-1" />
        <div className="col-4 ml-3">
          <img style={ntuLogoFullWidthStyle} src={IMG_LOGO_NTU_COAT_OF_ARMS} />
        </div>
        <div className="col-1" />
        <div className="col-4 ml-4">
          <img
            style={partnerLogoFullWidthStyle}
            src={IMG_LOGO_IMPERIAL_COLLEGE}
          />
        </div>
        <div className="col-2" />
      </div>
    </div>
  </div>
);

export const renderTwoSignatures = certificate => (
  <div className="row d-flex justify-content-between mt-5">
    <div className="col-12 mr-5 mt-4">
      <div className="row mb-3">
        <div className="col-1" />
        <div className="col-4">
          <img
            style={fullWidthStyleSignature}
            src={get(certificate, "additionalData.signature1")}
          />
          <hr className="mt-1 mb-0 mr-4" style={hrLineStyle} />
          <div style={LineHeightStyle}>
            <div className="row mb-0 mt-1 ml-1">
              <p style={printTextStyleTitle}>
                President <br />
                Nanyang Technological University
              </p>
            </div>
          </div>
        </div>
        <div className="col-2" />
        <div className="col-4">
          <img
            style={partnerFullWidthStyleSignature}
            src={get(certificate, "additionalData.signature2")}
          />
          <hr className="mt-1 mb-0 mr-4" style={hrLineStyle} />
          <div style={LineHeightStyle}>
            <div className="row mb-0 mt-1 ml-1">
              <p style={printTextStyleTitle}>
                President <br />
                Imperial College London
              </p>
            </div>
          </div>
        </div>
        <div className="col-1" />
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
    <div className="col-12 mt-2 mb-2">
      <p style={printTextStyle}>and</p>
    </div>
  </div>
);

export const renderPartnerName = (
  <div>
    <div className="row d-flex justify-content-start">
      <div className="col">
        <p style={universityNameTextStyle}>Imperial College London</p>
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

    {/* {certificate.additionalData.classification && (
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
    )} */}
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
        <p style={printTextStyle}>have conferred on</p>
      </div>
    </div>
    <div className="row d-flex justify-content-start">
      <div className="col-12 mt-2 mb-0">
        <p style={nameTextStyle}>{certificate.recipient.name}</p>
      </div>
    </div>
    <div className="col-12 mt-2 mb-4">
      <p style={printTextStyle}>the degree of</p>
    </div>

    {renderCertName(certificate)}
  </div>
);

export const renderIssuingDate = certificate => (
  <div className="row mt-2 ">
    {/* <div className="col-1 mt-2">
      <p style={printTextStyle}>on</p>
    </div>
    <div className="col-5 mt-2">
      <p style={certIssueDateTextStyle}>{formatDate(certificate.issuedOn)}.</p>
    </div> */}

    <div className="col-5 mt-2 ">
      <p style={printTextStyleRight}>on</p>
    </div>
    <div className="col-7 mt-2">
      <p style={certIssueDateTextStyle}>
        {formatDate(certificate.graduationDate)}
      </p>
    </div>
  </div>
);

export const renderSeal = (
  <div className="row mb-0">
    <div className="col-1" />
    <div className="col-4">
      <img style={fullWidthStyle} src={IMG_CERTIFICATE_SEAL} />
    </div>
    <div className="col-2" />
    <div className="col-4">
      <img style={partnerFullWidthStyle} src={IMG_PARTNER_SEAL} />
    </div>
    <div className="col-1" />
  </div>
);

export const renderFinePrint = (
  <div className="row mb-2 mt-2">
    <div className="col-1" />
    <div className="col-10">
      <p style={fineprintTextStyle}>
        Information relating to the language of study and the name and location
        of the delivery institution is recorded on the official transcript
      </p>
    </div>
    <div className="col-1" />
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
        <div className="col-12">
          <div className="row">{renderLogoNTUPartner()}</div>
        </div>
      </div>
      <div className="row justify-content-start mt-4 ml-5 mr-1">
        <div className="col-12">
          {renderSchoolName}
          {renderPartnerName}
          {renderAwardText(certificate)}
          {renderIssuingDate(certificate)}
        </div>
      </div>
      <div className="row ml-5 mb-2">
        <div className="col">{renderTwoSignatures(certificate)}</div>
      </div>
      <div className="row ml-5 mb-4">
        <div className="col">{renderSeal}</div>
      </div>
      <div className="row ml-5 mb-4">
        <div className="col-12">{renderFinePrint}</div>
      </div>
    </div>
    {renderFooter(certificate)}
  </div>
);
