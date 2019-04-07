export const printMeritTextStyle = {
  fontFamily: "Arial",
  fontWeight: "500!important",
  fontSize: "2rem",
  color: "#555",
  textAlign: "center"
};

export const ToWords = num => {
  const a = [
    "",
    "one",
    "two",
    "three",
    "four ",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen"
  ];
  const b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety"
  ];
  const z = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen"
  ];
  if (num.toString().length > 4) return "overflow";
  const n = `000000000${num}`
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return "";
  let str = "";
  str +=
    Number(n[3]) !== 0
      ? `${z[Number(n[3])] || `${b[n[3][0]]} ${z[n[3][1]]}`} thousand `
      : "";
  str +=
    Number(n[4]) !== 0
      ? `${a[Number(n[4])] || `${b[n[4][0]]} ${a[n[4][1]]}`} hundred `
      : "";
  str +=
    Number(n[5]) !== 0
      ? (str !== "" ? "and " : "") +
        (a[Number(n[5])] || `${b[n[5][0]]} ${a[n[5][1]]}`)
      : "";

  return `${str}`;
};
export const formatDDMMMYYYY = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const months = [
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
  ];
  const month = date.getMonth();
  const year = date.getUTCFullYear();
  const day = date.getDate();
  return `${day} ${months[month]} ${year}`;
};

export const formatDate = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const months = [
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
  ];
  const month = date.getMonth();
  const year = date.getUTCFullYear();
  let yearStr = "";
  yearStr = ToWords(year);
  return (
    <span>
      {months[month]} <br /> {yearStr}
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
  const day = date.getDate();
  const a = [
    "",
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
    "eleventh",
    "twelfth",
    "thirteenth",
    "fourteenth",
    "fifteenth",
    "sixteenth",
    "seventeenth",
    "eighteenth",
    "nineteenth",
    "twentieth",
    "twenty first",
    "twenty second",
    "twenty third",
    "twenty fourth",
    "twenty fifth",
    "twenty sixth",
    "twenty seventh",
    "twenty eighth",
    "twenty ninth",
    "thirtieth",
    "thirty first"
  ];

  return <span>{a[day]} day of</span>;
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
