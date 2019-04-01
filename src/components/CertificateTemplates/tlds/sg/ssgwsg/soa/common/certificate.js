import { get } from "lodash";
import { IMG_LOGO_FQ001, IMG_SEAL_FQ001, IMG_SSGLOGO_FQ001 } from "./images";
import {
  formatDate,
  formatDatePrefix,
  formatCertName,
  formatCertID
} from "./functions";

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

export const sealWidthStyle = {
  width: "160px",
  height: "auto"
};

export const signatureWidthStyle = {
  width: "100px",
  height: "auto"
};

export const printTextStyle = {
  fontWeight: "500!important",
  fontWize: "1.2rem",
  color: "#555",
  textAlign: "center"
};

export const awardTextStyle = {
  fontSize: "22px",
  color: "rgb(197,41,155)",
  fontWeight: "bold",
  textAlign: "center"
};

export const singaporeTextStyle = {
  color: "#555",
  fontSize: "3rem"
};

export const nameTextStyle = {
  fontSize: "3rem",
  textAlign: "center"
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
  width: "80%",
  height: "auto"
};
export const renderLogoNP = () => (
  <div
    className="row d-flex"
    style={{ marginTop: "3rem" }}
  >
    <div className="col-5">
      <img style={fullWidthStyle} src={IMG_LOGO_FQ001} />
    </div>
  </div>
);

export const renderSignature = certificate => (
  <div
    className="row d-flex justify-content-center align-items-end"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    <div className="col-2">
      <img style={sealWidthStyle} src={IMG_SEAL_FQ001} />
    </div>

    <div className="col-7" style={{paddingLeft: "25px"}}>
      <div className="px-4">
        <img
          style={signatureWidthStyle}
          src={get(certificate, "additionalData.certSignatories[0].signature")}
        />
      </div>
      <div  style={designationTextStyle}>
        {get(certificate, "additionalData.certSignatories[0].name")}, {get(certificate, "additionalData.certSignatories[0].position")}
      </div>
      <div style={designationTextStyle}>
        {get(certificate, "additionalData.certSignatories[0].organisation")}
      </div>
      <div style={footerTextStyle}>
        {get(certificate, "additionalData.description")}
      </div>
      <div style={footerTextStyle}>
        <a href={get(certificate, "additionalData.link")}>{get(certificate, "additionalData.link")}</a><br/>
        {get(certificate, "additionalData.about")}
      </div>
    </div>
    <div className="col-3">
      <div style={{marginBottom: "70px"}}>
        <p style={printTextStyle}>
        Cert No:  {get(certificate, "additionalData.qual_serial_num")}
        </p>
      </div>
      <img style={footerLogoStyle} src={IMG_SSGLOGO_FQ001} />
      <div style={certCodeStyle}>{get(certificate, "additionalData.cert_code")}</div>
    </div>
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div className="row d-flex" style={{ marginTop: "2rem" }}>
    <p style={nameTextStyle}>{certificate.name}</p>
    </div>
    <div
      className="row d-flex" style={{ marginTop: "3rem" }}  >
      <p style={awardTextStyle}>{certificate.additionalData.award_text}</p>
    </div>
    <div className="row d-flex" style={{ marginTop: "1rem" }}>
      <p style={nameTextStyle}>{certificate.recipient.name}</p>
    </div>
    <div className="row d-flex">
      <p style={printTextStyle}>
      ID No:  {certificate.recipient.id}
      </p>
    </div>
    <div className="row d-flex" style={{ marginTop: "1rem" }}>
      <p style={awardTextStyle}>
      {certificate.additionalData.successful_text}
      </p>
    </div>
    <div className="row d-flex" style={{ marginTop: "3rem" }}>
      <p style={printTextStyle}>
      at {certificate.issuers[0].name}
      </p>
    </div>
  </div>
);

export const renderIssuingDate = certificate => (
  <div class="row d-flex" style={{ marginTop: "1rem" }}>
    <p>
      {formatDatePrefix(certificate.issuedOn)}{" "}
      {formatDate(certificate.issuedOn)}
    </p>
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
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid",paddingLeft:"100px",paddingRight:"100px", fontFamily:"Arial" }}
    >
      {renderLogoNP()}
      {renderAwardText(certificate)}
      {renderIssuingDate(certificate)}
      {certificate.additionalData.certSignatories
        ? renderSignature(certificate)
        : ""}
    </div>
  </div>
);
