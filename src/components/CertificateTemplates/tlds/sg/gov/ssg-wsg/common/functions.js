import { tz } from "moment-timezone";

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
    additionalData.specialization == undefined ||
    additionalData.specialization == null ||
    additionalData.specialization == "null" ||
    additionalData.specialization.trim() == ""
  ) {
    return "";
  }

  if (additionalData.specialization) {
    return ` - ${additionalData.specialization}`;
  }
  return "";
};
