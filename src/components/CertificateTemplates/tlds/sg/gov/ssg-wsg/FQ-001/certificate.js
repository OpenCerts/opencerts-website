import { get } from "lodash";
import { IMG_LOGO, IMG_SEAL, IMG_SSGLOGO } from "../common";
import { formatDate, getRecipientID } from "../common/functions";
import { fonts } from "../common/fonts";

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

export const sealWidthStyle = {
  width: "100%",
  height: "auto"
};

export const signatureWidthStyle = {
  width: "80%",
  height: "auto"
};

export const printTextStyle = {
  fontWeight: "400"
};

export const issuersTextStyle = {
  textAlign: "center",
  fontSize: "24px"
};

export const awardTextStyle = {
  fontSize: "22px",
  color: "rgb(197,41,155)",
  textAlign: "left"
};

export const singaporeTextStyle = {
  fontSize: "3rem"
};

export const nameTextStyle = {
  fontSize: "2.3rem",
  textAlign: "left",
  wordBreak: "break-word",
  textTransform: "uppercase",
  fontWeight: "600",
  color: "#000000"
};

export const recipientTextStyle = {
  fontSize: "1.8rem",
  textAlign: "center",
  marginBottom: "0px"
};

export const titleTextStyle = {
  color: "rgb(30,93,200)",
  fontSize: "3rem",
  textAlign: "center"
};

export const designationTextStyle = {
  fontSize: "14px"
};

export const footerTextStyle = {
  fontSize: "12px",
  color: "rgb(51,0,144)",
  marginTop: "15px"
};

export const certCodeStyle = {
  fontSize: "12px",
  color: "#ea649c",
  display: "inline-block",
  transform: "rotate(-90deg)"
};

export const footerLogoStyle = {
  width: "75%",
  height: "auto"
};
export const renderLogoWSQ = () => (
  <div className="row d-flex">
    <div className="col-lg-4 col-12" style={{ paddingRight: "0px" }}>
      <img style={fullWidthStyle} src={IMG_LOGO} />
    </div>
    <div className="col-lg-6" />
  </div>
);

export const renderSignature = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    <div className="col-lg-2 col-6">
      <img style={sealWidthStyle} src={IMG_SEAL} />
    </div>

    <div className="col-lg-7">
      <div className="col-lg-3 col-12">
        <img
          style={signatureWidthStyle}
          src={get(certificate, "additionalData.certSignatories[0].signature")}
        />
      </div>
      <div style={designationTextStyle} className="RobotoBold">
        {get(certificate, "additionalData.certSignatories[0].name")},{" "}
        {get(certificate, "additionalData.certSignatories[0].position")}
      </div>
      <div style={designationTextStyle} className="RobotoBold">
        {get(certificate, "additionalData.certSignatories[0].organisation")}
      </div>
      <div style={footerTextStyle} className="RobotoLight">
        The training and assessment of the abovementioned learner are accredited
        in accordance with the Singapore Workforce Skills Qualifications System.
      </div>
      <div style={footerTextStyle} className="RobotoLight">
        <a style={{ color: "rgb(51,0,144)" }} href="www.ssg.gov.sg">
          www.ssg.gov.sg
        </a>
        <br />
        For verification of this certificate, please visit
        <a href="https://myskillsfuture.sg/verify_eCert.html">
          https://myskillsfuture.sg/verify_eCert.html
        </a>
      </div>
    </div>
    <div className="col-lg-3 col-xs-12">
      <div style={{ marginBottom: "70px", marginTop: "60px" }}>
        <p style={printTextStyle} className="RobotoRegular">
          Cert No: {get(certificate, "additionalData.serialNum")}
        </p>
      </div>
      <img style={footerLogoStyle} src={IMG_SSGLOGO} />
      <div style={certCodeStyle}>
        {get(certificate, "additionalData.certCode")}
      </div>
    </div>
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "2rem" }}>
      <p style={nameTextStyle} className="RobotoRegular">
        {get(certificate, "qualificationLevel[0].description")} in{" "}
        {certificate.name}
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "3rem" }}>
      <p style={awardTextStyle} className="RobotoMedium">is awarded to</p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={recipientTextStyle} className="RobotoMedium">{certificate.recipient.name}</p>
    </div>
    <div className="d-flex">
      <p style={printTextStyle} className="RobotoMedium">
        ID No: {getRecipientID(certificate.recipient)}
      </p>
    </div>
    <div
      className="d-flex col-lg-6 col-12"
      style={{ marginTop: "1rem", paddingLeft: "0px" }}
    >
      <p style={awardTextStyle} className="RobotoMedium">
        for successful attainment of the required
        <br />
        industry approved competencies
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "3rem" }}>
      <p style={issuersTextStyle} className="RobotoRegular">
        at {certificate.additionalData.assessmentOrgName}
      </p>
    </div>
  </div>
);

export const renderIssuingDate = certificate => (
  <div className="d-flex" style={{ marginTop: "1rem" }}>
    <p style={issuersTextStyle} className="RobotoRegular">{formatDate(certificate.attainmentDate)}</p>
  </div>
);

/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
export default ({ logo }) => ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid", paddingLeft:"80px", paddingRight:"80px", paddingTop:"100px", paddingBottom:"100px", width:"100%", fontFamily:"Arial" }}
    >
      {fonts()}
      {renderLogoWSQ()}
      {renderAwardText(certificate)}
      {renderIssuingDate(certificate)}
      {certificate.additionalData.certSignatories
        ? renderSignature(certificate)
        : ""}
    </div>
  </div>
);
