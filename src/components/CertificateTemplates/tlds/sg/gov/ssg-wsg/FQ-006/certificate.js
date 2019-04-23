import { get } from "lodash";
import { IMG_LOGO, IMG_SEAL, DIGIPEN_LOGO } from "../common";
import { formatDate, formatCertID, getRecipientID } from "../common/functions";

export const fullWidthStyle = {
  width: "90%",
  height: "auto",
  marginBottom: "10px"
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
  fontWeight: "500!important"
};

export const issuersTextStyle = {
  fontWeight: "500!important",
  textAlign: "center",
  fontSize: "24px"
};

export const awardTextStyle = {
  fontSize: "22px",
  color: "rgb(197,41,155)",
  fontWeight: "bold"
};

export const singaporeTextStyle = {
  fontSize: "3rem"
};

export const nameTextStyle = {
  fontSize: "2.3rem",
  textAlign: "center",
  fontWeight: "bold",
  wordBreak: "break-word"
};

export const specTextStyle = {
  fontSize: "2rem",
  textAlign: "center",
  wordBreak: "break-word"
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
  fontSize: "14px",
  fontWeight: "bold"
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
  transform: "rotate(-90deg)",
  position: "absolute",
  right: "5.5rem"
};

export const footerLogoStyle = {
  width: "75%",
  height: "auto"
};
export const renderLogoWSQ = () => (
  <div className="row d-flex" style={{ marginTop: "3rem" }}>
    <div className="col-lg-6 col-12">
      <img style={fullWidthStyle} src={IMG_LOGO} />
    </div>
    <div className="col-lg-6 col-12">
      <img style={fullWidthStyle} src={DIGIPEN_LOGO} />
    </div>
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

    <div className="col-lg-10">
      <div className="row">
        <div className="col-lg-6 col-12">
          <div className="col-lg-4 col-12">
            <img
              style={signatureWidthStyle}
              src={get(
                certificate,
                "additionalData.certSignatories[0].signature"
              )}
            />
          </div>
          <div style={designationTextStyle}>
            {get(certificate, "additionalData.certSignatories[0].name")},{" "}
            {get(certificate, "additionalData.certSignatories[0].position")}
          </div>
          <div style={designationTextStyle}>
            {get(certificate, "additionalData.certSignatories[0].organisation")}
          </div>
        </div>
        <div className="col-lg-6 col-12" style={{ paddingLeft: "0px" }}>
          <div className="col-lg-4 col-12">
            <img
              style={signatureWidthStyle}
              src={get(
                certificate,
                "additionalData.certSignatories[1].signature"
              )}
            />
          </div>
          <div style={designationTextStyle}>
            {get(certificate, "additionalData.certSignatories[1].name")},{" "}
            {get(certificate, "additionalData.certSignatories[1].position")}
          </div>
          <div style={designationTextStyle}>
            {get(certificate, "additionalData.certSignatories[1].organisation")}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-7 col-12" style={{ paddingLeft: "0px" }}>
          <div style={footerTextStyle}>
            The training and assessment of the abovementioned learner are
            accredited
            <br />
            in accordance with the Singapore Workforce Skills Qualifications
            System
          </div>
          <div style={footerTextStyle}>
            <a style={{ color: "rgb(51,0,144)" }} href="www.ssg.gov.sg">
              www.ssg.gov.sg
            </a>
            <br />
            For verification of this certificate, please visit{" "}
            <a href="https://myskillsfuture.sg/verify_eCert.html">
              https://myskillsfuture.sg/verify_eCert.html
            </a>
          </div>
        </div>
        <div className="col-lg-5 col-12" style={{ paddingLeft: "0px" }}>
          <div
            style={{ marginBottom: "70px", marginTop: "60px", display: "flex" }}
          >
            <div>
              <p style={printTextStyle}>
                Cert No: {get(certificate, "additionalData.serialNum")}
              </p>
            </div>
            <div style={certCodeStyle}>
              {get(certificate, "additionalData.certCode")}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "2rem" }}
    >
      <p style={nameTextStyle}>
        {get(certificate, "qualificationLevel[0].description")} in{" "}
        {certificate.name}
      </p>
    </div>
    <div className="d-flex justify-content-center">
      <p style={specTextStyle}>{certificate.additionalData.specialization}</p>
    </div>
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "3rem" }}
    >
      <p style={awardTextStyle}>is awarded to</p>
    </div>
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "1rem" }}
    >
      <p style={recipientTextStyle}>{certificate.recipient.name}</p>
    </div>
    <div className="d-flex justify-content-center">
      <p style={printTextStyle}>
        ID No: {getRecipientID(certificate.recipient)}
      </p>
    </div>
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "2rem" }}
    >
      <div className="col-lg-6 col-12 text-center" style={awardTextStyle}>
        for successful attainment of the required
        <br />
        industry approved competencies
      </div>
    </div>
  </div>
);

export const renderIssuingDate = certificate => (
  <div className="d-flex justify-content-center" style={{ marginTop: "3rem" }}>
    <p style={issuersTextStyle}>{formatDate(certificate.attainmentDate)}</p>
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
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid",paddingLeft:"40px",paddingRight:"40px",paddingBottom:"100px", width:"100%", fontFamily:"Arial" }}
    >
      {renderLogoWSQ()}
      {renderAwardText(certificate)}
      {renderIssuingDate(certificate)}
      {certificate.additionalData.certSignatories
        ? renderSignature(certificate)
        : ""}
    </div>
  </div>
);
