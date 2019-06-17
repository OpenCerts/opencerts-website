import React from "react";
import { tz } from "moment-timezone";
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
export const renderImage = imageData => {
  if (!imageData) return "";
  const html = (
    <img
      style={{
        width: imageData.width + imageData.unit.toLowerCase(),
        height: imageData.height + imageData.unit.toLowerCase()
      }}
      src={imageData.data}
    />
  );
  return html;
};

export const dateToWords = isoDate => {
  const day = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Nineth",
    "Tenth",
    "Eleventh",
    "Twelfth",
    "Thirteenth",
    "Fourteenth",
    "Fifteenth",
    "Sixteenth",
    "Seventeenth",
    "Eighteenth",
    "Nineteenth",
    "Twentieth",
    "Twenty first",
    "Twenty second",
    "Twenty third",
    "Twenty fourth",
    "Twenty fifth",
    "Twenty sixth",
    "Twenty seventh",
    "Twenty eighth",
    "Twenty nineth",
    "Thirtieth",
    "Thirty first"
  ][parseInt(isoDate.slice(8, 10), 10) - 1];

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ][parseInt(isoDate.slice(5, 7), 10) - 1];
  const yr = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
  ][parseInt(isoDate.slice(0, 1), 10) - 1];
  const hundrd = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
  ][parseInt(isoDate.slice(1, 2), 10) - 1];
  const Tens = [
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety"
  ][parseInt(isoDate.slice(2, 3), 10) - 2];
  let twodigit = "";
  const onedigit = isoDate.slice(2, 3);
  if (onedigit === "0") {
    twodigit = isoDate.slice(3, 4);
  } else {
    twodigit = isoDate.slice(2, 4);
  }

  const tens1 = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
    "twenty"
  ][parseInt(isoDate.slice(2, 4), 10) - 10];
  const ones = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine"
  ][parseInt(isoDate.slice(3, 4), 10) - 1];
  let tenFnl = "";
  let hundrds = "";
  const hundrdchk = isoDate.slice(1, 2);
  if (hundrdchk > 0) {
    hundrds = `${hundrd} hundred and`;
  } else {
    hundrds = "and";
  }
  if (twodigit > 9 && twodigit < 21) {
    tenFnl = tens1;
  } else if (twodigit > 20) {
    tenFnl = `${Tens} ${ones}`;
  } else {
    tenFnl = ones;
  }
  // return a date/month string and a year string;
  return {
    year: `${yr} thousand ${hundrds} ${tenFnl}`,
    month,
    day: day.toLowerCase(),
    dayMonth: `this ${day.toLowerCase()} day of ${month}`,
    monthDay: `${month} ${day.toLowerCase()}`
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
    else if (temptext === "of") txt = `${txt} ${temptext}`;
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
export const renderNUSTitle = () => {
  const style = {
    display: "block",
    fontSize: "26pt",
    textAlign: "center",
    fontFamily: "'Times New Roman', Serif",
    fontWeight: "bold",
    color: "rgb(83, 86, 90)",
    marginLeft: "auto",
    marginRight: "auto"
  };
  const html = (
    <div style={style}>
      NATIONAL UNIVERSITY
      <br />
      OF SINGAPORE
    </div>
  );
  return html;
};

// render NUS logo
export const renderNUSLogo = () => {
  const style = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "2.8cm",
    height: "3.56cm"
  };
  const html = <img src={NUS_LOGO} style={style} />;
  return html;
};

// render NUS seal
export const renderNUSSeal = () => {
  const style = {
    display: "float",
    width: "4.95cm"
  };
  const html = <img src={NUS_SEAL} style={style} />;
  return html;
};
