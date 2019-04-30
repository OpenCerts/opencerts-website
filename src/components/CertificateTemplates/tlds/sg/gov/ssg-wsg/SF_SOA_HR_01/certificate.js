import { get } from "lodash";
import { IMG_SEAL, IMG_SSGLOGO } from "../common";
import {
  getRecipientID,
  renderLogoWSQ,
  renderIssuingDate
} from "../common/functions";
import fonts from "../common/fonts";
import * as styles from "../common/style";

export const renderSignature = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    <div className="col-lg-2 col-6">
      <img style={styles.sealWidthStyle} src={IMG_SEAL} />
    </div>

    <div className="col-lg-6">
      <div className="col-lg-3 col-12">
        <img
          style={styles.signatureWidthStyle}
          src={get(certificate, "additionalData.certSignatories[0].signature")}
        />
      </div>
      <div style={styles.designationTextStyle} className="RobotoBold">
        {get(certificate, "additionalData.certSignatories[0].name")},{" "}
        {get(certificate, "additionalData.certSignatories[0].position")}
      </div>
      <div style={styles.designationTextStyle} className="RobotoBold">
        {get(certificate, "additionalData.certSignatories[0].organisation")}
      </div>
      <div style={styles.footerTextStyle} className="RobotoLight">
        The training and assessment of the abovementioned learner are accredited
        in accordance with the Singapore Workforce Skills Qualifications
        System.This WSQ programme is aligned to the Skills Framework.
      </div>
      <div style={styles.footerTextStyle} className="RobotoLight">
        <a style={{ color: "rgb(51,0,144)" }} href="www.ssg.gov.sg">
          www.ssg.gov.sg
        </a>
        <br />
        For verification of this certificate, please visit
        https://myskillsfuture.sg/verify_eCert.html
      </div>
    </div>
    <div
      className="col-lg-4 col-xs-12 d-flex"
      style={{ flexDirection: "column" }}
    >
      <div style={{ flex: "1", marginTop: "30px" }}>
        <p style={styles.printTextStyle} className="RobotoRegular">
          Cert No: {get(certificate, "additionalData.serialNum")}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          minHeight: "96px",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="col-lg-9 col-9">
          <img style={styles.footerLogoStyle} src={IMG_SSGLOGO} />
        </div>

        <div className="col-lg-5 col-5">
          <p style={styles.certCodeStyle}>
            {get(certificate, "additionalData.certCode")}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div
      className="d-flex col-lg-9"
      style={{ marginTop: "2rem", padding: "0px" }}
    >
      <p style={styles.soaNameTextStyle} className="RobotoRegular">
        {certificate.name}
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "3rem" }}>
      <p style={styles.awardTextStyle} className="RobotoMedium">
        is awarded to
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "1rem" }}>
      <p style={styles.recipientTextStyle} className="RobotoMedium">
        {certificate.recipient.name}
      </p>
    </div>
    <div className="d-flex">
      <p style={styles.printTextStyle} className="RobotoMedium">
        ID No: {getRecipientID(certificate.recipient)}
      </p>
    </div>
    <div
      className="d-flex col-lg-9"
      style={{ marginTop: "1rem", padding: "0px" }}
    >
      <p style={styles.awardTextStyle} className="RobotoMedium">
        for successfully meeting the requirements of the above programme and
        attainment of the competencies in the following modules of the Human
        Resource WSQ Framework:
      </p>
    </div>
    {certificate.transcript.map(item => (
      <div className="d-flex" key={item.courseCode}>
        <p style={styles.soaTranscriptTextStyle} className="RobotoMedium">
          - {item.name} ({item.courseCode})
        </p>
      </div>
    ))}
    <div className="d-flex" style={{ marginTop: "3rem" }}>
      <p style={styles.issuersTextStyle} className="RobotoRegular">
        at {certificate.additionalData.assessmentOrgName}
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
