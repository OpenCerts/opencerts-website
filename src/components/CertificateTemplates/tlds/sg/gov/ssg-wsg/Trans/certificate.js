import { get } from "lodash";
import { IMG_LOGO, IMG_SSGLOGO } from "../common";
import {
  formatDate,
  formatCertID,
  getRecipientID,
  getSpecialization
} from "../common/functions";
import fonts from "../common/fonts";
import * as styles from "../common/style";

const renderTranscriptItems = certificate =>
  certificate.transcript.map(item => (
    <tr key={item.courseCode} className="RobotoLight">
      <td>{item.courseCode}</td>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{formatDate(item.examinationDate)}</td>
      <td>{item.assessmentOrgName}</td>
    </tr>
  ));

export const renderLogoWSQ = () => (
  <div className="row d-flex">
    <div className="col-lg-4 col-12">
      <img style={styles.fullWidthStyle} src={IMG_LOGO} />
    </div>
  </div>
);

export const renderSignature = certificate => (
  <div
    className="row d-flex justify-content-center align-items-end"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    <div className="col-lg-7 col-xs-12">
      <div style={styles.designationTextStyle} className="RobotoLight">
        {get(certificate, "additionalData.certSignatories[0].position")}
      </div>
      <div style={styles.designationTextStyle} className="RobotoLight">
        {get(certificate, "additionalData.certSignatories[0].organisation")}
      </div>
      <div style={styles.footerTextStyle} className="RobotoLight">
        Transcript guide printed on reverse
      </div>
      <div style={styles.footerLinkStyle} className="RobotoLight">
        For verification of this certificate, please visit{" "}
        <a href="https://myskillsfuture.sg/verify_eCert.html">
          https://myskillsfuture.sg/verify_eCert.html
        </a>
      </div>
    </div>
    <div className="col-lg-2 col-xs-12" />
    <div className="col-lg-3 col-xs-12">
      <img style={styles.transFooterLogoStyle} src={IMG_SSGLOGO} />
      <div style={styles.certCodeStyle} className="RobotoRegular">
        TRA
      </div>
    </div>
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "2rem" }}>
      <p style={styles.headerTextStyle} className="RobotoBold">
        OFFICIAL TRANSCRIPT
      </p>
    </div>
    <div className="row d-flex align-items-end" style={{ marginTop: "1rem" }}>
      <div className="col-lg-10 col-xs-12">
        <span style={styles.transNameTextStyle} className="RobotoMedium">
          Name: {certificate.recipient.name}
        </span>
      </div>
      <div className="col-lg-2 col-xs-12">
        <span>{get(certificate, "additionalData.serialNum")}</span>
      </div>
    </div>
    <div className="d-flex">
      <p style={styles.transNameTextStyle} className="RobotoMedium">
        ID No.: {getRecipientID(certificate.recipient)}
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={styles.qualHeaderStyle} className="RobotoMedium">
        Qualification:
      </p>
    </div>
    <div className="d-flex">
      <p style={styles.qualTextStyle} className="RobotoMedium">
        {get(certificate, "qualificationLevel[0].description")} in{" "}
        {certificate.name} {getSpecialization(certificate.additionalData)}
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={styles.confermentTextStyle} className="RobotoRegular">
        CONFERMENT: CONFERRED THE{" "}
        {get(certificate, "qualificationLevel[0].description")} in{" "}
        {certificate.name} {getSpecialization(certificate.additionalData)} on{" "}
        {formatDate(certificate.attainmentDate)}
      </p>
    </div>
  </div>
);

export const renderTranscript = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={styles.printTextStyle} className="RobotoRegular">
        REMARKS:{" "}
        {get(certificate, "$template").includes("sg/gov/ssg-wsg/Trans") ? (
          ""
        ) : (
          <span style={{ fontWeight: "bold", color: "#FF0000" }}>
            Certified Copy
          </span>
        )}
      </p>
    </div>
    <div className="d-flex" style={{ overflowX: "auto" }}>
      <table cellPadding="10">
        <thead className="RobotoLight">
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
    <div className="d-flex" style={{ marginTop: "15rem" }}>
      <p style={styles.copyrightStyle} className="RobotoLight">
        Copyright @ 2016 All Rights Reserved SkillsFuture Singapore Agency
      </p>
    </div>
  </div>
);

export const renderQualificationText = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "3rem" }}>
      <p style={styles.printTextStyle} className="RobotoRegular">
        A qualification is awarded to an individual in recognition of his/her
        attainment of the required industry validated competencies under the
        Singapore Workforce Skills Qualifications System (WSQ)
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={styles.printTextStyle} className="RobotoRegular">
        SINGAPORE WORKFORCE SKILLS QUALIFICATIONS SYSTEM
      </p>
    </div>
    <div className="d-flex">
      <p className="RobotoLight">
        The WSQ is a national credential system that trains, develops, assesses
        and certifies skills and competencies for the workforce. As a continuing
        education and training (CET) system, WSQ supports the SkillsFuture
        movement to:
      </p>
    </div>
    <div className="d-flex">
      <ul>
        <li className="RobotoLight">
          Promote recognition of skills and competencies to facilitate
          progression, mastery and mobility;
        </li>
        <li className="RobotoLight">
          Promote holistic development of workforce through technical and
          generic skills and competencies;
        </li>
        <li className="RobotoLight">
          Support economic development by professionalising skills and
          competencies to drive industry transformation efforts; and
        </li>
        <li className="RobotoLight">Encourage lifelong learning</li>
      </ul>
    </div>
    <div className="d-flex">
      <p className="RobotoLight">
        Training programmes developed by training providers under the WSQ system
        are based on the Technical Skill and Competencies (TSCs) and Generic
        Skills and Competencies (GSCs) covered in the Skills Frameworks that had
        been validated by employers, unions and professional bodies. This
        process ensures existing and emerging skills and competencies that are
        in demand are used to inform training and development under WSQ.
      </p>
    </div>
    <div className="d-flex">
      <p className="RobotoLight">
        The TSCs comprise job-specific knowledge, skills and abilities that an
        individual needs to have to perform the work functions and key tasks
        required for the job while the GSCs consist of transferable skills and
        competencies. The WSQ programmes are funded and quality-assured by
        SkillsFuture Singapore (SSG), which awards the WSQ certifications.
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={styles.printTextStyle} className="RobotoRegular">
        WSQ QUALIFICATIONS PROGRESSION PATH
      </p>
    </div>
    <div className="d-flex">
      <p className="RobotoLight">
        WSQ provides a coherent and comprehensive system of qualifications which
        consists of the following levels:
      </p>
    </div>
    <div className="d-flex">
      <ul>
        <li className="RobotoLight">
          WSQ Graduate Diploma / WSQ Graduate Certificate
        </li>
        <li className="RobotoLight">WSQ Specialist Diploma</li>
        <li className="RobotoLight">WSQ Diploma</li>
        <li className="RobotoLight">WSQ Advanced Certificate</li>
        <li className="RobotoLight">WSQ Higher Certificate</li>
        <li className="RobotoLight">WSQ Certificate</li>
      </ul>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={styles.printTextStyle} className="RobotoRegular">
        EXPLANATION OF GRADES GRANTED
      </p>
    </div>
    <div className="d-flex">
      <p>{get(certificate, "additionalData.qualificationPath.desc")}</p>
    </div>
    <div className="d-flex" style={{ overflowX: "auto" }}>
      <table cellPadding="10">
        <tbody>
          <tr className="RobotoLight">
            <td>1.</td>
            <td>Competent</td>
            <td>
              Denotes attainment of the required industry validated competencies
              as assessed through WSQ accredited programmes
            </td>
          </tr>
          <tr className="RobotoLight">
            <td>2.</td>
            <td>Not Yet Competent</td>
            <td>
              Denotes non-attainment of the required industry validated
              competencies as assessed through WSQ accredited programmes
            </td>
          </tr>
          <tr className="RobotoLight">
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
      <p style={styles.printTextStyle} className="RobotoRegular">
        FOR MORE INFORMATION
      </p>
    </div>
    <div className="d-flex">
      <p className="RobotoLight">
        Details on the WSQ are available at{" "}
        <a href="http://www.ssg.gov.sg/wsq.html">
          http://www.ssg.gov.sg/wsq.html
        </a>
      </p>
    </div>
  </div>
);
/* eslint-disable */
// Disabled eslint as there's no way to add proptypes to an anonymous function like this
export default ({ logo }) => ({ certificate }) => (
  <div>
    <div
      className="container"
      style={{ border: 5, borderColor: "#AAA", borderStyle: "solid", paddingLeft:"6%", paddingRight:"6%", paddingBottom:"100px", paddingTop:"100px", fontFamily:"Arial", width:"100%" }}
    >
      {fonts()}
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
