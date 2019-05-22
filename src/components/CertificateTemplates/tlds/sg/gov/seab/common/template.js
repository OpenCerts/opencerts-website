import PropTypes from "prop-types";

import { get } from "lodash";

import {
  SOR_BORDER_GCEO,
  SOR_BORDER_GCEN,
  SOR_BORDER_GCEA,
  SOR_BORDER_PSLE,
  SOR_TOP_LOGO,
  SOR_TOP_HEADER,
  SOR_TITLE,
  SOR_SUBJECT_REM_RIGHT_PAD,
  SOR_SUBJECT_MARGIN_ALPHABET,
  SOR_SUBJECT_MARGIN_NUMERICAL,
  SOR_BOLD_TEXT,
  SOR_CENTER_ALIGN,
  EXPLANATORY_PAGE_SIZE,
  EXPLANATORY_TITLE,
  SOR_20_WIDTH,
  SOR_30_WIDTH,
  SOR_50_WIDTH,
  SOR_PSLE_NAME_1979,
  SOR_PSLE_GRADE_1979
} from "./style";

import { RENDEREXPLANATORYNOTES_NA } from "./explnotes_na_detail";

import { RENDEREXPLANATORYNOTES_O } from "./explnotes_o_detail";

import { RENDEREXPLANATORYNOTES_NT } from "./explnotes_nt_detail";

import { RENDEREXPLANATORYNOTES_N } from "./explnotes_n_detail";

import { RENDEREXPLANATORYNOTES_A } from "./explnotes_a_detail";

import { RENDEREXPLANATORYNOTES_A2 } from "./explnotes_a2_detail";

import { RENDEREXPLANATORYNOTES_A3 } from "./explnotes_a3_detail";

export const SOR_TRANSCRIPT_FONT_SIZE_12 = {
  fontSize: "12px",
  fontFamily: "Arial"
};

export const SOR_TRANSCRIPT_FONT_SIZE_11 = {
  fontSize: "11px",
  fontFamily: "Arial",
  lineHeight: "2.0"
};

export const SOR_INDENT_TEXT = {
  marginLeft: "0.5em"
};

export const EXAM_LVL_TEXT = {
  fontSize: "11px",
  fontFamily: "Arial",
  lineHeight: "2.0",
  marginLeft: "4.2em"
};

export const FORMATDATEPREFIX = dateString => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let dayValue = "";

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
  ];

  const lengthday = day.toString().length;
  if (lengthday === 1) {
    dayValue = `0${day}`;
  } else {
    dayValue = day;
  }

  return (
    <span>
      {dayValue}/{months[month]}/{year}
    </span>
  );
};

export const FORMATYEARPREFIX = dateString => {
  const date = new Date(dateString);
  const year = date.getFullYear();

  return year;
};

export const GETESORBGCOLOR = examlvl => {
  let bgcolor = "";
  if (examlvl === "GCEO") {
    bgcolor = SOR_BORDER_GCEO;
  } else if (examlvl === "GCEN") {
    bgcolor = SOR_BORDER_GCEN;
  } else if (examlvl === "GCEA") {
    bgcolor = SOR_BORDER_GCEA;
  } else if (examlvl === "PSLE") {
    bgcolor = SOR_BORDER_PSLE;
  }

  return bgcolor;
};

export const GETEXPLANATORYNOTES = examlvl => {
  let explanatorynotes = "";
  if (examlvl === "GCENNA") {
    explanatorynotes = RENDEREXPLANATORYNOTES_NA();
  } else if (examlvl === "GCEO") {
    explanatorynotes = RENDEREXPLANATORYNOTES_O();
  } else if (examlvl === "GCENNT") {
    explanatorynotes = RENDEREXPLANATORYNOTES_NT();
  } else if (examlvl === "GCEN") {
    explanatorynotes = RENDEREXPLANATORYNOTES_N();
  } else if (examlvl === "GCEA") {
    explanatorynotes = RENDEREXPLANATORYNOTES_A();
  } else if (examlvl === "GCEA2") {
    explanatorynotes = RENDEREXPLANATORYNOTES_A2();
  } else if (examlvl === "GCEA3") {
    explanatorynotes = RENDEREXPLANATORYNOTES_A3();
  }

  return explanatorynotes;
};

export const GETIDENTIFICATION = certificate => {
  const fin = get(certificate, "recipient.fin");
  const nric = get(certificate, "recipient.nric");
  const passportNumber = get(certificate, "recipient.passportNumber");

  let value = "";

  if (nric !== undefined) {
    value = nric;
  } else if (fin !== undefined) {
    value = fin;
  } else if (passportNumber !== undefined) {
    value = passportNumber;
  }

  return <span>{value}</span>;
};

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

export const GETSUBJGRADE = (subjgrade, examyr, examlvltype) => {
  let alphaRender;
  let numericRender;

  if (
    (subjgrade === "A" ||
      subjgrade === "B" ||
      subjgrade === "C" ||
      subjgrade === "D") &&
    (examlvltype === "A" ||
      examlvltype === "A2" ||
      examlvltype === "A3" ||
      examlvltype === "NT")
  ) {
    if (subjgrade === "A") {
      alphaRender = "A";
    } else if (subjgrade === "B") {
      alphaRender = "B";
    } else if (subjgrade === "C") {
      alphaRender = "C";
    } else if (subjgrade === "D") {
      alphaRender = "D";
    }

    numericRender = "-";
  } else if (
    (subjgrade === "F" || subjgrade === "O" || subjgrade === "E") &&
    (examlvltype === "A" || examlvltype === "A2" || examlvltype === "A3")
  ) {
    if (subjgrade === "F") {
      alphaRender = "F";
    } else if (subjgrade === "E") {
      alphaRender = "E";
    } else if (subjgrade === "O") {
      alphaRender = "O";
    }

    numericRender = "-";
  } else if (
    (subjgrade === "1" ||
      subjgrade === "2" ||
      subjgrade === "3" ||
      subjgrade === "4" ||
      subjgrade === "5") &&
    (examlvltype === "N" || examlvltype === "NA")
  ) {
    alphaRender = "-";

    if (subjgrade === "1") {
      numericRender = "ONE";
    } else if (subjgrade === "2") {
      numericRender = "TWO";
    } else if (subjgrade === "3") {
      numericRender = "THREE";
    } else if (subjgrade === "4") {
      numericRender = "FOUR";
    } else if (subjgrade === "5") {
      numericRender = "FIVE";
    }
  } else if (
    (subjgrade === "1" ||
      subjgrade === "2" ||
      subjgrade === "3" ||
      subjgrade === "4" ||
      subjgrade === "5" ||
      subjgrade === "6") &&
    (examlvltype === "A" || examlvltype === "A2" || examlvltype === "O")
  ) {
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
    }
  } else if (
    (subjgrade === "6" && examlvltype === "N") ||
    (subjgrade === "UNGRADED" &&
      ((examlvltype === "O" && examyr !== 2001) || examlvltype === "NA"))
  ) {
    alphaRender = "-";
    numericRender = "UNGRADED";
  } else if (
    subjgrade === "7" &&
    (examlvltype === "A" || examlvltype === "A2" || examlvltype === "O")
  ) {
    alphaRender = "D";
    numericRender = "SEVEN";
  } else if (
    subjgrade === "8" &&
    (examlvltype === "A" || examlvltype === "A2" || examlvltype === "O")
  ) {
    alphaRender = "E";
    numericRender = "EIGHT";
  } else if (
    subjgrade === "9" &&
    (examlvltype === "A" || examlvltype === "A2" || examlvltype === "O")
  ) {
    alphaRender = "-";
    numericRender = "NINE";
  } else if (
    subjgrade === "ABSENT" &&
    (examlvltype === "A" ||
      examlvltype === "A2" ||
      examlvltype === "A3" ||
      examlvltype === "N" ||
      examlvltype === "NA" ||
      examlvltype === "NT" ||
      examlvltype === "O")
  ) {
    alphaRender = "ABSENT";
    numericRender = "-";
  } else if (
    subjgrade === "MERIT" &&
    ((examlvltype === "O" && examyr === 2001) ||
      examlvltype === "A" ||
      examlvltype === "A2" ||
      examlvltype === "A3")
  ) {
    alphaRender = "MERIT";
    numericRender = "-";
  } else if (
    subjgrade === "MERIT" &&
    (examlvltype === "O" && examyr !== 2001)
  ) {
    alphaRender = "-";
    numericRender = "MERIT";
  } else if (
    subjgrade === "PASS" &&
    ((examlvltype === "O" && examyr === 2001) ||
      examlvltype === "A" ||
      examlvltype === "A2" ||
      examlvltype === "A3")
  ) {
    alphaRender = "PASS";
    numericRender = "-";
  } else if (subjgrade === "PASS" && (examlvltype === "O" && examyr !== 2001)) {
    alphaRender = "-";
    numericRender = "PASS";
  } else if (
    subjgrade === "UNGRADED" &&
    ((examlvltype === "O" && examyr === 2001) ||
      examlvltype === "A" ||
      examlvltype === "A2" ||
      examlvltype === "A3" ||
      examlvltype === "NT")
  ) {
    alphaRender = "UNGRADED";
    numericRender = "-";
  } else if (subjgrade === "BAND1" && examlvltype === "A2") {
    alphaRender = "BAND";
    numericRender = "ONE";
  } else if (subjgrade === "BAND2" && examlvltype === "A2") {
    alphaRender = "BAND";
    numericRender = "TWO";
  } else if (subjgrade === "BAND3" && examlvltype === "A2") {
    alphaRender = "BAND";
    numericRender = "THREE";
  } else if (subjgrade === "BAND4" && examlvltype === "A2") {
    alphaRender = "BAND";
    numericRender = "FOUR";
  } else if (subjgrade === "E*" && examlvltype === "A2") {
    alphaRender = "E*";
    numericRender = "-";
  } else if (
    subjgrade === "T" &&
    (examlvltype === "A2" ||
      examlvltype === "A3" ||
      examlvltype === "N" ||
      examlvltype === "NA" ||
      examlvltype === "NT" ||
      examlvltype === "O")
  ) {
    alphaRender = "T";
    numericRender = "-";
  } else if (subjgrade === "U" && examlvltype === "A2") {
    alphaRender = "U";
    numericRender = "-";
  } else if (subjgrade === "S" && examlvltype === "A3") {
    alphaRender = "S";
    numericRender = "-";
  } else if (subjgrade === "DIST" && examlvltype === "A3") {
    alphaRender = "DIST";
    numericRender = "-";
  }

  if (examlvltype === "A3") {
    return <span>{alphaRender}</span>;
  }
  return (
    <div className="row">
      <div className="col-md-6" style={SOR_CENTER_ALIGN}>
        {alphaRender}
      </div>
      <div className="col-md-6" style={SOR_CENTER_ALIGN}>
        {numericRender}
      </div>
    </div>
  );
};

export const GETPAPERGRADE = (papergrade, examyr, examlvl) => {
  let paperalphaRender;
  let papernumericRender;

  if (papergrade === "DIST") {
    if (
      (examlvl === "GCEO" && examyr <= 2001) ||
      examlvl === "GCEA" ||
      examlvl === "GCEN"
    ) {
      paperalphaRender = "DIST";
      papernumericRender = "-";
    } else {
      paperalphaRender = "-";
      papernumericRender = "DIST";
    }
  } else if (papergrade === "MERIT") {
    if (
      (examlvl === "GCEO" && examyr <= 2001) ||
      examlvl === "GCEA" ||
      examlvl === "GCEN"
    ) {
      paperalphaRender = "MERIT";
      papernumericRender = "-";
    } else {
      paperalphaRender = "-";
      papernumericRender = "MERIT";
    }
  } else if (papergrade === "PASS") {
    if (
      (examlvl === "GCEO" && examyr <= 2001) ||
      examlvl === "GCEA" ||
      examlvl === "GCEN"
    ) {
      paperalphaRender = "PASS";
      papernumericRender = "-";
    } else {
      paperalphaRender = "-";
      papernumericRender = "PASS";
    }
  } else if (
    papergrade === "ABSENT" &&
    (examlvl === "GCEA" || examlvl === "GCEN" || examlvl === "GCEO")
  ) {
    paperalphaRender = "ABSENT";
    papernumericRender = "-";
  } else if (papergrade === "ONE" && examlvl === "GCEA") {
    paperalphaRender = "-";
    papernumericRender = "ONE";
  } else if (papergrade === "TWO" && examlvl === "GCEA") {
    paperalphaRender = "-";
    papernumericRender = "TWO";
  } else if (
    papergrade === "FAIL" &&
    (examlvl === "GCEA" || examlvl === "GCEO")
  ) {
    paperalphaRender = "FAIL";
    papernumericRender = "-";
  } else if (
    papergrade === "E*" &&
    (examlvl === "GCEA" || examlvl === "GCEN" || examlvl === "GCEO")
  ) {
    paperalphaRender = "E*";
    papernumericRender = "-";
  } else if (
    papergrade === "T" &&
    (examlvl === "GCEA" || examlvl === "GCEN" || examlvl === "GCEO")
  ) {
    paperalphaRender = "T";
    papernumericRender = "-";
  } else if (papergrade === "DISTINCTION" && examlvl === "GCEN") {
    paperalphaRender = "DISTINCTION";
    papernumericRender = "-";
  } else if (papergrade === "UNGRADED") {
    if (
      (examlvl === "GCEO" && examyr <= 2001) ||
      examlvl === "GCEA" ||
      examlvl === "GCEN"
    ) {
      paperalphaRender = "UNGRADED";
      papernumericRender = "-";
    } else {
      paperalphaRender = "-";
      papernumericRender = "UNGRADED";
    }
  }

  if (examlvl === "GCEA" && examyr >= 2006) {
    return (
      <div className="row">
        <div className="col-md-6">{papernumericRender}</div>
        <div className="col-md-6">{paperalphaRender}</div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-md-6" style={SOR_CENTER_ALIGN}>
        {paperalphaRender}
      </div>
      <div className="col-md-6" style={SOR_CENTER_ALIGN}>
        {papernumericRender}
      </div>
    </div>
  );
};

export const EXAMININGAUTHORITYANDLANGUAGEMEDIUMHEADER = (
  examlvltype,
  examyr
) => {
  if (
    (examlvltype === "A" && (examyr >= 2002 && examyr <= 2005)) ||
    examlvltype === "A2"
  ) {
    return (
      <div className="row">
        <div className="col-md-6">
          LANGUAGE <br />
          MEDIUM
        </div>
      </div>
    );
  }
  if (examlvltype === "A3") {
    return (
      <div className="row">
        <div className="col-md-2" style={SOR_50_WIDTH}>
          EXAMINING <br />
          AUTHORITY
        </div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-md-6">
        LANGUAGE <br />
        MEDIUM
      </div>
      <div className="col-md-6">
        EXAMINING <br />
        AUTHORITY
      </div>
    </div>
  );
};

export const EXAMININGAUTHORITYANDLANGUAGEMEDIUMSTAR = (
  examlvltype,
  examyr
) => {
  if (
    (examlvltype === "A" && (examyr >= 2002 && examyr <= 2005)) ||
    examlvltype === "A2" ||
    examlvltype === "A3"
  ) {
    return (
      <div className="row">
        <div className="col-md-6">***************</div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-md-6">***************</div>
      <div className="col-md-6">***************</div>
    </div>
  );
};

export const EXAMININGAUTHORITYANDLANGUAGEMEDIUMDATA = (
  examlvltype,
  examyr,
  languagemedium,
  examiningauthority
) => {
  if (
    (examlvltype === "A" && (examyr >= 2002 && examyr <= 2005)) ||
    examlvltype === "A2" ||
    examlvltype === "PSLE19801981" ||
    examlvltype === "PSLE19821992"
  ) {
    return (
      <div className="row">
        <div className="col-md-6">{languagemedium}</div>
      </div>
    );
  }
  if (examlvltype === "A3") {
    return <span>{examiningauthority}</span>;
  }
  return (
    <div className="row">
      <div className="col-md-6">{languagemedium}</div>
      <div className="col-md-6">{examiningauthority}</div>
    </div>
  );
};

export const EXAMGRADEHEADER = (examlvltype, examyr) => {
  if (examlvltype === "A3") {
    return (
      <div className="row" style={SOR_BOLD_TEXT}>
        <div className="col-md-4">SUBJECT</div>
        <div className="col-md-2">LEVEL</div>
        <div className="col-md-2">GRADE</div>
        <div className="col-md-2">
          EXAMINING <br />
          AUTHORITY
        </div>
      </div>
    );
  }
  if (examlvltype === "PSLE19801981" || examlvltype === "PSLE19821992") {
    return (
      <div className="row" style={SOR_BOLD_TEXT}>
        <div className="col-md-1" />
        <div className="col-md-3">SUBJECT</div>
        <div className="col-md-2">GRADE</div>
        <div className="col-md-4">LANGUAGE MEDIUM</div>
      </div>
    );
  }
  if (examlvltype === "PSLE19932012" || examlvltype === "PSLE2013") {
    return (
      <div className="row" style={SOR_BOLD_TEXT}>
        <div className="col-md-1" />
        <div className="col-md-5">SUBJECT</div>
        <div className="col-md-2">GRADE</div>
      </div>
    );
  }
  if (examlvltype === "PSLE1979") {
    return <span />;
  }
  return (
    <div className="row" style={SOR_BOLD_TEXT}>
      <div className="col-md-4">SUBJECT</div>
      <div className="col-md-2" style={SOR_CENTER_ALIGN}>
        <div className="row">
          <div className="col-md-12">GRADE</div>
        </div>
        <div className="row">
          <div className="col-md-6" style={SOR_SUBJECT_MARGIN_ALPHABET}>
            ALPHABETICAL
          </div>
          <div className="col-md-6" style={SOR_SUBJECT_MARGIN_NUMERICAL}>
            NUMERICAL
          </div>
        </div>
      </div>
      <div className="col-md-2" style={SOR_30_WIDTH}>
        LEVEL
      </div>
      <div className="col-md-4">
        {EXAMININGAUTHORITYANDLANGUAGEMEDIUMHEADER(examlvltype, examyr)}
      </div>
    </div>
  );
};

export const EXAMGRADESTAR = (examlvltype, examyr) => {
  if (examlvltype === "A3") {
    return (
      <div className="row">
        <div className="col-md-4">*****************************</div>
        <div className="col-md-2">*******</div>
        <div className="col-md-2">*************</div>
        <div className="col-md-2">*************</div>
      </div>
    );
  }
  if (
    examlvltype === "PSLE19801981" ||
    examlvltype === "PSLE19821992" ||
    examlvltype === "PSLE19932012" ||
    examlvltype === "PSLE2013" ||
    examlvltype === "PSLE1979"
  ) {
    return <span />;
  }

  return (
    <div className="row" style={SOR_BOLD_TEXT}>
      <div className="col-md-4">*****************************</div>
      <div className="col-md-2" style={SOR_CENTER_ALIGN}>
        <div className="row">
          <div className="col-md-6">*******</div>
          <div className="col-md-6">*******</div>
        </div>
      </div>
      <div className="col-md-2" style={SOR_30_WIDTH}>
        ***************
      </div>
      <div className="col-md-4">
        {EXAMININGAUTHORITYANDLANGUAGEMEDIUMSTAR(examlvltype, examyr)}
      </div>
    </div>
  );
};

export const SUBJECTGRADE = (
  examlvltype,
  grade,
  level,
  examyr,
  langugange,
  examination
) => {
  if (examlvltype === "A3") {
    return (
      <div className="row">
        <div className="col-md-3">{level}</div>
        <div className="col-md-3">
          {GETSUBJGRADE(grade, examyr, examlvltype)}
        </div>
        <div className="col-md-2">
          {EXAMININGAUTHORITYANDLANGUAGEMEDIUMDATA(
            examlvltype,
            examyr,
            langugange,
            examination
          )}
        </div>
      </div>
    );
  }
  if (examlvltype === "PSLE19801981" || examlvltype === "PSLE19821992") {
    return (
      <div className="row">
        <div className="col-md-3">{grade}</div>
        <div className="col-md-4">
          {EXAMININGAUTHORITYANDLANGUAGEMEDIUMDATA(
            examlvltype,
            examyr,
            langugange,
            examination
          )}
        </div>
      </div>
    );
  }
  if (examlvltype === "PSLE19932012" || examlvltype === "PSLE2013") {
    return (
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-3">{grade}</div>
      </div>
    );
  }
  if (examlvltype === "PSLE1979") {
    return (
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-3" style={SOR_PSLE_GRADE_1979}>
          {grade}
        </div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-md-3">{GETSUBJGRADE(grade, examyr, examlvltype)}</div>
      <div className="col-md-3" style={SOR_30_WIDTH}>
        {level}
      </div>
      <div className="col-md-6">
        {EXAMININGAUTHORITYANDLANGUAGEMEDIUMDATA(
          examlvltype,
          examyr,
          langugange,
          examination
        )}
      </div>
    </div>
  );
};

export const PAPERGRADE = (
  examlvltype,
  examlvl,
  papergrade,
  examyr,
  langugange,
  examination
) => {
  if (examlvltype === "A3") {
    return (
      <div className="row">
        <div className="col-md-6">
          {GETPAPERGRADE(papergrade, examyr, examlvl)}
        </div>

        <div className="col-md-2">
          {EXAMININGAUTHORITYANDLANGUAGEMEDIUMDATA(
            examlvltype,
            examyr,
            langugange,
            examination
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-md-3">
        {GETPAPERGRADE(papergrade, examyr, examlvl)}
      </div>
      <div className="col-md-3" style={SOR_30_WIDTH}>
        -
      </div>
      <div className="col-md-6">
        {EXAMININGAUTHORITYANDLANGUAGEMEDIUMDATA(
          examlvltype,
          examyr,
          langugange,
          examination
        )}
      </div>
    </div>
  );
};

export const SUBJECTNAME = (
  examlvltype,
  subjectname,
  examiningagency,
  examiningauthority
) => {
  if (
    examlvltype === "PSLE19801981" ||
    examlvltype === "PSLE19821992" ||
    examlvltype === "PSLE19932012" ||
    examlvltype === "PSLE2013"
  ) {
    return (
      <div className="row">
        <div className="col-md-3" />
        <div className="col-md-6">{subjectname}</div>
      </div>
    );
  }
  if (examlvltype === "PSLE1979") {
    return (
      <div className="row">
        <div className="col-md-6" />
        <div className="col-md-6" style={SOR_PSLE_NAME_1979}>
          {subjectname}
        </div>
      </div>
    );
  }
  return (
    <span>
      {subjectname}
      {examiningagency !== undefined &&
      examiningagency !== examiningauthority ? (
        <span>
          <br />
          &nbsp;&nbsp;{examiningagency}
        </span>
      ) : (
        <span />
      )}
    </span>
  );
};

export const ADDITIONALINFO = (
  examlvltype,
  totalsubjects,
  aggregatescore,
  overallResults,
  streameligible,
  highestscore,
  lowestscore
) => {
  if (examlvltype === "PSLE19801981") {
    return (
      <span>
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-3">
            <strong>AGGREGATE SCORE:</strong>
          </div>
          <div className="col-md-1">{aggregatescore}</div>
        </div>
        <div className="row">
          <div style={SOR_20_WIDTH} />
          <div className="col-md-3">
            <strong>OVERALL RESULTS:</strong>
          </div>
          <div className="col-md-1">{overallResults}</div>
        </div>
        <div className="row">
          <div style={SOR_20_WIDTH} />
          <div className="col-md-3">
            <strong>STREAM ELIGIBLE FOR:</strong>
          </div>
          <div className="col-md-1">{streameligible}</div>
        </div>
      </span>
    );
  }
  if (examlvltype === "PSLE19821992" || examlvltype === "PSLE19932012") {
    return (
      <span>
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-3">
            <strong>AGGREGATE SCORE</strong>
          </div>
          <div className="col-md-1">:{aggregatescore}</div>
        </div>
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-3">
            <strong>OVERALL RESULTS</strong>
          </div>
          <div className="col-md-1">:{overallResults}</div>
        </div>
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-3">
            <strong>STREAM ELIGIBLE FOR</strong>
          </div>
          <div className="col-md-1">:{streameligible}</div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-3">
            <strong>HIGHEST AGGREGATE SCORE</strong>
          </div>
          <div className="col-md-1">:{highestscore}</div>
        </div>
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-3">
            <strong>LOWEST AGGREGATE SCORE</strong>
          </div>
          <div className="col-md-1">:{lowestscore}</div>
        </div>
      </span>
    );
  }
  if (examlvltype === "PSLE2013") {
    return (
      <span>
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-3">
            <strong>AGGREGATE SCORE:</strong>
          </div>
          <div className="col-md-1">{aggregatescore}</div>
        </div>
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-3">
            <strong>STREAM ELIGIBLE FOR:</strong>
          </div>
          <div className="col-md-1">{streameligible}</div>
        </div>
      </span>
    );
  }
  if (examlvltype === "PSLE1979") {
    return <span />;
  }
  return (
    <span>
      <strong>Total number of subjects recorded:</strong>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
        {GETNUMBER(totalsubjects)}
      </span>
    </span>
  );
};

export const RENDER_SOR_HEADER = ({ certificate }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>I certify that in the</strong>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-12" style={EXAM_LVL_TEXT}>
          {certificate.name}
        </div>
      </div>
    </div>
  </div>
);

export const RENDER_SOR_FOOTER = ({ certificate }) => (
  <div className="row" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>This statement is issued to</strong>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {certificate.recipient.name}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-2" style={SOR_INDENT_TEXT}>
          <img
            width="50px"
            height="80px"
            src={certificate.additionalData.certifierSignature}
          />
        </div>
        <div className="col-md-10" />
      </div>
      <div className="row">
        <div className="col-md-12">
          {certificate.additionalData.certifierName}
          <div className="row">
            <div className="col-md-6">
              {certificate.additionalData.certifierDesignation}
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
                  <strong>Date of Issue</strong>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
                    {FORMATDATEPREFIX(certificate.issuedOn)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <strong>Singapore Examinations and Assessment Board</strong>
        </div>
      </div>
      <div className="row">&nbsp;</div>
    </div>
  </div>
);

export const RENDER_SOR_INFO = ({ certificate }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Examination held in the year</strong>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {FORMATYEARPREFIX(certificate.attainmentDate)}
          </span>
        </div>
      </div>
      <div className="row">&nbsp;</div>
      <div className="row">
        <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Candidate</strong>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {certificate.recipient.name}
          </span>
        </div>
      </div>
      <div className="row">&nbsp;</div>
      <div className="row">
        <div className="col-md-6" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>NRIC/Foreign Identification No.</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {GETIDENTIFICATION(certificate)}
          </span>
        </div>
        <div className="col-md-6" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Index No.</strong>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {certificate.additionalData.indexNo}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export const RENDER_SOR_INFO_PSLE = ({ certificate }) => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>held in the year</strong>&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {FORMATYEARPREFIX(certificate.attainmentDate)}
          </span>
        </div>
      </div>
      <div className="row">&nbsp;</div>
      <div className="row">
        <div className="col-md-2" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Candidate</strong>
        </div>
        <div className="col-md-10" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {certificate.recipient.name}
        </div>
      </div>
      <div className="row">&nbsp;</div>
      <div className="row">
        <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>of</strong>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span style={SOR_TRANSCRIPT_FONT_SIZE_11}>
            {certificate.additionalData.schoolName}
          </span>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>NRIC/Foreign Identification No.</strong>
        </div>
        <div className="col-md-2" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {GETIDENTIFICATION(certificate)}
        </div>
        <div className="col-md-2" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
          <strong>Index No.</strong>
        </div>
        <div className="col-md-4" style={SOR_TRANSCRIPT_FONT_SIZE_11}>
          {certificate.additionalData.indexNo}
        </div>
      </div>
    </div>
  </div>
);

export const GETESORTYPE = (certificate, examlvl) => {
  let infotype = "";
  if (examlvl === "PSLE") {
    infotype = RENDER_SOR_INFO_PSLE(certificate);
  } else {
    infotype = RENDER_SOR_INFO(certificate);
  }

  return infotype;
};

export const RENDER_TRANSCRIPT = ({ certificate }, examlvl, examlvltype) => {
  // Get transcript info
  const transcript = get(certificate, "transcript");
  const totalsubjects = transcript.length;
  const examyr = FORMATYEARPREFIX(certificate.attainmentDate);

  const transcriptDetails = transcript.map(trn => (
    <div className="row" style={SOR_TRANSCRIPT_FONT_SIZE_11} key={trn.name}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-4" style={SOR_SUBJECT_REM_RIGHT_PAD}>
            {SUBJECTNAME(
              examlvltype,
              trn.name,
              trn.pExaminingAgency,
              trn.examiningAuthority
            )}
          </div>
          <div className="col-md-8">
            {SUBJECTGRADE(
              examlvltype,
              trn.grade,
              trn.level,
              examyr,
              trn.languageMedium,
              trn.examiningAuthority
            )}
          </div>
        </div>
      </div>
      {trn.subTranscript !== undefined ? (
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4">
              &nbsp;&nbsp;&nbsp;{trn.subTranscript}
            </div>
            <div className="col-md-8">
              {PAPERGRADE(
                examlvltype,
                examlvl,
                trn.paperGrade,
                examyr,
                trn.languageMedium,
                trn.examiningAuthority
              )}
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  ));

  return (
    <div className="row" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12">&nbsp;</div>
        </div>
        <div className="row" style={SOR_BOLD_TEXT}>
          <div className="col-md-12">
            obtained the grades for the subjects stated below:
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">&nbsp;</div>
        </div>
        {EXAMGRADEHEADER(examlvltype, examyr)}
        <div className="row">&nbsp;</div>
        {transcriptDetails}
        <div className="row">&nbsp;</div>
        {EXAMGRADESTAR(examlvltype, examyr)}
        <div className="row">&nbsp;</div>
        <div className="row">
          <div className="col-md-12" style={SOR_TRANSCRIPT_FONT_SIZE_12}>
            {ADDITIONALINFO(
              examlvltype,
              totalsubjects,
              certificate.additionalData.aggregateScore,
              certificate.additionalData.overallResults,
              certificate.additionalData.streamEligibleFor,
              certificate.additionalData.highestAggregatenumericalGrade,
              certificate.additionalData.lowestAggregatenumericalGrade
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TEMPLATE_ESOR = (certificate, examlvl, examlvltype) => (
  <div className="container-fluid">
    <div className="row justify-content-md-center">
      <div className="col-md-2" />
      <div className="col-md-8" style={GETESORBGCOLOR(examlvl)}>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-1">
              <img
                src="/static/images/SEAB_logo.png"
                className="img-responsive"
                style={SOR_TOP_LOGO}
              />
            </div>
            <div className="col-md-11" style={SOR_TOP_HEADER}>
              SINGAPORE EXAMINATIONS AND ASSESSMENT BOARD
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12" style={SOR_TITLE}>
              STATEMENT OF RESULTS
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12">{RENDER_SOR_HEADER(certificate)}</div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12">{GETESORTYPE(certificate, examlvl)}</div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12">
              {RENDER_TRANSCRIPT(certificate, examlvl, examlvltype)}
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>

          <div className="row">
            <div className="col-md-12">{RENDER_SOR_FOOTER(certificate)}</div>
          </div>
        </div>
      </div>
      <div className="col-md-2" />
    </div>
  </div>
);

export const TEMPLATE_EXPLANATORYNOTES = examlvltype => (
  <div className="container-fluid">
    <div className="row justify-content-md-center">
      <div className="col-md-2" />
      <div className="col-md-8" style={EXPLANATORY_PAGE_SIZE}>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>
          <div className="row">
            <div className="col-md-12" style={EXPLANATORY_TITLE}>
              EXPLANATORY NOTES
            </div>
          </div>
        </div>
        <br />
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-11">{GETEXPLANATORYNOTES(examlvltype)}</div>
          </div>
        </div>
      </div>
      <div className="col-md-2" />
    </div>
  </div>
);

RENDER_SOR_HEADER.propTypes = {
  certificate: PropTypes.object.isRequired
};

RENDER_SOR_FOOTER.propTypes = {
  certificate: PropTypes.object.isRequired
};

RENDER_SOR_INFO.propTypes = {
  certificate: PropTypes.object.isRequired
};

RENDER_SOR_INFO_PSLE.propTypes = {
  certificate: PropTypes.object.isRequired
};

TEMPLATE_ESOR.propTypes = {
  certificate: PropTypes.object.isRequired
};

RENDER_TRANSCRIPT.propTypes = {
  certificate: PropTypes.object.isRequired
};
