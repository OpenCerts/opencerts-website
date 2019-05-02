export const GETNUMBER = number => {
  const numbers = [
    "ZERO",
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
    "ELEVEN",
    "TWELVE",
    "THIRTEEN",
    "FOURTEEN",
    "FIRTHTEEN",
    "SIXTEEN",
    "SEVENTEEN",
    "EIGHTEEN",
    "NINETEEN",
    "TWENTY"
  ];

  return <span>{numbers[number]}</span>;
};

export const GETSUBJGRADE_GCEA_BEFORE2006 = subjgrade => {
  let alphaRender;
  let numericRender;

  if (subjgrade === "A") {
    alphaRender = "A";
    numericRender = "-";
  } else if (subjgrade === "B") {
    alphaRender = "B";
    numericRender = "-";
  } else if (subjgrade === "C") {
    alphaRender = "C";
    numericRender = "-";
  } else if (subjgrade === "D") {
    alphaRender = "D";
    numericRender = "-";
  } else if (subjgrade === "E") {
    alphaRender = "E";
    numericRender = "-";
  } else if (subjgrade === "O") {
    alphaRender = "O";
    numericRender = "-";
  } else if (subjgrade === "F") {
    alphaRender = "F";
    numericRender = "-";
  } else if (subjgrade === "1") {
    alphaRender = "A";
    numericRender = "ONE";
  } else if (subjgrade === "2") {
    alphaRender = "A";
    numericRender = "TWO";
  } else if (subjgrade === "3") {
    alphaRender = "B";
    numericRender = "THREE";
  } else if (subjgrade === "4") {
    alphaRender = "B";
    numericRender = "FOUR";
  } else if (subjgrade === "5") {
    alphaRender = "C";
    numericRender = "FIVE";
  } else if (subjgrade === "6") {
    alphaRender = "C";
    numericRender = "SIX";
  } else if (subjgrade === "7") {
    alphaRender = "D";
    numericRender = "SEVEN";
  } else if (subjgrade === "8") {
    alphaRender = "E";
    numericRender = "EIGHT";
  } else if (subjgrade === "9") {
    alphaRender = "-";
    numericRender = "NINE";
  } else if (subjgrade === "ABSENT") {
    alphaRender = "ABSENT";
    numericRender = "-";
  } else if (subjgrade === "BAND1") {
    alphaRender = "BAND";
    numericRender = "ONE";
  } else if (subjgrade === "BAND2") {
    alphaRender = "BAND";
    numericRender = "TWO";
  } else if (subjgrade === "BAND3") {
    alphaRender = "BAND";
    numericRender = "THREE";
  } else if (subjgrade === "BAND4") {
    alphaRender = "BAND";
    numericRender = "FOUR";
  } else if (subjgrade === "U") {
    alphaRender = "U";
    numericRender = "-";
  } else if (subjgrade === "MERIT") {
    alphaRender = "MERIT";
    numericRender = "-";
  } else if (subjgrade === "PASS") {
    alphaRender = "PASS";
    numericRender = "-";
  } else if (subjgrade === "UNGRADED") {
    alphaRender = "UNGRADED";
    numericRender = "-";
  }

  return (
    <div className="row">
      <div className="col-md-6">{alphaRender}</div>
      <div className="col-md-6">{numericRender}</div>
    </div>
  );
};

export const GETSUBJGRADE_GCEA_OLDSYLLABUS = subjgrade => {
  let alphaRender;
  let numericRender;

  if (subjgrade === "1") {
    alphaRender = "A";
    numericRender = "ONE";
  } else if (subjgrade === "2") {
    alphaRender = "A";
    numericRender = "TWO";
  } else if (subjgrade === "3") {
    alphaRender = "B";
    numericRender = "THREE";
  } else if (subjgrade === "4") {
    alphaRender = "B";
    numericRender = "FOUR";
  } else if (subjgrade === "5") {
    alphaRender = "C";
    numericRender = "FIVE";
  } else if (subjgrade === "6") {
    alphaRender = "C";
    numericRender = "SIX";
  } else if (subjgrade === "7") {
    alphaRender = "D";
    numericRender = "SEVEN";
  } else if (subjgrade === "8") {
    alphaRender = "E";
    numericRender = "EIGHT";
  } else if (subjgrade === "9") {
    alphaRender = "-";
    numericRender = "NINE";
  } else if (subjgrade === "ABSENT") {
    alphaRender = "ABSENT";
    numericRender = "-";
  } else if (subjgrade === "A") {
    alphaRender = "A";
    numericRender = "-";
  } else if (subjgrade === "B") {
    alphaRender = "B";
    numericRender = "-";
  } else if (subjgrade === "C") {
    alphaRender = "C";
    numericRender = "-";
  } else if (subjgrade === "D") {
    alphaRender = "D";
    numericRender = "-";
  } else if (subjgrade === "E") {
    alphaRender = "E";
    numericRender = "-";
  } else if (subjgrade === "F") {
    alphaRender = "F";
    numericRender = "-";
  } else if (subjgrade === "O") {
    alphaRender = "O";
    numericRender = "-";
  }

  return (
    <div className="row">
      <div className="col-md-6">{alphaRender}</div>
      <div className="col-md-6">{numericRender}</div>
    </div>
  );
};

export const GETSPAPERGRADE_GCEA = papergrade => {
  let paperalphaRender;
  let papernumericRender;

  if (papergrade === "DIST") {
    paperalphaRender = "DIST";
    papernumericRender = "-";
  } else if (papergrade === "MERIT") {
    paperalphaRender = "MERIT";
    papernumericRender = "-";
  } else if (papergrade === "PASS") {
    paperalphaRender = "PASS";
    papernumericRender = "-";
  } else if (papergrade === "UNGRADED") {
    paperalphaRender = "UNGRADED";
    papernumericRender = "-";
  } else if (papergrade === "ABSENT") {
    paperalphaRender = "ABSENT";
    papernumericRender = "-";
  } else if (papergrade === "ONE") {
    paperalphaRender = "-";
    papernumericRender = "ONE";
  } else if (papergrade === "TWO") {
    paperalphaRender = "-";
    papernumericRender = "TWO";
  }

  return (
    <div className="row">
      <div className="col-md-6">{paperalphaRender}</div>
      <div className="col-md-6">{papernumericRender}</div>
    </div>
  );
};

export const GETSUBJGRADE_GCEN_BEFORE2008 = subjgrade => {
  let alphaRender;
  let numericRender;

  if (subjgrade === "1") {
    alphaRender = "-";
    numericRender = "ONE";
  } else if (subjgrade === "2") {
    alphaRender = "-";
    numericRender = "TWO";
  } else if (subjgrade === "3") {
    alphaRender = "-";
    numericRender = "THREE";
  } else if (subjgrade === "4") {
    alphaRender = "-";
    numericRender = "FOUR";
  } else if (subjgrade === "5") {
    alphaRender = "-";
    numericRender = "FIVE";
  } else if (subjgrade === "6") {
    alphaRender = "-";
    numericRender = "UNGRADED";
  } else if (subjgrade === "ABSENT") {
    alphaRender = "ABSENT";
    numericRender = "-";
  }

  return (
    <div className="row">
      <div className="col-md-6">{alphaRender}</div>
      <div className="col-md-6">{numericRender}</div>
    </div>
  );
};

export const GETSUBJGRADE_GCENA = subjgrade => {
  let alphaRender;
  let numericRender;

  if (subjgrade === "1") {
    alphaRender = "-";
    numericRender = "ONE";
  } else if (subjgrade === "2") {
    alphaRender = "-";
    numericRender = "TWO";
  } else if (subjgrade === "3") {
    alphaRender = "-";
    numericRender = "THREE";
  } else if (subjgrade === "4") {
    alphaRender = "-";
    numericRender = "FOUR";
  } else if (subjgrade === "5") {
    alphaRender = "-";
    numericRender = "FIVE";
  } else if (subjgrade === "UNGRADED") {
    alphaRender = "-";
    numericRender = "UNGRADED";
  } else if (subjgrade === "ABSENT") {
    alphaRender = "ABSENT";
    numericRender = "-";
  } else if (subjgrade === "T") {
    alphaRender = "T";
    numericRender = "-";
  }

  return (
    <div className="row">
      <div className="col-md-6">{alphaRender}</div>
      <div className="col-md-6">{numericRender}</div>
    </div>
  );
};

export const GETSUBJGRADE_GCENT = subjgrade => {
  let alphaRender;
  let numericRender;

  if (subjgrade === "A") {
    alphaRender = "A";
    numericRender = "-";
  } else if (subjgrade === "B") {
    alphaRender = "B";
    numericRender = "-";
  } else if (subjgrade === "C") {
    alphaRender = "C";
    numericRender = "-";
  } else if (subjgrade === "D") {
    alphaRender = "D";
    numericRender = "-";
  } else if (subjgrade === "UNGRADED") {
    alphaRender = "UNGRADED";
    numericRender = "-";
  } else if (subjgrade === "ABSENT") {
    alphaRender = "ABSENT";
    numericRender = "-";
  } else if (subjgrade === "T") {
    alphaRender = "T";
    numericRender = "-";
  }

  return (
    <div className="row">
      <div className="col-md-6">{alphaRender}</div>
      <div className="col-md-6">{numericRender}</div>
    </div>
  );
};

export const GETSPAPERGRADE_GCEN = papergrade => {
  let paperalphaRender;
  let papernumericRender;

  if (papergrade === "DISTINCTION") {
    paperalphaRender = "DISTINCTION";
    papernumericRender = "-";
  } else if (papergrade === "MERIT") {
    paperalphaRender = "MERIT";
    papernumericRender = "-";
  } else if (papergrade === "PASS") {
    paperalphaRender = "PASS";
    papernumericRender = "-";
  } else if (papergrade === "UNGRADED") {
    paperalphaRender = "UNGRADED";
    papernumericRender = "-";
  } else if (papergrade === "ABSENT") {
    paperalphaRender = "ABSENT";
    papernumericRender = "-";
  } else if (papergrade === "DIST") {
    paperalphaRender = "DIST";
    papernumericRender = "-";
  } else if (papergrade === "T") {
    paperalphaRender = "T";
    papernumericRender = "-";
  } else if (papergrade === "E*") {
    paperalphaRender = "E*";
    papernumericRender = "-";
  }

  return (
    <div className="row">
      <div className="col-md-6">{paperalphaRender}</div>
      <div className="col-md-6">{papernumericRender}</div>
    </div>
  );
};

export const GETSUBJGRADE_GCEO = (subjgrade, year) => {
  let alphaRender;
  let numericRender;

  if (subjgrade === "1") {
    alphaRender = "A";
    numericRender = "ONE";
  } else if (subjgrade === "2") {
    alphaRender = "A";
    numericRender = "TWO";
  } else if (subjgrade === "3") {
    alphaRender = "B";
    numericRender = "THREE";
  } else if (subjgrade === "4") {
    alphaRender = "B";
    numericRender = "FOUR";
  } else if (subjgrade === "5") {
    alphaRender = "C";
    numericRender = "FIVE";
  } else if (subjgrade === "6") {
    alphaRender = "C";
    numericRender = "SIX";
  } else if (subjgrade === "7") {
    alphaRender = "D";
    numericRender = "SEVEN";
  } else if (subjgrade === "8") {
    alphaRender = "E";
    numericRender = "EIGHT";
  } else if (subjgrade === "9") {
    alphaRender = "-";
    numericRender = "NINE";
  } else if (subjgrade === "ABSENT") {
    alphaRender = "ABSENT";
    numericRender = "-";
  } else if (subjgrade === "T") {
    alphaRender = "T";
    numericRender = "-";
  } else if (subjgrade === "MERIT") {
    if (year === 2001) {
      alphaRender = "MERIT";
      numericRender = "-";
    } else {
      alphaRender = "-";
      numericRender = "MERIT";
    }
  } else if (subjgrade === "PASS") {
    if (year === 2001) {
      alphaRender = "PASS";
      numericRender = "-";
    } else {
      alphaRender = "-";
      numericRender = "PASS";
    }
  } else if (subjgrade === "UNGRADED") {
    if (year === 2001) {
      alphaRender = "UNGRADED";
      numericRender = "-";
    } else {
      alphaRender = "-";
      numericRender = "UNGRADED";
    }
  }

  return (
    <div className="row">
      <div className="col-md-6">{alphaRender}</div>
      <div className="col-md-6">{numericRender}</div>
    </div>
  );
};

export const GETSPAPERGRADE_GCEO = (papergrade, year) => {
  let paperalphaRender;
  let papernumericRender;

  if (papergrade === "DIST") {
    if (year <= 2001) {
      paperalphaRender = "DIST";
      papernumericRender = "-";
    } else {
      paperalphaRender = "-";
      papernumericRender = "DIST";
    }
  } else if (papergrade === "MERIT") {
    if (year <= 2001) {
      paperalphaRender = "MERIT";
      papernumericRender = "-";
    } else {
      paperalphaRender = "-";
      papernumericRender = "MERIT";
    }
  } else if (papergrade === "PASS") {
    if (year <= 2001) {
      paperalphaRender = "PASS";
      papernumericRender = "-";
    } else {
      paperalphaRender = "-";
      papernumericRender = "PASS";
    }
  } else if (papergrade === "UNGRADED") {
    if (year <= 2001) {
      paperalphaRender = "UNGRADED";
      papernumericRender = "-";
    } else {
      paperalphaRender = "-";
      papernumericRender = "UNGRADED";
    }
  } else if (papergrade === "ABSENT") {
    paperalphaRender = "ABSENT";
    papernumericRender = "-";
  } else if (papergrade === "FAIL") {
    paperalphaRender = "FAIL";
    papernumericRender = "-";
  } else if (papergrade === "T") {
    paperalphaRender = "T";
    papernumericRender = "-";
  } else if (papergrade === "E*") {
    paperalphaRender = "E*";
    papernumericRender = "-";
  }

  return (
    <div className="row">
      <div className="col-md-6">{paperalphaRender}</div>
      <div className="col-md-6">{papernumericRender}</div>
    </div>
  );
};
