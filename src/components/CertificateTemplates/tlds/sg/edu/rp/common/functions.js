import { tz } from "moment-timezone";
import { toWordsOrdinal, toWords } from "number-to-words";

export const TIMEZONE = "Asia/Singapore";

export const printMeritTextStyle = {
  fontFamily: "Arial",
  fontWeight: "500!important",
  fontSize: "2rem",
  color: "#555",
  textAlign: "center"
};

export const formatDDMMMYYYY = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);

  return tz(date, TIMEZONE).format("D MMMM YYYY");
};

export const formatDate = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);

  // use moment-timezone, get the full year
  const year = Number(tz(date, TIMEZONE).format("YYYY"));

  // use number-to-word, convert to words
  let yearStr = toWords(year);

  // change - begin with UpperCase, place commas with 'and'
  yearStr = yearStr.replace(",", " and");
  const yearReplacedStr = yearStr
    .substring(0, 1)
    .toUpperCase()
    .concat(yearStr.substring(1));
  return (
    <span>
      {tz(date, TIMEZONE).format("MMMM")} <br /> {yearReplacedStr}
    </span>
  );
};

export const formatNRIC = nricFin => {
  if (!nricFin) return null;
  const arrayNric = nricFin.split(":");
  return arrayNric.length === 3 ? arrayNric[2] : null;
};

export const formatDatePrefix = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);

  // use moment-timezone, get the day
  const day = Number(tz(date, TIMEZONE).format("D"));

  // use number-to-words, toWordsOrdinal - output first, second etc.
  const strDay = toWordsOrdinal(day);

  // eg first day of
  return <span>{strDay} day of</span>;
};

export const formatCertName = meritFlag => {
  let certDipDisplay = "";
  if (meritFlag === "Y") {
    certDipDisplay = "WITH MERIT";
  } else {
    certDipDisplay = "";
  }

  return <p style={printMeritTextStyle}>{certDipDisplay}</p>;
};

export const formatCertID = certId => {
  if (!certId) return null;
  const arrayCertId = certId.split(":");
  return arrayCertId.length > 0 ? arrayCertId[0] : null;
};

export const formatBold = str => <strong>{str}</strong>;

export const formatSignatoriesPosition = sigPosition => {
  if (!sigPosition) return null;
  return sigPosition.split("|");
};
