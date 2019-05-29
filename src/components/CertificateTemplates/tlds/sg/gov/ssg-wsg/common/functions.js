import { tz } from "moment-timezone";
import { get } from "lodash";
import {
  IMG_LOGO,
  IMG_SEAL,
  NICF_LOGO,
  IMG_SSGLOGO,
  NEA_LOGO,
  CASAS_LOGO
} from "./images";
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

export const renderFooterText = footerTextStyle => (
  <div style={footerTextStyle} className="RobotoLight">
    <a style={{ color: "rgb(51,0,144)" }} href="https://www.ssg.gov.sg">
      www.ssg.gov.sg
    </a>
    <br />
    <p>
      For verification of this certificate, please visit{" "}
      <a
        style={{ color: "rgb(51,0,144)" }}
        href="https://myskillsfuture.sg/verify_eCert.html"
      >
        https://myskillsfuture.sg/verify_eCert.html
      </a>
    </p>
  </div>
);

export const renderAwardedTo = () => (
  <div className="d-flex" style={{ marginTop: "3rem" }}>
    <p style={styles.awardTextStyle} className="RobotoMedium">
      is awarded to
    </p>
  </div>
);

export const renderRecipientName = certificate => (
  <div className="d-flex" style={{ marginTop: "1rem" }}>
    <p style={styles.recipientTextStyle} className="RobotoMedium">
      {certificate.recipient.name}
    </p>
  </div>
);

export const renderRecipientID = certificate => (
  <div className="d-flex">
    <p style={styles.printTextStyle} className="RobotoMedium">
      ID No: {getRecipientID(certificate.recipient)}
    </p>
  </div>
);

export const renderSeal = () => (
  <div className="col-lg-2 col-6">
    <img style={styles.sealWidthStyle} src={IMG_SEAL} />
  </div>
);

export const switchOperatorFunction = certificate => {
  switch (get(certificate, "additionalData.certCode")) {
    case "SOA_SV_001":
      return " Service Excellence";

    case "SF_SOA_SV_001":
      return " Service Excellence";

    case "SF_SOA_MF_01":
      return " Generic Manufacturing Skills";

    case "SF_SOA_MF_02":
      return " Generic Manufacturing Skills";

    case "SOA-MF-01":
      return " Generic Manufacturing Skills";

    default:
      return " Human Resource";
  }
};

export const renderSignature = certificate => (
  <div>
    {["QUAL_Reprint"].includes(get(certificate, "additionalData.certCode")) ? (
      <div
        className="col-lg-5 col-12"
        style={{ paddingLeft: "0px", fontSize: "1.5rem" }}
      >
        <p style={{ fontWeight: "bold", color: "#FF0000" }}>Certified Copy</p>
      </div>
    ) : (
      <div className="col-lg-4 col-12">
        <img
          style={styles.signatureWidthStyle}
          src={get(certificate, "additionalData.certSignatories[0].signature")}
        />
      </div>
    )}
    <div style={styles.designationTextStyle} className="RobotoBold">
      {get(certificate, "additionalData.certSignatories[0].name")},{" "}
      {get(certificate, "additionalData.certSignatories[0].position")}
    </div>
    <div style={styles.designationTextStyle} className="RobotoBold">
      {get(certificate, "additionalData.certSignatories[0].organisation")}
    </div>
  </div>
);

export const renderSpecialization = certificate => (
  <div className="d-flex">
    <p style={styles.specTextStyle}>
      {certificate.additionalData.specialization}
    </p>
  </div>
);

export const renderAwardTextSOA = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "2rem" }}>
      <p style={styles.soaNameTextStyle} className="RobotoRegular">
        STATEMENT OF ATTAINMENT
      </p>
    </div>
    {renderAwardedTo()}
    {renderRecipientName(certificate)}
    {renderRecipientID(certificate)}
    <div
      className="d-flex col-lg-6 col-12"
      style={{ marginTop: "1rem", marginBottom: "3rem", paddingLeft: "0px" }}
    >
      <p style={styles.awardTextStyle} className="RobotoMedium">
        {get(certificate, "additionalData.certCode").includes(
          "SF_SOA_ES_001"
        ) || get(certificate, "additionalData.certCode").includes("SOA-ES-001")
          ? "for successful attainment of the required competencies in"
          : "for successful attainment of the following industry approved competencies"}
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
    {renderSeal()}
    <div className="col-lg-10 col-12 row d-flex justify-content-center">
      <div className="col-lg-8">
        {renderSignature(certificate)}
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
        {renderFooterText(styles.footerAboutTextStyle)}
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

export const renderAwardTextSOAHR = certificate => (
  <div>
    <div
      className="d-flex col-lg-9"
      style={{ marginTop: "2rem", padding: "0px" }}
    >
      <p style={styles.soaNameTextStyle} className="RobotoRegular">
        {certificate.name}
      </p>
    </div>
    {renderAwardedTo()}
    {renderRecipientName(certificate)}
    {renderRecipientID(certificate)}
    <div
      className="d-flex col-lg-9"
      style={{ marginTop: "1rem", padding: "0px" }}
    >
      <p style={styles.awardTextStyle} className="RobotoMedium">
        for successfully meeting the requirements of the above programme and
        attainment of the competencies in the following modules of the
        {switchOperatorFunction(certificate)} WSQ Framework:
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

export const renderSignatureSOAHR = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    {renderSeal()}
    <div className="col-lg-6">
      {renderSignature(certificate)}
      <div style={styles.footerTextStyle} className="RobotoLight">
        The training and assessment of the abovementioned learner are accredited
        in accordance with the Singapore Workforce Skills Qualifications System.
        {[
          "SF_SOA_HR_01",
          "SF_SOA_HR_02",
          "SF_SOA_HR_03",
          "SF_SOA_HR_04",
          "SF_SOA_HR_05",
          "SF_FQ_001",
          "SF_SOA_MF_01",
          "SF_SOA_MF_02"
        ].includes(get(certificate, "additionalData.certCode"))
          ? "This WSQ programme is aligned to the Skills Framework."
          : ""}
      </div>
      {renderFooterText(styles.footerTextStyle)}
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
          <img style={styles.footerLogoStyleSOHR} src={IMG_SSGLOGO} />
        </div>

        <div className="col-lg-5 col-5">
          <p style={styles.certCodeStyle}>
            {["QUAL_Reprint"].includes(
              get(certificate, "additionalData.certCode")
            )
              ? "QUAL"
              : get(certificate, "additionalData.certCode")}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export const renderSignaturePartner = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    {renderSeal()}
    <div className="col-lg-6">
      {renderSignature(certificate)}
      <img style={styles.signatureFooterLogoStyle} src={IMG_SSGLOGO} />
      <div style={styles.minHeightfooterTextStyle} className="RobotoLight">
        The training and assessment of the abovementioned learner are accredited{" "}
        <br />
        in accordance with the Singapore Workforce Skills Qualifications System.
      </div>
      {renderFooterText(styles.footerTextStyle)}
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

export const renderAwardTextQUAL = certificate => (
  <div>
    <div className="d-flex" style={{ marginTop: "2rem" }}>
      <p style={styles.nameTextStyle} className="RobotoRegular">
        {get(certificate, "qualificationLevel[0].description")} in{" "}
        {certificate.name}
      </p>
    </div>
    {[
      "FQ-004",
      "FQ-005",
      "SF_FQ_001",
      "SF_FQ_002",
      "SF_FQ_004",
      "SF_FQ_005"
    ].includes(get(certificate, "additionalData.certCode"))
      ? renderSpecialization(certificate)
      : ""}
    {renderAwardedTo()}
    {renderRecipientName(certificate)}
    {renderRecipientID(certificate)}
    <div
      className="d-flex col-lg-6 col-12"
      style={{ marginTop: "1rem", paddingLeft: "0px" }}
    >
      <p style={styles.awardTextStyle} className="RobotoMedium">
        for successful attainment of the required
        <br />
        industry approved competencies
      </p>
    </div>
    <div className="d-flex" style={{ marginTop: "3rem" }}>
      <p style={styles.issuersTextStyle} className="RobotoRegular">
        at {certificate.additionalData.assessmentOrgName}
      </p>
    </div>
  </div>
);

export const renderSignatureSOACC = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    {renderSeal()}
    <div className="col-lg-7">
      <div
        className="col-lg-4 col-12"
        style={{ paddingLeft: "0px", fontSize: "1.5rem" }}
      >
        <p style={{ fontWeight: "bold", color: "#FF0000" }}>Certified Copy</p>
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
        in accordance with the Singapore Workforce Skills Qualifications System.
      </div>
      {renderFooterText(styles.footerTextStyle)}
    </div>
    <div className="col-lg-3 col-xs-12">
      <div style={{ marginBottom: "70px", marginTop: "60px" }}>
        <p style={styles.printTextStyle} className="RobotoRegular">
          Cert No: {get(certificate, "additionalData.serialNum")}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "1rem",
          marginTop: "1rem"
        }}
      >
        <img style={styles.footerLogoStyle} src={IMG_SSGLOGO} />
        <div style={styles.certCodeStyle}>
          {get(certificate, "additionalData.certCode")}
        </div>
      </div>
    </div>
  </div>
);

export const renderSignatureSOAES = certificate => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    {renderSeal()}
    <div className="col-lg-6">
      {renderSignature(certificate)}
      <img style={styles.signatureFooterLogoStyle} src={IMG_SSGLOGO} />
      <div style={styles.minHeightfooterTextStyle} className="RobotoLight">
        The training and assessment of the abovementioned learner are accredited
        <br />
        in accordance with the Singapore Workforce Skills Qualifications System.
        <br />
        {get(certificate, "additionalData.certCode").startsWith("SF_SOA_ES_")
          ? "This WSQ programme is aligned to the Skills Framework."
          : ""}
      </div>
      {renderFooterText(styles.footerTextStyle)}
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

export const renderSignatureQual = (certificate, IMG_BOTTOM_LOGO) => (
  <div
    className="row d-flex justify-content-center"
    style={{ marginTop: "8rem", marginBottom: "1rem" }}
  >
    {renderSeal()}

    <div className="col-lg-7">
      {renderSignature(certificate)}
      <div style={{ paddingLeft: "0px" }} className="col-lg-5 col-12">
        <img style={styles.footerLogoStyle} src={IMG_SSGLOGO} />
      </div>
      <div className="col-lg-11 col-12" style={{ paddingLeft: "0px" }}>
        <div style={styles.footerTextStyle} className="RobotoLight">
          The training and assessment of the abovementioned learner are
          accredited
          <br />
          in accordance with the Singapore Workforce Skills Qualifications
          System.
          {["FQ-004", "SF_FQ_004", "SOA-002"].includes(
            get(certificate, "additionalData.certCode")
          ) ? (
            <span>
              <br />
              and the Early Childhood Development Agency (ECDA)
            </span>
          ) : (
            ""
          )}
          {["FQ-004", "SF_FQ_004", "SOA-002"].includes(
            get(certificate, "additionalData.certCode")
          ) ? (
            <span>
              <br />
              Accreditation Standards for Early Childhood Teacher Training
              Courses.
            </span>
          ) : (
            ""
          )}
          {["SF_FQ_002", "SF_FQ_004"].includes(
            get(certificate, "additionalData.certCode")
          ) ? (
            <span>
              <br />
              This WSQ programme is aligned to the Skills Framework.
            </span>
          ) : (
            ""
          )}
        </div>
        <div style={styles.footerTextStyle} className="RobotoLight">
          <a style={{ color: "rgb(51,0,144)" }} href="www.ssg.gov.sg">
            www.ssg.gov.sg
          </a>
          <br />
          For verification of this certificate, please visit{" "}
          <a
            style={{ color: "rgb(51,0,144)" }}
            href="https://myskillsfuture.sg/verify_eCert.html"
          >
            https://myskillsfuture.sg/verify_eCert.html
          </a>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-xs-12">
      <div style={{ marginBottom: "70px", marginTop: "60px" }}>
        <p style={styles.printTextStyle} className="RobotoRegular">
          Cert No: {get(certificate, "additionalData.serialNum")}
        </p>
      </div>
      <div style={styles.footerTextStyle}>In partnership with</div>
      <img style={styles.ssgLogoStyle} src={IMG_BOTTOM_LOGO} />
      <div style={styles.certCodeStyle}>
        {get(certificate, "additionalData.certCode")}
      </div>
      {["SOA-003"].includes(get(certificate, "additionalData.certCode")) ? (
        <div>
          <a href="www.scdf.gov.sg" style={styles.footerTextStyle}>
            www.scdf.gov.sg
          </a>
        </div>
      ) : (
        ""
      )}
    </div>
  </div>
);
