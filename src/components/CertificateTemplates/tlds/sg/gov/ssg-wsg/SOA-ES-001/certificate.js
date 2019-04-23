import { get } from "lodash";
import { IMG_LOGO, IMG_SEAL, IMG_SSGLOGO, CASAS_LOGO } from "../common";
import { formatDate, formatCertID, getRecipientID } from "../common/functions";

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

export const sealWidthStyle = {
  width: "100%",
  height: "auto"
};

export const signatureWidthStyle = {
  width: "100%",
  height: "auto",
  marginBottom: "10%"
};

export const printTextStyle = {
  fontWeight: "500!important"
};

export const issuersTextStyle = {
  fontWeight: "500!important",
  fontSize: "24px"
};

export const transcriptTextStyle = {
  fontWeight: "500!important",
  fontSize: "24px",
  marginBottom: "0px"
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
  fontSize: "2.3rem",
  fontWeight: "bold",
  color: "rgb(197,41,155)",
  wordBreak: "break-word"
};

export const recipientTextStyle = {
  fontSize: "1.8rem",
  marginBottom: "0px",
  wordBreak: "break-word"
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

export const minHeightfooterTextStyle = {
  minHeight: "55px",
  fontSize: "12px",
  color: "rgb(51,0,144)",
  marginTop: "15px"
};

export const certCodeStyle = {
  fontSize: "12px",
  color: "#ea649c",
  display: "inline-table",
  transform: "rotate(-90deg)",
  width: "max-content",
  position: "absolute",
  left: "0",
  bottom: "30px"
};

export const signatureFooterLogoStyle = {
  width: "50%",
  height: "auto"
};

export const footerLogoStyle = {
  width: "70%",
  height: "auto",
  marginLeft: "auto",
  marginRight: "auto"
};
export const renderLogoWSQ = () => (
  <div className="row d-flex" style={{ marginTop: "3rem" }}>
    <div className="col-lg-6 col-12">
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

    <div className="col-lg-6">
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
      <img style={signatureFooterLogoStyle} src={IMG_SSGLOGO} />
      <div style={minHeightfooterTextStyle}>
        The training and assessment of the abovementioned learner are accredited{" "}
        <br />
        in accordance with the Singapore Workforce Skills Qualifications System.
      </div>
      <div style={footerTextStyle}>
        <a href="www.ssg.gov.sg">www.ssg.gov.sg</a>
        <br />
        <p>
          For verification of this certificate, please visit{" "}
          <a href="https://myskillsfuture.sg/verify_eCert.html">
            https://myskillsfuture.sg/verify_eCert.html
          </a>
        </p>
      </div>
    </div>
    <div className="col-lg-4 col-xs-12 d-flex">
      <div
        className="col-lg-10 col-8"
        style={{ textAlign: "right", alignSelf: "flex-end", padding: "0px" }}
      >
        <div style={{ flex: "1", marginTop: "60px" }}>
          <p style={printTextStyle}>
            Cert No: {get(certificate, "additionalData.serialNum")}
          </p>
        </div>
        <div style={footerTextStyle}>
          <p>
            A workplace literacy assessment system for adults
            <br />
            developed in colaboration with
          </p>
        </div>
        <div>
          <img style={footerLogoStyle} src={CASAS_LOGO} />
        </div>
        <div style={footerTextStyle}>
          <p>
            Recognised by
            <br />
            the US Departments of Education and Labour
          </p>
        </div>
      </div>
      <div
        className="col-lg-2 col-4"
        style={{ display: "block", position: "relative", padding: "0px" }}
      >
        <p style={certCodeStyle}>
          {get(certificate, "additionalData.certCode")}
        </p>
      </div>
    </div>
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "2rem" }}>
      <p style={nameTextStyle}>STATEMENT OF ATTAINMENT</p>
    </div>
    <div className="d-flex" style={{ marginTop: "3rem" }}>
      <p style={awardTextStyle}>is awarded to</p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={recipientTextStyle}>{certificate.recipient.name}</p>
    </div>
    <div className="d-flex">
      <p style={printTextStyle}>
        ID No: {getRecipientID(certificate.recipient)}
      </p>
    </div>
    <div
      className="d-flex col-lg-5"
      style={{ marginTop: "1rem", marginBottom: "3rem", paddingLeft: "0rem" }}
    >
      <p style={awardTextStyle}>
        for successful attainment of the required competencies in
      </p>
    </div>
    {certificate.transcript.map(item => (
      <div className="d-flex" key={item.courseCode}>
        <p style={transcriptTextStyle}>
          {item.courseCode} {item.name}
        </p>
      </div>
    ))}
    <div className="d-flex" style={{ marginTop: "3rem" }}>
      <p style={issuersTextStyle}>
        at {certificate.additionalData.assessmentOrgName}
      </p>
    </div>
  </div>
);

export const renderIssuingDate = certificate => (
  <div className="d-flex" style={{ marginTop: "1rem" }}>
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
