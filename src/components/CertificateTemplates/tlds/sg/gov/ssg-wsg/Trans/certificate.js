import { get } from "lodash";
import { IMG_LOGO, IMG_SSGLOGO } from "../common";
import { formatDate, formatCertID, getRecipientID } from "../common/functions";

export const fullWidthStyle = {
  width: "100%",
  height: "auto"
};

export const nameTextStyle = {
  fontWeight: "bold",
  fontSize: "1.3rem"
};

export const printTextStyle = {
  fontWeight: "bold"
};

export const confermentTextStyle = {
  fontWeight: "bold",
  textTransform: "uppercase"
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
    <tr key={item.courseCode}>
      <td>{item.courseCode}</td>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.examinationDate}</td>
      <td>{item.assessmentOrgName}</td>
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
      <div style={footerTextStyle}>Transcript guide printed on reverse</div>
      <div style={footerLinkStyle}>
        For verification of this certificate, please visit
        https://myskillsfuture.sg/verify_eCert.html
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
      <p style={headerTextStyle}>OFFICIAL TRANSCRIPT</p>
    </div>
    <div className="row d-flex align-items-end" style={{ marginTop: "1rem" }}>
      <div className="col-lg-10 col-xs-12">
        <span style={nameTextStyle}>Name: {certificate.recipient.name}</span>
      </div>
      <div className="col-lg-2 col-xs-12">
        <span>{get(certificate, "additionalData.serialNum")}</span>
      </div>
    </div>
    <div className="d-flex">
      <p style={nameTextStyle}>
        ID No.: {getRecipientID(certificate.recipient)}
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={qualHeaderStyle}>Qualification:</p>
    </div>
    <div className="d-flex">
      <p style={qualTextStyle}>
        {get(certificate, "qualificationLevel[0].description")} in{" "}
        {certificate.name} - {get(certificate, "additionalData.specialization")}
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={confermentTextStyle}>
        CONFERMENT: CONFERRED THE{" "}
        {get(certificate, "qualificationLevel[0].description")} in{" "}
        {certificate.name} - {get(certificate, "additionalData.specialization")}{" "}
        on {formatDate(certificate.attainmentDate)}
      </p>
    </div>
  </div>
);

export const renderTranscript = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>REMARKS:</p>
    </div>
    <div className="d-flex" style={{ overflowX: "auto" }}>
      <table cellPadding="10">
        <thead>
          <tr style={{ borderBottom: "2px solid #343a40" }}>
            <th>Competency Unit Code</th>
            <th width="30%">Competency Unit</th>
            <th>Results</th>
            <th>Assessment Date</th>
            <th>Issuing Institute</th>
          </tr>
        </thead>
        <tbody>{renderTranscriptItems(certificate)}</tbody>
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

export const renderCopyright = () => (
  <div>
    <div
      className="d-flex"
      style={{ marginTop: "15rem", marginBottom: "15rem" }}
    >
      <p style={copyrightStyle}>
        Copyright @ 2016 All Rights Reserved SkillsFuture Singapore Agency
      </p>
    </div>
  </div>
);

export const renderQualificationText = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "3rem" }}>
      <p style={printTextStyle}>
        A qualification is awarded to an individual in recognition of his/her
        attainment of the required industry validated competencies under the
        Singapore Workforce Skills Qualifications System (WSQ)
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>
        SINGAPORE WORKFORCE SKILLS QUALIFICATIONS SYSTEM
      </p>
    </div>
    <div className="d-flex">
      <p>
        The WSQ is a national credential system that trains, develops, assesses
        and certifies skills and competencies for the workforce. As a continuing
        education and training (CET) system, WSQ supports the SkillsFuture
        movement to:
      </p>
    </div>
    <div className="d-flex">
      <ul>
        <li>
          Promote recognition of skills and competencies to facilitate
          progression, mastery and mobility;
        </li>
        <li>
          Promote holistic development of workforce through technical and
          generic skills and competencies;
        </li>
        <li>
          Support economic development by professionalising skills and
          competencies to drive industry transformation efforts; and
        </li>
        <li>Encourage lifelong learning</li>
      </ul>
    </div>
    <div className="d-flex">
      <p>
        Training programmes developed by training providers under the WSQ system
        are based on the Technical Skill and Competencies (TSCs) and Generic
        Skills and Competencies (GSCs) covered in the Skills Frameworks that had
        been validated by employers, unions and professional bodies. This
        process ensures existing and emerging skills and competencies that are
        in demand are used to inform training and development under WSQ.
      </p>
    </div>
    <div className="d-flex">
      <p>
        The TSCs comprise job-specific knowledge, skills and abilities that an
        individual needs to have to perform the work functions and key tasks
        required for the job while the GSCs consist of transferable skills and
        competencies. The WSQ programmes are funded and quality-assured by
        SkillsFuture Singapore (SSG), which awards the WSQ certifications.
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>WSQ QUALIFICATIONS PROGRESSION PATH</p>
    </div>
    <div className="d-flex">
      <p>
        WSQ provides a coherent and comprehensive system of qualifications which
        consists of the following levels:
      </p>
    </div>
    <div className="d-flex">
      <ul>
        <li>WSQ Graduate Diploma / WSQ Graduate Certificate</li>
        <li>WSQ Specialist Diploma</li>
        <li>WSQ Diploma</li>
        <li>WSQ Advanced Certificate</li>
        <li>WSQ Higher Certificate</li>
        <li>WSQ Certificate</li>
      </ul>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>EXPLANATION OF GRADES GRANTED</p>
    </div>
    <div className="d-flex">
      <p>{get(certificate, "additionalData.qualificationPath.desc")}</p>
    </div>
    <div className="d-flex" style={{ overflowX: "auto" }}>
      <table cellPadding="10">
        <tbody>
          <tr>
            <td>1.</td>
            <td>Competent</td>
            <td>
              Denotes attainment of the required industry validated competencies
              as assessed through WSQ accredited programmes
            </td>
          </tr>
          <tr>
            <td>2.</td>
            <td>Not Yet Competent</td>
            <td>
              Denotes non-attainment of the required industry validated
              competencies as assessed through WSQ accredited programmes
            </td>
          </tr>
          <tr>
            <td>3.</td>
            <td>Exempted</td>
            <td>
              Denotes attainment of the required industry validated competencies
              as assessed through non-WSQ programmes
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={printTextStyle}>FOR MORE INFORMATION</p>
    </div>
    <div className="d-flex">
      <p>Details on the WSQ are available at http://www.ssg.gov.sg/wsq.html</p>
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
