import { get } from "lodash";
import { IMG_SEAL, IMG_SSGLOGO, NEA_LOGO } from "../common";
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
        The training and assessment of the abovementioned learner are accredited{" "}
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
    <div
      className="col-lg-4 col-xs-12 d-flex"
      style={{ flexDirection: "column" }}
    >
      <div style={{ flex: "1", marginTop: "60px" }}>
        <p style={styles.printTextStyle} className="RobotoRegular">
          Cert No: {get(certificate, "additionalData.serialNum")}
        </p>
      </div>
      <div style={styles.footerTextStyleHalfWidth} className="RobotoRegular">
        <p>In partnership with</p>
      </div>
      <div
        style={{
          display: "flex",
          minHeight: "96px",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div className="col-lg-7 col-8">
          <img style={styles.footerLogoStyle} src={NEA_LOGO} />
        </div>
        <div className="col-lg-5 col-6">
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
      className="d-flex col-lg-6"
      style={{ marginTop: "1rem", marginBottom: "3rem", paddingLeft: "0rem" }}
    >
      <p style={styles.awardTextStyle} className="RobotoMedium">
        for successful attainment of the following
        <br />
        industry approved competencies
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
