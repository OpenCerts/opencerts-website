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

export const formatDateFullMonth = dateString => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const months = [
  "JANUARY", 
  "FEBRUARY", 
  "MARCH",
  "APRIL", 
  "MAY", 
  "JUNE", 
  "JULY",
  "AUGUST", 
  "SEPTEMBER", 
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER"
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

export const formatCertName = (certId, certName, meritFlag) => {
  let [certPrefix, certDescr] = ["", ""];
  
  const certType = getCertType(certId);
  
   switch(certType) {
	  case "FT":
		  [certPrefix, certDescr] = ["Diploma", certName];
		  break;
	  case "PTD": 
	  case "PDP":
		  [certPrefix, certDescr] =  splitStringTo2(certName, " in ");
		  break;
  }

  if (certType === "FT" || certType === "PTD") {
	  certPrefix = (meritFlag==="Y") ? certPrefix + " with Merit" : certPrefix;
  }

  return (
    <p>
      {certPrefix}
      <br />
      in
      <br />
      {
		//split cert description with "(" and keep the separator.
		certDescr.length>30 ? (certDescr.split(/(?=\()/g).map(i => <p> {i} </p>)) : certDescr
	  }
    </p>
  );
};



export const formatCertID = certId => {
  if (!certId) return null;
  const arrayCertId = certId.split(":");
  return arrayCertId.length > 0 ? arrayCertId[0] : null;
};

export const isCETDiploma = certId => {
  if (!certId) return false;
  
  let isCertDipFlag = false;
  let certType = getCertType(certId);
  if (certType === "PTD" || certType==="PDP") isCertDipFlag = true;
	  
  return isCertDipFlag;
};

const getCertType = certId => {
  let certType = "";
  
  const arrayCertId = certId.split(":");
  if (arrayCertId.length > 1) certType = arrayCertId[1];
  
  return certType;
};

const splitStringTo2 = (string, delimiter) => {
   var parts=string.split(delimiter);
   if (parts.length > 1)	return [parts[0], parts.splice(1,parts.length).join(delimiter)];
   else return ["", parts[0]];
};