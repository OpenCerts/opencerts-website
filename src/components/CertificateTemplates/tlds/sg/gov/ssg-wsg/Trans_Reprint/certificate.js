import { get } from "lodash";
import { IMG_LOGO, IMG_SSGLOGO } from "../common";
import { formatDate, formatCertID } from "../common/functions";

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

export const nameTextStyle = {
  fontWeight: "bold",
  fontSize: "1.3rem"
};

export const printTextStyle = {
  fontWeight: "bold",
  textTransform: "uppercase"
};

export const confermentTextStyle = {
  fontWeight: "bold"
};

export const qualHeaderStyle = {
  fontWeight: "bold",
  marginBottom: "0px"
};

export const qualTextStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  textTransform: "uppercase"
};

export const singaporeTextStyle = {
  fontSize: "3rem"
};

export const headerTextStyle = {
  fontSize: "3rem",
  textAlign: "center",
  color: "rgb(197, 41, 155)",
  fontWeight: "bold",
  wordBreak: "break-word"
};

export const titleTextStyle = {
  color: "rgb(30,93,200)",
  fontSize: "3rem",
  textAlign: "center"
};

export const designationTextStyle = {
  fontSize: "16px"
};

export const footerTextStyle = {
  fontSize: "16px",
  marginTop: "15px"
};

export const footerLinkStyle = {
  fontSize: "14px"
};

export const copyrightStyle = {
  fontSize: "14px"
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

const renderTranscriptItems = certificate =>
  certificate.transcript.map(item => (
    <tr key={item.cs_full_code}>
      <td>{item.cs_full_code}</td>
      <td>{item.name}</td>
      <td>{item.result_desc}</td>
      <td>{item.assmt_date}</td>
      <td>{item.assessment_org_name}</td>
    </tr>
  ));

export const renderLogoWSQ = () => (
  <div className="row d-flex" style={{ marginTop: "3rem" }}>
    <div className="col-lg-6 col-12">
      <img style={fullWidthStyle} src={IMG_LOGO} />
    </div>
  </div>
);

export const renderSignature = certificate => (
  <div
    className="row d-flex justify-content-center align-items-end"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    <div className="col-lg-7 col-xs-12">
      <div style={designationTextStyle}>
        {get(certificate, "additionalData.certSignatories[0].position")}
      </div>
      <div style={designationTextStyle}>
        {get(certificate, "additionalData.certSignatories[0].organisation")}
      </div>
      <div style={footerTextStyle}>
        {get(certificate, "additionalData.certLink.desc")}
      </div>
      <div style={footerLinkStyle}>
        {get(certificate, "additionalData.certLink.link")}
      </div>
    </div>
    <div className="col-lg-2 col-xs-12" />
    <div className="col-lg-3 col-xs-12">
      <img style={footerLogoStyle} src={IMG_SSGLOGO} />
      <div style={certCodeStyle}>TRA</div>
    </div>
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "2rem" }}>
      <p style={headerTextStyle}>{certificate.name}</p>
    </div>
    <div className="row d-flex align-items-end" style={{ marginTop: "1rem" }}>
      <div className="col-lg-10 col-xs-12">
        <span style={nameTextStyle}>Name: {certificate.recipient.name}</span>
      </div>
      <div className="col-lg-2 col-xs-12">
        <span>{get(certificate, "additionalData.serial_num")}</span>
      </div>
    </div>
    <div className="d-flex">
      <p style={nameTextStyle}>ID No.: {certificate.recipient.id}</p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={qualHeaderStyle}>Qualification:</p>
    </div>
    <div className="d-flex">
      <p style={qualTextStyle}>{certificate.name}</p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={confermentTextStyle}>
        CONFERMENT: CONFERRED THE {certificate.name} on{" "}
        {formatDate(certificate.issuedOn)}
      </p>
    </div>
  </div>
);

export const renderTranscript = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>REMARKS:</p>
      <p style={{ fontWeight: "bold", color: "#FF0000" }}>CERTIFIED COPY</p>
    </div>
    <div className="d-flex" style={{ overflowX: "auto" }}>
      <table cellPadding="10">
        <tr style={{ borderBottom: "2px solid #343a40" }}>
          <th>Competency Unit Code</th>
          <th width="30%">Competency Unit</th>
          <th>Results</th>
          <th>Assessment Date</th>
          <th>Issuing Institute</th>
        </tr>
        {renderTranscriptItems(certificate)}
      </table>
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

export const renderCopyright = certificate => (
  <div>
    <div
      className="d-flex"
      style={{ marginTop: "15rem", marginBottom: "15rem" }}
    >
      <p style={copyrightStyle}>
        {get(certificate, "additionalData.copyright")}
        Copyright @ 2016 All Rights Reserved SkillsFuture Singapore Agency
      </p>
    </div>
  </div>
);

export const renderQualificationText = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "3rem" }}>
      <p style={printTextStyle}>
        {get(certificate, "additionalData.qualificationStatement")}
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>
        {get(certificate, "additionalData.qualificationSystemDesc.name")}
      </p>
    </div>
    <div className="d-flex">
      <p>{get(certificate, "additionalData.qualificationSystemDesc.desc")}</p>
    </div>
    <div className="d-flex">
      <ul>
        {certificate.additionalData.qualificationSystemDesc.descPoints.map(
          (item, index) => (
            <li key={index}>{item.point}</li>
          )
        )}
      </ul>
    </div>
    <div className="d-flex">
      <p>{get(certificate, "additionalData.trainingProgramDesc2")}</p>
    </div>
    <div className="d-flex">
      <p>{get(certificate, "additionalData.trainingProgramDesc2")}</p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>
        {get(certificate, "additionalData.qualificationPath.name")}
      </p>
    </div>
    <div className="d-flex">
      <p>{get(certificate, "additionalData.qualificationPath.desc")}</p>
    </div>
    <div className="d-flex">
      <ul>
        {certificate.additionalData.qualificationPath.pathPoints.map(
          (item, index) => (
            <li key={index}>{item.point}</li>
          )
        )}
      </ul>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>
        {get(certificate, "additionalData.gradesDesc.name")}
      </p>
    </div>
    <div className="d-flex">
      <p>{get(certificate, "additionalData.qualificationPath.desc")}</p>
    </div>
    <div className="d-flex" style={{ overflowX: "auto" }}>
      <table cellPadding="10">
        {certificate.additionalData.gradesDesc.points.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}.</td>
            <td>{item.name}</td>
            <td>{item.desc}</td>
          </tr>
        ))}
      </table>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>
        {get(certificate, "additionalData.webInfo.name")}
      </p>
    </div>
    <div className="d-flex">
      <p>{get(certificate, "additionalData.webInfo.link")}</p>
    </div>
  </div>
);
/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
export default ({ logo }) => ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid",paddingLeft:"40px",paddingRight:"40px", fontFamily:"Arial" }}
    >
      {renderLogoWSQ()}
      {renderAwardText(certificate)}
      {renderTranscript(certificate)}
      {certificate.additionalData.certSignatories
        ? renderSignature(certificate)
        : ""}
      {renderCopyright(certificate)}
      {renderQualificationText(certificate)}  
      {renderCopyright(certificate)}
    </div>
  </div>
);
