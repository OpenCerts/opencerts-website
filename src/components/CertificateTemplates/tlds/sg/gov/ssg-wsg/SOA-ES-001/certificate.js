import { get } from "lodash";
import { IMG_SEAL, IMG_SSGLOGO, CASAS_LOGO } from "../common";
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
      <img style={styles.signatureFooterLogoStyle} src={IMG_SSGLOGO} />
      <div style={styles.minHeightfooterTextStyle} className="RobotoLight">
        The training and assessment of the abovementioned learner are accredited
        <br />
        in accordance with the Singapore Workforce Skills Qualifications System.
      </div>
      <div style={styles.footerTextStyle} className="RobotoLight">
        <a style={{ color: "rgb(51,0,144)" }} href="www.ssg.gov.sg">
          www.ssg.gov.sg
        </a>
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
          <p style={styles.printTextStyle} className="RobotoRegular">
            Cert No: {get(certificate, "additionalData.serialNum")}
          </p>
        </div>
        <div style={styles.footerTextStyle} className="RobotoRegular">
          <p>
            A workplace literacy assessment system for adults
            <br />
            developed in colaboration with
          </p>
        </div>
        <div>
          <img style={styles.footerLogoStyle} src={CASAS_LOGO} />
        </div>
        <div style={styles.footerTextStyle}>
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
        <p style={styles.soaCertCodeStyle}>
          {get(certificate, "additionalData.certCode")}
        </p>
      </div>
    </div>
  </div>
);

export const renderAwardText = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "2rem" }}>
      <p style={styles.soaNameTextStyle} className="RobotoRegular">
        STATEMENT OF ATTAINMENT
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
      className="d-flex col-lg-5"
      style={{ marginTop: "1rem", marginBottom: "3rem", paddingLeft: "0rem" }}
    >
      <p style={styles.awardTextStyle} className="RobotoMedium">
        for successful attainment of the required competencies in
      </p>
    </div>
    {certificate.transcript.map(item => (
      <div className="d-flex" key={item.courseCode}>
        <p style={styles.transcriptTextStyle} className="RobotoMedium">
          {item.courseCode} {item.name}
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
