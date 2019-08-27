import React from "react";
import { tz } from "moment-timezone";
import { toWordsOrdinal } from "number-to-words";
import { NUS_LOGO } from "./imgNUSLogo";
import { NUS_SEAL } from "./imgNUSSeal";

export const TIMEZONE = "Asia/Singapore";

export const isoDateToLocal = isoDate =>
  tz(isoDate, TIMEZONE).format("DD/MM/YYYY");

export const isoDateToLocalLong = isoDate =>
  tz(isoDate, TIMEZONE).format("DD MMMM YYYY");

export const isBrowser = browser => {
  const { userAgent } = window.navigator;
  return userAgent.toUpperCase().indexOf(browser.toUpperCase()) >= 0;
};

// simplify class names
// NOTE: make sure SASS has been imported as style
export const sassClassNames = (names, styles) => {
  if (typeof names === "string")
    if (names.indexOf(" ") === -1)
      // one class only
      return styles[names];
    // array of class name
    else
      return names
        .trim()
        .split(" ")
        .map(name => styles[name])
        .join(" ");
  if (typeof names === "object" && names instanceof Array)
    return names.map(name => styles[name]).join(" ");
  return "";
};

// render imageData as a <img>
// imageData is has properties: data(base64), width, height and unit(cm/em/pt/px)
export const renderImage = (imageData, maxWidth, maxHeight) => {
  if (!imageData) return "";
  let imgWidth;
  let imgHeight;
  const unit = imageData.unit.toLowerCase();
  if (unit === "px" && (maxWidth || maxHeight)) {
    const hr = maxHeight ? imageData.height / maxHeight : 1;
    const wr = maxWidth ? imageData.width / maxWidth : 1;
    if (hr > 1 || wr > 1) {
      const r = hr > wr ? hr : wr;
      imgWidth = imageData.width / r + unit;
      imgHeight = imageData.height / r + unit;
    } else {
      imgWidth = imageData.width + unit;
      imgHeight = imageData.height + unit;
    }
  } else {
    imgWidth = imageData.width + unit;
    imgHeight = imageData.height + unit;
  }
  const html = (
    <img
      style={{
        width: imgWidth,
        height: imgHeight
      }}
      src={imageData.data}
    />
  );
  return html;
};

export const dateToWords = isoDate => {
  const dateValue = tz(isoDate, TIMEZONE);
  const day = toWordsOrdinal(dateValue.date()); // lower case
  const month = dateValue.format("MMMM");
  const year = toWordsOrdinal(dateValue.year()).replace(",", " and ");
  // return a date/month string and a year string;
  return {
    year,
    month,
    day,
    dayMonth: `this ${day} day of ${month}`,
    monthDay: `${month} ${day}`
  };
};

export const capitalizedText = inputString => {
  let txt = "";
  const splitSentence = inputString.split(" ");
  for (let i = 0; i < splitSentence.length; i += 1) {
    const temptext = splitSentence[i];
    if (i === 0)
      txt =
        temptext.slice(0, 1).toUpperCase() + temptext.slice(1, temptext.length);
    else if (temptext === "of" || temptext === "and" || temptext === "in")
      txt = `${txt} ${temptext}`;
    else if (temptext.slice(0, 1) === "(")
      txt = `${txt} ${temptext.slice(0, 2).toUpperCase()}${temptext.slice(
        2,
        temptext.length
      )}`;
    else
      txt = `${txt} ${temptext.slice(0, 1).toUpperCase()}${temptext.slice(
        1,
        temptext.length
      )}`;
  }
  return txt;
};

// render an empty div with specified height
export const renderVoid = height => (
  <div
    style={{
      display: "block",
      width: "100%",
      height,
      border: "0px solid"
    }}
  />
);

// render NUS title
const defaultTitleStyle = {
  display: "block",
  fontSize: "26pt",
  lineHeight: "30pt",
  textAlign: "center",
  fontFamily: "'Times New Roman', Serif",
  fontWeight: "bold",
  marginLeft: "auto",
  marginRight: "auto"
};
export const renderNUSTitle = (names, styles = defaultTitleStyle) => (
  <div className={names} style={styles}>
    NATIONAL UNIVERSITY
    <br />
    OF SINGAPORE
  </div>
);

const defaultLogoStyle = {
  display: "block",
  marginLeft: "auto",
  marginRight: "auto",
  width: "2.8cm",
  height: "3.56cm"
};
// render NUS logo
export const renderNUSLogo = (names, styles = defaultLogoStyle) => (
  <img src={NUS_LOGO} className={names} style={styles} />
);

const defaultSealStyle = {
  display: "float",
  width: "4.95cm"
};
// render NUS seal
export const renderNUSSeal = (names, styles = defaultSealStyle) => (
  <img src={NUS_SEAL} className={names} style={styles} />
);
