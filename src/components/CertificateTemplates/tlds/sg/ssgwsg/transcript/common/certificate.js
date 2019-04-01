import { get } from "lodash";
import { IMG_LOGO_FQ001, IMG_SSGLOGO_FQ001 } from "./images";
import { formatDate, formatDatePrefix, formatCertID } from "./functions";

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
  fontWeight: "bold",
  fontWize: "1.2rem",
  color: "#555",
  textAlign: "center"
};

export const qualTextStyle = {
  fontSize: "22px",
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

export const headerTextStyle = {
  fontSize: "3rem",
  textAlign: "center",
  color: "rgb(197, 41, 155)"
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

export const renderLogoNP = () => (
  <div className="row d-flex" style={{ marginTop: "3rem" }}>
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
    <div className="col-7">
      <div style={designationTextStyle}>
        {get(certificate, "additionalData.certSignatories[0].position")}
      </div>
      <div style={designationTextStyle}>
        {get(certificate, "additionalData.certSignatories[0].organisation")}
      </div>
      <div style={footerTextStyle}>
        Transcript guide printed on reverse
        <br />
        For verification of this certificate, please visit
        https://e-cert.ssg.gov.sg
      </div>
    </div>
    <div className="col-2" />
    <div className="col-3">
      <img style={fullWidthStyle} src={IMG_SSGLOGO_FQ001} />
      <div style={certCodeStyle}>
        {get(certificate, "additionalData.cert_code")}
      </div>
    </div>
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div className="row d-flex" style={{ marginTop: "2rem" }}>
      <p style={headerTextStyle}>{certificate.name}</p>
    </div>
    <div className="row d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>Name: {certificate.recipient.name}</p>
    </div>
    <div className="row d-flex">
      <p style={printTextStyle}>ID No.: {certificate.recipient.id}</p>
    </div>
    <div className="row d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>Qualification:</p>
    </div>
    <div className="row d-flex">
      <p style={qualTextStyle}>{certificate.name}</p>
    </div>
    <div className="row d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>
        CONFERMENT: CONFERRED THE {certificate.name} on{" "}
        {formatDatePrefix(certificate.issuedOn)}{" "}
        {formatDate(certificate.issuedOn)}
      </p>
    </div>
  </div>
);

export const renderTranscript = certificate => (
  <div>
    <div className="row d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>Remarks:</p>
    </div>
    <div className="row d-flex">
      <table>
        <tr>
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
      {renderTranscript(certificate)}
      {certificate.additionalData.certSignatories
        ? renderSignature(certificate)
        : ""}
    </div>
  </div>
);
