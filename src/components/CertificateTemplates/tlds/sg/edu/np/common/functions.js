export const formatDate = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ];
  const month = date.getMonth();
  const year = date.getUTCFullYear();
  return `${months[month]} ${year}`;
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
  let daySup = "";
  switch (day % 10) {
    case 1:
      daySup = "st";
      break;
    case 2:
      daySup = "nd";
      break;
    case 3:
      daySup = "rd";
      break;
    default:
      daySup = "th";
  }

  return (
    <span>
      Dated this {day}
      <sup>{daySup}</sup> day of
    </span>
  );
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
