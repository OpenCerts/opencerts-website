export const approvedAddresses = [
  "0xa5d801265D29A6F1015a641BfC0e39Ee3dA2AC76",
  "0xD939B3934fB024517296e0b9091E72F222F81c1E",
  "0xBd5B320ff892B5afc400b5FF2A0CC9a56e89562b",
  "0xc36484efa1544c32ffed2e80a1ea9f0dfc517495",
  "0x866Fb78aC3c87019aBff9FB566acfF66F75Cfa46",
  "0x86c677591A72a3BE92f01E9dF4e9Ab37C05c41B9",
  "0xEF9c4D81C5934448E74C6Ea4e26bfD6FCC5fa830"
];

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
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getUTCFullYear();
  return `${day} ${months[month]} ${year}`;
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
