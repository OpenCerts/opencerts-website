import React from "react";

export const isoDateToLocal = isoDate =>
  `${isoDate.slice(8, 10)}/${isoDate.slice(5, 7)}/${isoDate.slice(0, 4)}`;

export const isoDateToLocalLong = isoDate => {
  const day = isoDate.slice(8, 10);
  const year = isoDate.slice(0, 4);
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
  return `${day} ${month} ${year}`;
};

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
// imageData is has properties: type(PNG/JPG/SVG), data(base64), width, height and unit(cm/em/pt/px)
export const renderImage = imageData => {
  if (!imageData) return "";
  let type;
  switch (imageData.type.toUpperCase()) {
    case "PNG":
      type = "png";
      break;
    case "JPG":
    case "JPEG":
      type = "jpeg";
      break;
    case "SVG":
      type = "svg+xml";
      break;
    default:
      type = "";
      break;
  }
  const html = (
    <img
      style={{
        width: imageData.width + imageData.unit.toLowerCase(),
        height: imageData.height + imageData.unit.toLowerCase()
      }}
      src={`data:image/${type};base64,${imageData.data}`}
    />
  );
  return html;
};
