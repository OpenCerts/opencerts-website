import { tz } from "moment-timezone";
import { IMG_LOGO, NICF_LOGO } from "./images";
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
    <div className="col-lg-4 col-12" style={{ paddingRight: "0px" }}>
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
