import { get } from "lodash";
import { IMG_LOGO_FQ001, IMG_SEAL_FQ001, IMG_SSGLOGO_FQ001 } from "../common";
import { formatDate, formatCertID } from "../common/functions";

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
  fontWeight: "bold",
  textAlign: "left"
};

export const singaporeTextStyle = {
  fontSize: "3rem"
};

export const nameTextStyle = {
  fontSize: "3rem",
  textAlign: "center",
  fontWeight: "bold",
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
  transform: "rotate(-90deg)"
};

export const footerLogoStyle = {
  width: "75%",
  height: "auto"
};
export const renderLogoWSQ = () => (
  <div className="row d-flex" style={{ marginTop: "3rem" }}>
    <div className="col-lg-6 col-12">
      <img style={fullWidthStyle} src={IMG_LOGO_FQ001} />
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
      <img style={sealWidthStyle} src={IMG_SEAL_FQ001} />
    </div>

    <div className="col-lg-7">
      <div className="col-lg-3 col-12">
        <img
          style={signatureWidthStyle}
          src={get(certificate, "additionalData.certSignatories[0].signature")}
        />
      </div>
      <div style={designationTextStyle}>
        {get(certificate, "additionalData.certSignatories[0].name")},{" "}
        {get(certificate, "additionalData.certSignatories[0].position")}
      </div>
      <div style={designationTextStyle}>
        {get(certificate, "additionalData.certSignatories[0].organisation")}
      </div>
      <div style={footerTextStyle}>
        {get(certificate, "additionalData.description")}
      </div>
      <div style={footerTextStyle}>
        <a href={get(certificate, "additionalData.link")}>
          {get(certificate, "additionalData.link")}
        </a>
        <br />
        {get(certificate, "additionalData.about")}
      </div>
    </div>
    <div className="col-lg-3 col-xs-12">
      <div style={{ marginBottom: "70px", marginTop: "60px" }}>
        <p style={printTextStyle}>
          Cert No: {get(certificate, "additionalData.serial_num")}
        </p>
      </div>
      <img style={footerLogoStyle} src={IMG_SSGLOGO_FQ001} />
      <div style={certCodeStyle}>
        {get(certificate, "additionalData.cert_code")}
      </div>
    </div>
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "2rem" }}>
      <p style={nameTextStyle}>{certificate.name}</p>
    </div>
    <div className="d-flex" style={{ marginTop: "3rem" }}>
      <p style={awardTextStyle}>{certificate.additionalData.award_text}</p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={recipientTextStyle}>{certificate.recipient.name}</p>
    </div>
    <div className="d-flex">
      <p style={printTextStyle}>ID No: {certificate.recipient.id}</p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={awardTextStyle}>{certificate.additionalData.successful_text}</p>
    </div>
    <div className="d-flex" style={{ marginTop: "3rem" }}>
      <p style={issuersTextStyle}>
        at {certificate.additionalData.assessment_org_name}
      </p>
    </div>
  </div>
);

export const renderIssuingDate = certificate => (
  <div className="d-flex" style={{ marginTop: "1rem" }}>
    <p style={issuersTextStyle}>{formatDate(certificate.issuedOn)}</p>
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
