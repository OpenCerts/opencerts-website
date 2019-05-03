import { tz } from "moment-timezone";
import { get } from "lodash";
import { IMG_LOGO, IMG_SEAL, NICF_LOGO, IMG_SSGLOGO } from "./images";
import * as styles from "./style";

const TIMEZONE = "Asia/Singapore";

export const formatDate = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  return `${tz(date, TIMEZONE).format("DD MMM YYYY")}`;
};

export const formatNRIC = nricFin => {
  if (!nricFin) return null;
  const arrayNric = nricFin.split(":");
  return arrayNric.length === 3 ? arrayNric[2] : null;
};

export const formatCertName = (certName, meritFlag) => {
  let certDipDisplay = "";
  if (meritFlag === "Y") {
    certDipDisplay = "Diploma with Merit";
  } else {
    certDipDisplay = "Diploma";
  }

  return (
    <p>
      {certDipDisplay}
      <br />
      in
      <br />
      {certName}
    </p>
  );
};

export const formatCertID = certId => {
  if (!certId) return null;
  const arrayCertId = certId.split(":");
  return arrayCertId.length > 0 ? arrayCertId[0] : null;
};

export const getRecipientID = recipient => {
  if (!recipient) return null;

  if (recipient.nric) {
    return recipient.nric;
  }
  if (recipient.fin) {
    return recipient.fin;
  }
  if (recipient.id) {
    return recipient.id;
  }
  return null;
};

export const getSpecialization = additionalData => {
  if (
    additionalData.specialization === undefined ||
    additionalData.specialization === null ||
    additionalData.specialization === "null" ||
    additionalData.specialization.trim() === ""
  ) {
    return "";
  }

  if (additionalData.specialization) {
    return `- ${additionalData.specialization}`;
  }
  return "";
};

export const renderLogoWSQ = () => (
  <div className="row d-flex">
    <div className="col-lg-5 col-12" style={{ paddingRight: "0px" }}>
      <img style={styles.fullWidthStyle} src={IMG_LOGO} />
    </div>
    <div className="col-lg-6" />
  </div>
);

export const renderIssuingDate = certificate => (
  <div className="d-flex" style={{ marginTop: "1rem" }}>
    <p style={styles.issuersTextStyle} className="RobotoRegular">
      {formatDate(certificate.attainmentDate)}
    </p>
  </div>
);

export const renderLogoNICF = () => (
  <div className="row d-flex">
    <div className="col-lg-4 col-12">
      <img style={styles.fullWidthStyle} src={NICF_LOGO} />
    </div>
    <div className="col-lg-6" />
  </div>
);

export const renderAwardTextSOA = certificate => (
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
      className="d-flex col-lg-6 col-12"
      style={{ marginTop: "1rem", marginBottom: "3rem", paddingLeft: "0px" }}
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

export const renderSignatureSOAIT = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    <div className="col-lg-2 col-6">
      <img style={styles.sealWidthStyle} src={IMG_SEAL} />
    </div>
    <div className="col-lg-10 col-12 row d-flex justify-content-center">
      <div className="col-lg-8">
        <div className="col-lg-3 col-12">
          <img
            style={styles.signatureWidthStyle}
            src={get(
              certificate,
              "additionalData.certSignatories[0].signature"
            )}
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
          The training and assessment of the abovementioned learner are
          accredited
          <br />
          in accordance with the Singapore Workforce Skills Qualifications
          System.
          <br />
          {get(certificate, "additionalData.certCode").startsWith(
            "SF_SOA_IT_001"
          )
            ? "This WSQ programme is aligned to the Skills Framework."
            : ""}
        </div>
      </div>
      <div className="col-lg-4 col-xs-12">
        <div style={{ marginBottom: "70px", marginTop: "60px" }}>
          <p style={styles.printTextStyle} className="RobotoRegular">
            Cert No: {get(certificate, "additionalData.serialNum")}
          </p>
        </div>
      </div>
      <div className="col-lg-5 col-12">
        <div style={styles.footerAboutTextStyle} className="RobotoLight">
          <a href="https://www.ssg.gov.sg">www.ssg.gov.sg</a>
          <br />
          For verification of this certificate, please visit <br />
          <a href="https://myskillsfuture.sg/verify_eCert.html">
            https://myskillsfuture.sg/verify_eCert.html
          </a>
        </div>
      </div>
      <div
        className="col-lg-7 col-12 d-flex justify-content-center"
        style={{ alignItems: "center" }}
      >
        <div style={{ margin: "15px" }}>
          <img style={styles.dualLogoFooter} src={IMG_LOGO} />
          <img style={styles.dualLogoFooter} src={IMG_SSGLOGO} />
        </div>
        <div style={styles.certCodeStyle}>
          {get(certificate, "additionalData.certCode")}
        </div>
      </div>
    </div>
  </div>
);
