import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import PropTypes from "prop-types";
import { isoDateToLocal, sassClassNames, NUS_TS_BACKIMG } from "../common";
import scss from "./transcript.scss";

// constants
const MAX_PAGES = 10;
const MAX_ROWS_PER_COL = 40;
// height of transcript page content
const CONTENT_HEIGHT = 572;

// global variables
// JSON data source
let jsonData;
// HTML representation of JSON data
let dataFeeder;
// array storing page content bottom of each page
const contentBottom = [];
// global state
const onPrintRow = function(action) {
  switch (action.type) {
    case "NO_CHANGE":
      return false;
    case "CHANGE_COLUMN":
      return true;
    default:
      return false;
  }
};
const gState = createStore(onPrintRow);

// construct class names
const cls = names => sassClassNames(names, scss);

// get table row by id
const rowEl = (page, col, row) => {
  const id = `row-${page}-${col}-${row}`;
  return document.getElementById(id);
};

// get canvas by id
const canvasEl = page => {
  const id = `canvas-${page}`;
  return document.getElementById(id);
};

// get page by id
const pageEl = page => {
  const id = `page-${page}`;
  return document.getElementById(id);
};

// get footer by id
const footerEl = page => {
  const id = `footer-${page}`;
  return document.getElementById(id);
};

// render a blank table with column width information
const setColWidth = () => {
  const html = (
    <tr>
      <td className={cls("ts-col0 no-padding")} />
      <td className={cls("ts-col1 no-padding")} />
      <td className={cls("ts-col2 no-padding")} />
      <td className={cls("ts-col3 no-padding")} />
    </tr>
  );
  return html;
};

// render a term data header
const renderTranscriptTermHeader = () => {
  const html = (
    <Fragment>
      <td className={cls("ts-title ts-highlight")}>
        <u>MODULE</u>
      </td>
      <td className={cls("ts-title ts-highlight")}>&nbsp;</td>
      <td className={cls("ts-title ts-highlight")}>
        <u>GRADE</u>
      </td>
      <td className={cls("ts-title ts-highlight")}>
        <u>CREDITS</u>
      </td>
    </Fragment>
  );
  return html;
};

// data class
class TranscriptDataFeeder {
  constructor() {
    this.length = 0;
    this.dataArray = [];
    this.dataType = [];
    this.termDataRange = { start: -1, end: -1 };
  }

  pushRow(type, data) {
    this.dataType.push(type);
    if (type.startsWith("ts-term") && this.termDataRange.start < 0)
      this.termDataRange.start = this.length;
    if (
      this.termDataRange.end < 0 &&
      this.termDataRange.start >= 0 &&
      !type.startsWith("ts-term")
    )
      this.termDataRange.end = this.length - 1;
    this.dataArray.push(data);
    this.length += 1;
  }

  push(type, data) {
    if (typeof data === "object" && data instanceof Array)
      data.forEach(x => {
        this.push(type, x);
      });
    else this.pushRow(type, data);
  }

  data(i) {
    if (i < this.length) return this.dataArray[i];
    return null;
  }

  type(i) {
    if (i < this.length) return this.dataType[i];
    return null;
  }
}

// transcript header
class TranscriptHeader extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  // main render
  render() {
    const html = (
      <div ref={this.myRef}>
        <table className={cls("header-pers-info")} width="100%">
          <tbody key="pers-info-tbody">
            <tr key="ts-unoff-title">
              <td colSpan="8" className={cls("header-unoff")}>
                {/* unofficial transcript name */}
                &nbsp;
              </td>
            </tr>
            <tr>
              <td colSpan="8">
                <hr />
              </td>
            </tr>
            <tr key="pers-info-tr">
              {/* student's personal info */}
              <td className={cls("header-pers-info-key")}>NAME:</td>
              <td colwidth="26%">{jsonData.recipient.name}</td>
              <td className={cls("header-pers-info-key")}>STUDENT NO:</td>
              <td colwidth="11.5%">{jsonData.recipient.studentId}</td>
              <td className={cls("header-pers-info-key")}>DATE OF BIRTH:</td>
              <td colwidth="12.1%">
                {isoDateToLocal(jsonData.recipient.dateOfBirth)}
              </td>
              <td className={cls("header-pers-info-key")}>DATE ISSUED:</td>
              <td colwidth="12.1%">{isoDateToLocal(jsonData.issuedOn)}</td>
            </tr>
            <tr>
              <td colSpan="8">
                <hr />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    return html;
  }
}

// transcript header
class TranscriptFooter extends Component {
  // main render
  render() {
    const html = (
      <table width="100%">
        <tbody>
          <tr>
            <td className={cls("footer-text")}>
              <div id={`footer-${this.props.page}`} />
            </td>
          </tr>
        </tbody>
      </table>
    );
    return html;
  }
}

TranscriptFooter.propTypes = {
  page: PropTypes.string.isRequired
};

// transcript content - program info
class TranscriptProgram {
  // main render
  render() {
    const progData = jsonData.additionalData.programData;
    if (progData)
      progData.forEach(data => {
        if (data.statusCode !== "DC") this.renderProgData(data);
      });
  }

  // render for a program
  renderProgData(data) {
    dataFeeder.push(
      "ts-prog",
      <td colSpan="4">
        <div className={cls("prog-row ts-title")}>
          <div className={cls("prog-key prog-col0")}>PROGRAMME:</div>
          <div className={cls("prog-col1")}>
            {data.programName.toUpperCase()}
          </div>
        </div>
      </td>
    );
    dataFeeder.push(
      "ts-prog",
      <td colSpan="4">
        <div className={cls("prog-row ts-title")}>
          <div className={cls("prog-key prog-col0")}>PROGRAMME STATUS:</div>
          <div className={cls("prog-col1")}>
            {data.statusDescription.toUpperCase()}
          </div>
        </div>
      </td>
    );
    // to pass lint
    this.dummy = 0;
  }
}

// transcript credit transfer
class TranscriptCreditTransfer {
  // constructor
  constructor(termData, termIdx) {
    this.termData = termData;
    this.termIdx = termIdx;
  }

  // main render
  render() {
    // bypass non-transfer
    if (!this.termData.creditTransfer) return "";
    // identify external and internal
    let internal = false;
    let external = false;
    for (let i = 0; i < this.termData.creditTransfer.length; i += 1) {
      const transferData = this.termData.creditTransfer[i];
      if (transferData.sourceType === "E") external = true;
      else if (transferData.sourceType === "I") internal = true;
      if (internal && external) break;
    }
    if (this.termIdx === 0) {
      // only print in 1st term
      if (external) {
        // external transfer title
        this.renderExtTrfTitle();
        // APC
        this.renderAPC();
      } else {
        // internal APC
        this.renderIntAPC();
      }
    } else {
      // only print for 2nd term onward
      this.renderIntTrfSummary();
    }
    this.renderIntTrfDetail();
    if (this.termIdx !== 0) {
      // from 2nd term onward
      this.renderTrfFromExtOrg();
    }
    this.renderTrfEqualNUS();
    return "";
  }

  // render external transfer title
  renderExtTrfTitle() {
    dataFeeder.push(
      "ts-term-trf-extitle",
      <td colSpan="4" className={cls("ts-termrem")}>
        CREDITS RECOGNISED ON ADMISSION
      </td>
    );
    // to pass lint
    this.dummy = 0;
  }

  // render APC
  renderAPC() {
    this.termData.creditTransfer.forEach(transferData => {
      if (transferData.sourceType === "E" && transferData.creditsNoGPA > 0) {
        // APC
        dataFeeder.push(
          "ts-term-trf-apc",
          <Fragment>
            <td colSpan="2" className={cls("ts-termrem")}>
              AWARDED ADVANCED PLACEMENT CREDITS FOR THE ACADEMIC WORK COMPLETED
              AT {transferData.orgName.toUpperCase()}
            </td>
            <td className={cls("ts-grade")}>-</td>
            <td className={cls("ts-credits")}>
              {transferData.creditsNoGPA.toFixed(2)}
            </td>
          </Fragment>
        );
      }
    });
  }

  // render internal APC
  renderIntAPC() {
    this.termData.creditTransfer.forEach(transferData => {
      if (transferData.sourceType === "I") {
        const isNUSAPCTest = transferData.orgId === "E0000002277";
        const isAPC = transferData.orgId === "E0000002430";
        let title;
        if (!isNUSAPCTest && !isAPC) {
          title =
            "CREDITS RECOGNISED ON ADMISSION (NUS MODULES COMPLETED PRIOR TO CURRENT PROGRAMME):";
        } else if (isNUSAPCTest) {
          title =
            "AWARDED ADVANCED PLACEMENT CREDITS FOR PASSING THE PLACEMENT TEST(S) CONDUCTED BY NUS";
        } else if (isAPC) {
          title = "AWARDED ADVANCED PLACEMENT CREDITS";
        }
        const grade = isNUSAPCTest || isAPC ? "-" : "";
        const credits =
          transferData.creditsNoGPA !== 0
            ? transferData.creditsNoGPA.toFixed(2)
            : "";
        dataFeeder.push(
          "ts-term-trf-intapc",
          <Fragment>
            <td span="2" className={cls("ts-termrem")}>
              {title}
            </td>
            <td className={cls("ts-grade")}>{grade}</td>
            <td className={cls("ts-credits")}>{credits}</td>
          </Fragment>
        );
      }
    });
  }

  // render internal transfer summary
  renderIntTrfSummary() {
    this.termData.creditTransfer.forEach(transferData => {
      if (transferData.sourceType === "I") {
        let title;
        if (transferData.sourceCareer) {
          title = `CREDITS RECOGNISED (COMPLETED MODULES FROM ${
            transferData.sourceCareer
          } CAREER)`;
        } else {
          title = "CREDITS RECOGNISED (COMPLETED MODULES FROM OTHER PROGRAMME)";
        }
        const credits =
          transferData.creditsNoGPA !== 0
            ? transferData.creditsNoGPA.toFixed(2)
            : "";
        dataFeeder.push(
          "ts-term-trf-inttrf",
          <Fragment>
            <td span="2" className={cls("ts-termrem")}>
              {title}
            </td>
            <td>&nbsp;</td>
            <td className={cls("ts-credits")}>{credits}</td>
          </Fragment>
        );
      }
    });
  }

  // render internal transfer details
  renderIntTrfDetail() {
    this.termData.creditTransfer.forEach(transferData => {
      if (transferData.sourceType === "I") {
        transferData.details.forEach(detail => {
          if (
            detail.status === "P" &&
            (detail.includeInGPA ||
              (detail.grade === "S" || detail.grade === "CS"))
          ) {
            const credits =
              detail.credits !== 0 ? detail.credits.toFixed(2) : "-";
            dataFeeder.push(
              "ts-term-trf-inttrfdtl",
              <Fragment>
                <td className={cls("ts-col0 ts-modcode")}>
                  {detail.moduleCode}
                </td>
                <td className={cls("ts-col1 ts-modname")}>
                  {detail.moduleName}
                </td>
                <td className={cls("ts-col2 ts-grade")}>{detail.grade}</td>
                <td className={cls("ts-col3 ts-credits")}>{credits}</td>
              </Fragment>
            );
          }
        });
      }
    });
  }

  // render credit transfer from ext organization
  renderTrfFromExtOrg() {
    this.termData.creditTransfer.forEach(transferData => {
      if (transferData.sourceType === "E" && transferData.creditsNoGPA > 0) {
        dataFeeder.push(
          "ts-term-trf-fromorg",
          <Fragment>
            <td colSpan="2" className={cls("ts-termrem")}>
              CREDITS TRANSFERRED FROM {transferData.orgName}
            </td>
            <td className={cls("ts-grade")}>-</td>
            <td className={cls("ts-credits")}>
              {transferData.creditsNoGPA.toFixed(2)}
            </td>
          </Fragment>
        );
      }
    });
  }

  // render credit transfer with equalivalent NUS grade from ext organization
  renderTrfEqualNUS() {
    this.termData.creditTransfer.forEach(transferData => {
      if (transferData.sourceType === "E" && transferData.creditsGPA > 0) {
        dataFeeder.push(
          "ts-term-trf-eqnus",
          <td colSpan="4">
            CREDITS TRANSFERRED (WITH EQUIVALENT NUS GRADE) FROM{" "}
            {transferData.orgName}:
          </td>
        );
        transferData.details.forEach(detail => {
          if (
            detail.status === "P" &&
            (detail.includeInGPA ||
              (detail.grade === "S" || detail.grade === "CS"))
          ) {
            const credits =
              detail.credits !== 0 ? detail.credits.toFixed(2) : "-";
            dataFeeder.push(
              "ts-term-trf-eqnusdtl",
              <Fragment>
                <td className={cls("ts-col0 ts-modcode")}>
                  {detail.moduleCode}
                </td>
                <td className={cls("ts-col1 ts-modname")}>
                  {detail.moduleName}
                </td>
                <td className={cls("ts-col2 ts-grade")}>{detail.grade}</td>
                <td className={cls("ts-col3 ts-credits")}>{credits}</td>
              </Fragment>
            );
          }
        });
      }
    });
  }
}

// render individual module enrollment info
class TranscriptModuleEnroll {
  // constructor
  constructor(data) {
    this.data = data;
  }

  // main render
  render() {
    let { moduleCode } = this.data;
    if (
      (this.data.gradingBasis === "NCP" && this.data.includeInGPA) ||
      this.data.remarks
    )
      moduleCode = `*${moduleCode}`;
    const credits =
      this.data.credits === 0 ? "-" : this.data.credits.toFixed(2);
    dataFeeder.push(
      "ts-term-enl-mod",
      <Fragment>
        <td className={cls("ts-col0 ts-modcode")}>{moduleCode}</td>
        <td className={cls("ts-col1 ts-modname")}>{this.data.moduleName}</td>
        <td className={cls("ts-col2 ts-grade")}>{this.data.grade}</td>
        <td className={cls("ts-col3 ts-credits")}>{credits}</td>
      </Fragment>
    );
  }
}

// render module enrollment
class TranscriptEnrollment {
  // constructor
  constructor(termData) {
    this.termData = termData;
  }

  // main render
  render() {
    this.renderEnrollData();
  }

  // render module enrollment title
  renderEnrollTitle() {
    dataFeeder.push(
      "ts-term-enl-title",
      <td colSpan="4" className={cls("ts-termrem")}>
        ENROLLED IN THE FOLLOWING NUS MODULES:
      </td>
    );
    // to pass lint
    this.dummy = 0;
  }

  // render supplementary exam title
  renderSupplementaryTitle() {
    dataFeeder.push(
      "ts-term-enl-suptitle",
      <td colSpan="4" className={cls("ts-termrem")}>
        SUPPLEMENTARY EXAMINATION:
      </td>
    );
    // to pass lint
    this.dummy = 0;
  }

  // render module enrollment data
  renderEnrollData() {
    if (!this.termData.modules) return;
    if (this.termData.creditTransfer && this.termData.modules) {
      this.renderEnrollTitle();
    }
    let hasSuppl = false;
    this.termData.modules.forEach(data => {
      if (data.gradingBasis === "SUP") hasSuppl = true;
      else new TranscriptModuleEnroll(data).render();
    });
    if (!hasSuppl) return;
    this.renderSupplementaryTitle();
    this.termData.modules.forEach(data => {
      if (data.gradingBasis === "SUP")
        new TranscriptModuleEnroll(data).render();
    });
  }
}

// render transcript summary
class TranscriptSummary {
  // constructor
  constructor(termData) {
    this.termData = termData;
  }

  // main render
  render() {
    this.termData.summary.forEach(data => {
      // degree name
      this.renderTermDegree(data);
      // GPA
      if (data.specialGPA) this.renderSpecialGPA(data);
      else this.renderGPA(data);
      // term honours
      if (data.awards) this.renderTermHonours(data);
    });
  }

  // render degree
  renderTermDegree(sumData) {
    dataFeeder.push(
      "ts-term-deg",
      <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
        <p />
        {sumData.programName.toUpperCase()}
      </td>
    );
    // to pass lint
    this.dummy = 0;
  }

  // render GPA
  renderGPA(sumData) {
    let gpa;
    if (sumData.includeInGPA) gpa = sumData.GPA.toFixed(2);
    else gpa = "NOT APPLICABLE";
    dataFeeder.push(
      "ts-term-gpa",
      <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
        {`${sumData.GPAName.toUpperCase()} : ${gpa}`}
      </td>
    );
    // to pass lint
    this.dummy = 0;
  }

  // render special GPA
  renderSpecialGPA(sumData) {
    sumData.specialGPA.forEach(data => {
      const name = data.type === "FCAP" ? "*" : `${data.name}`;
      dataFeeder.push(
        "ts-term-sgpa",
        <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
          {`${name.toUpperCase()} :${data.GPA.toFixed(2)}`}
        </td>
      );
    });
    // to pass lint
    this.dummy = 0;
  }

  // render term honours
  renderTermHonours(sumData) {
    sumData.awards.forEach(data => {
      dataFeeder.push(
        "ts-term-awd",
        <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
          {data.awardName.toUpperCase()}
        </td>
      );
    });
    // to pass lint
    this.dummy = 0;
  }
}

// render remarks at the end of a term
class TranscriptTermRemarks {
  // constructor
  constructor(termData) {
    this.termData = termData;
    this.cache = new TranscriptDataFeeder();
  }

  // main render
  render() {
    this.renderEnrollRemarks();
    this.renderTransferRemarks();
    this.renderFinalGPARemarks();
    this.renderTranscriptTexts();
    if (this.cache.length === 0) return;
    this.renderRemarksTitle();
    for (let i = 0; i < this.cache.length; i += 1)
      dataFeeder.push(this.cache.type(i), this.cache.data(i));
  }

  // render remarks title
  renderRemarksTitle() {
    dataFeeder.push(
      "ts-term-rem-title",
      <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
        <p />
        <u>REMARKS:</u>
      </td>
    );
    // to pass lint
    this.dummy = 0;
  }

  // render enrollment remarks
  renderEnrollRemarks() {
    if (!this.termData.modules) return "";
    // remarks of NCP
    this.termData.modules.forEach(data => {
      if (data.includeInGPA && data.gradingBasis === "NCP") {
        this.cache.push(
          "ts-term-rem-ncp",
          <td colSpan="4" className={cls("ts-termrem")}>
            *{data.moduleCode} - Module was excluded from computation of the
            final Cumulative Average Points/Marks.
          </td>
        );
      }
    });
    // other remarks
    this.termData.modules.forEach(data => {
      if (data.remarks) {
        this.cache.push(
          "ts-term-rem-oth",
          <td colSpan="4" className={cls("ts-termrem")}>
            {data.moduleCode} - {data.remarks}
          </td>
        );
      }
    });
    // to pass lint
    this.dummy = 0;
    return "";
  }

  // render credit transfer remarks
  renderTransferRemarks() {
    if (this.termData.creditTransfer && this.termData.formOfStudy !== "NOC") {
      this.termData.creditTransfer.forEach(transferData => {
        if (transferData.sourceType === "E") {
          const isNUSAPCTest = transferData.orgId === "E0000002277";
          const isAPC = transferData.orgId === "E0000002430";
          if (!isNUSAPCTest && !isAPC) {
            this.cache.push(
              "ts-term-rem-trf",
              <td colSpan="4" className={cls("ts-termrem")}>
                Please refer to the transcript of {transferData.orgName} for
                details of modules taken and grades/credits obtained.
              </td>
            );
          }
        }
      });
    }
  }

  // render final GPA remarks
  renderFinalGPARemarks() {
    // check existence of final GPA
    const hasFinalGPA = this.termData.summary.some(data => {
      let found = false;
      if (data.specialGPA) {
        found = data.specialGPA.some(sdata => sdata.type === "FGPA");
        if (found) return true;
      }
      return false;
    });
    if (!hasFinalGPA) return;
    this.cache.push(
      "ts-term-rem-fgpa",
      <td colSpan="4" className={cls("ts-termrem")}>
        The Final Cumulative Average Point takes into account student&rsquo;s
        academic performance at the Partner University.
      </td>
    );
  }

  // render transcript texts
  renderTranscriptTexts() {
    if (!this.termData.remarks) return;
    let text = "";
    this.termData.remarks.forEach(data => {
      text += `${data.trim()} `;
    });
    this.cache.push(
      "ts-term-rem-txt",
      <td colSpan="4" className={cls("ts-termrem")}>
        {text}
      </td>
    );
  }
}

// transcript term data
class TranscriptTermData {
  // constructor
  constructor(termData, termIdx) {
    this.termData = termData;
    this.termIdx = termIdx;
  }

  // main render
  render() {
    this.renderAcadYear();
    this.renderFormOfStudy();
    this.renderCreditTransfer();
    this.renderEnrollment();
    this.renderTermSummary();
    this.renderTermRemarks();
  }

  // render academic year
  renderAcadYear() {
    dataFeeder.push(
      "ts-term-year",
      <td colSpan="4" className={cls("ts-title ts-highlight")}>
        <p />
        ACADEMIC YEAR {this.termData.term.toUpperCase()}
        <p />
      </td>
    );
  }

  // render form of study description
  renderFormOfStudy() {
    if (
      this.fosPrintArea !== "ND" &&
      this.termData.fosDescription &&
      this.termData.organization
    ) {
      dataFeeder.push(
        "ts-term-fos",
        <td colSpan="4" className={cls("ts-termrem")}>
          {`${this.termData.fosDescription} ${this.termData.organization}`}
        </td>
      );
    }
  }

  // render credit transfer data
  renderCreditTransfer() {
    new TranscriptCreditTransfer(this.termData, this.termIdx).render();
  }

  // render module enrollment data
  renderEnrollment() {
    new TranscriptEnrollment(this.termData).render();
  }

  // render term summary info
  renderTermSummary() {
    new TranscriptSummary(this.termData).render();
  }

  // render term remarks
  renderTermRemarks() {
    new TranscriptTermRemarks(this.termData).render();
  }
}

// render student LOA data
class TranscriptLeave {
  // constructor
  constructor(leaveData) {
    this.leaveData = leaveData;
  }

  // main render
  render() {
    if (!this.leaveData) return "";
    this.leaveData.forEach(data => {
      this.renderLeave(data);
    });
    return "";
  }

  // render leave data
  renderLeave(data) {
    let text = `LEAVE OF ABSENCE FROM ${isoDateToLocal(data.from)}`;
    if (data.to) text += ` TO ${isoDateToLocal(data.to)}`;
    dataFeeder.push(
      "ts-loa",
      <td colSpan="4" className={cls("ts-title ts-highlight")}>
        <hr />
        {text}
      </td>
    );
    // to pass lint
    this.dummy = 0;
  }
}

// render degree conferment
class TranscriptDegree {
  // constructor
  constructor(degreeData) {
    this.degreeData = degreeData;
  }

  // main render
  render() {
    if (!this.degreeData) return "";
    this.renderDegreeInfoTitle();
    this.degreeData.forEach(data => {
      this.renderDegree(data);
    });
    return "";
  }

  // render degree info beginning title
  renderDegreeInfoTitle() {
    dataFeeder.push(
      "ts-deg-begin",
      <td colSpan="4" className={cls("ts-title ts-highlight")}>
        <hr />
        CONFERRED/AWARDED THE DEGREE(S)/DIPLOMA(S) OF:
      </td>
    );
    // to pass lint
    this.dummy = 0;
  }

  // render major/minor
  renderMajorMinor(data) {
    if (!data.plans) return "";
    let descr;
    data.plans.forEach(planData => {
      if (!planData.specialProgram) {
        if (planData.type === "HON")
          descr = `MAJOR: ${planData.transcriptDescr}`;
        else descr = `${planData.typeName}: ${planData.transcriptDescr}`;
        if (planData.type === "JMP" && planData.planDescr)
          descr += ` with ${planData.planDescr}`;
        dataFeeder.push(
          "ts-deg-plan",
          <td colSpan="4" className={cls("ts-title ts-highlight")}>
            &nbsp;&nbsp;&nbsp;&nbsp;{descr.toUpperCase()}
          </td>
        );
      }
    });
    // to pass lint
    this.dummy = 0;
    return "";
  }

  // render subplans
  renderSubplans(data) {
    if (!data.plans) return "";
    let descr;
    data.plans.forEach(planData => {
      if (planData.subplans)
        planData.subplans.forEach(subplData => {
          descr = `${subplData.typeName}: ${subplData.transcriptDescr}`;
          dataFeeder.push(
            "ts-deg-spln",
            <td colSpan="4" className={cls("ts-title ts-highlight")}>
              &nbsp;&nbsp;&nbsp;&nbsp;{descr.toUpperCase()}
            </td>
          );
        });
    });
    // to pass lint
    this.dummy = 0;
    return "";
  }

  // render specializations
  renderSpecializations(data) {
    if (!data.specializations) return "";
    let descr;
    data.specializations.forEach(splData => {
      descr = `${splData.typeName}: ${splData.transcriptDescr}`;
      dataFeeder.push(
        "ts-deg-spcl",
        <td colSpan="4" className={cls("ts-title ts-highlight")}>
          &nbsp;&nbsp;&nbsp;&nbsp;{descr.toUpperCase()}
        </td>
      );
    });
    // to pass lint
    this.dummy = 0;
    return "";
  }

  // render degree
  renderDegree(data) {
    let degTitle = data.degreeTitle.toUpperCase();
    if (data.honours) {
      if (data.isYNC) degTitle += `, ${data.honours}`;
      else degTitle += ` with ${data.honours}`;
    }
    dataFeeder.push(
      "ts-deg-title",
      <td colSpan="4" className={cls("ts-title ts-highlight")}>
        &nbsp;&nbsp;{degTitle.toUpperCase()}
      </td>
    );
    this.renderMajorMinor(data);
    this.renderSubplans(data);
    this.renderSpecializations(data);
  }
}

// render milestones
class TranscriptMilestone {
  // constructor
  constructor(msData) {
    this.msData = msData;
  }

  // main render
  render() {
    if (!this.msData) return "";
    this.msData.forEach(data => {
      if (data.milestoneTitle) {
        const descr = `${data.milestoneTitle}: ${data.thesisTitle}`;
        dataFeeder.push(
          "ts-ms",
          <td colSpan="4" className={cls("ts-title ts-highlight")}>
            &nbsp;&nbsp;&nbsp;&nbsp;{descr.toUpperCase()}
          </td>
        );
      }
    });
    return "";
  }
}

// render special programs
class TranscriptSpclProg {
  // constructor
  constructor(degreeData) {
    this.degreeData = degreeData;
  }

  // main render
  render() {
    if (!this.degreeData) return "";
    this.degreeData.forEach(data => {
      if (data.plans)
        data.plans.forEach(planData => {
          if (planData.specialProgram) {
            let descr = planData.transcriptDescr;
            if (planData.planDescr) descr += ` ${planData.planDescr}`;
            dataFeeder.push(
              "ts-splprg",
              <td colSpan="4" className={cls("ts-title ts-highlight")}>
                &nbsp;&nbsp;&nbsp;&nbsp;{descr.toUpperCase()}
              </td>
            );
          }
        });
    });
    return "";
  }
}

// render awards
class TranscriptAward {
  // constructor
  constructor(awardData) {
    this.awardData = awardData;
  }

  // main render
  render() {
    if (!this.awardData) return "";
    this.renderAwardHeader();
    dataFeeder.push(
      "ts-awd-data",
      <td colSpan="4">
        <table width="100%">
          <tbody>{this.renderAwardDetails()}</tbody>
        </table>
      </td>
    );
    return "";
  }

  // render award header
  renderAwardHeader() {
    dataFeeder.push(
      "ts-awd-head",
      <td colSpan="4" className={cls("ts-title ts-highlight")}>
        <hr />
        AWARDS:
      </td>
    );
    // to pass lint
    this.dummy = 0;
    return "";
  }

  renderAwardDetails() {
    this.awardData.forEach(data => {
      dataFeeder.push(
        "ts-awd-l1",
        <td colSpan="4" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <div className={cls("awd-col0")} />
          <div className={cls("ts-title ts-highlight awd-col1")}>
            {`${data.year.toUpperCase()}:`}
          </div>
          <div colSpan="2" className={cls("ts-title ts-highlight awd-col2")}>
            {data.name.toUpperCase()}
          </div>
        </td>
      );
      dataFeeder.push(
        "ts-awd-l2",
        <td colSpan="4" style={{ paddingTop: "0", paddingBottom: "0" }}>
          <div className={cls("awd-col0")} />
          <div className={cls("awd-col1")}>&nbsp;</div>
          <div colSpan="2" className={cls("ts-title ts-highlight awd-col2")}>
            ({data.basis.toUpperCase()})
          </div>
        </td>
      );
    });
  }
}

// transcript data
class TranscriptData {
  // constructor
  constructor() {
    this.keyPrefix = "ts";
  }

  // main render
  render() {
    // render transcript term data
    // build for each term, termIdx is used to identify 1st term
    jsonData.transcript.forEach((termData, termIdx) => {
      new TranscriptTermData(termData, termIdx).render();
    });
    // render LOA data
    new TranscriptLeave(jsonData.additionalData.leaveData).render();
    // render degree data
    new TranscriptDegree(jsonData.additionalData.degreeData).render();
    // render milestone data
    new TranscriptMilestone(jsonData.additionalData.milestoneData).render();
    // render special program data
    new TranscriptSpclProg(jsonData.additionalData.degreeData).render();
    this.renderConferDate();
    this.renderDegreeRemarks();
    // render award data
    new TranscriptAward(jsonData.additionalData.awardData).render();
    // end of transcript
    this.renderTranscriptEnd();
  }

  // render conferment date
  renderConferDate() {
    const { degreeData } = jsonData.additionalData;
    if (!degreeData) return "";
    const date = isoDateToLocal(degreeData[0].dateConferred);
    dataFeeder.push(
      "ts-confdt",
      <td colSpan="4" className={cls("ts-title ts-highlight")}>
        CONFERMENT DATE: {date}
      </td>
    );
    // to pass lint
    this.dummy = 0;
    return "";
  }

  // render final remarks
  renderDegreeRemarks() {
    const remarksData = jsonData.additionalData.remarks;
    if (!remarksData) return "";
    let text = "";
    remarksData.forEach(line => {
      text += `${line.trim()} `;
    });
    dataFeeder.push(
      "ts-degrem",
      <td colSpan="4" className={cls("ts-title ts-highlight")}>
        {text}
      </td>
    );
    // to pass lint
    this.dummy = 0;
    return "";
  }

  // render end of transcript
  renderTranscriptEnd() {
    const line = "*".repeat(50);
    dataFeeder.push(
      "ts-end",
      <td colSpan="4" className={cls("ts-text")} align="center">
        {line}END OF TRANSCRIPT{line}
      </td>
    );
    // to pass lint
    this.dummy = 0;
    return "";
  }
}

// blank transcript page
class TranscriptPage extends Component {
  // render a column in a table with rows
  renderColumn(pageIdx, colIdx) {
    const html = [];
    html.push(setColWidth());
    for (let i = 0; i < this.props.rowsPerCol; i += 1) {
      html.push(
        <tr id={`row-${pageIdx}-${colIdx}-${i}`}>
          <td />
        </tr>
      );
    }
    return (
      <table width="100%">
        <tbody>{html}</tbody>
      </table>
    );
  }

  // main render
  render() {
    // cannot put background image into css file because loading image may fail
    const backgroundImg = {
      backgroundImage: `url(${NUS_TS_BACKIMG})`
    };
    const idx = this.props.pageIdx;
    const html = (
      <div className={cls("a4-landscape ts-background")} style={backgroundImg}>
        <header key="ts-header">
          <TranscriptHeader />
        </header>
        <article key="ts-content">
          <div
            className={cls("table ts-text")}
            id={`canvas-${idx}`}
            style={{ height: CONTENT_HEIGHT }}
          >
            <table width="100%">
              <tbody>
                <tr>
                  <td
                    id={`col-${idx}-0`}
                    width="49.5%"
                    valign="top"
                    className={cls("no-padding")}
                  >
                    {this.renderColumn(idx, 0)}
                  </td>
                  <td width="1%" />
                  <td
                    id={`col-${idx}-1`}
                    width="49.5%"
                    valign="top"
                    className={cls("no-padding")}
                  >
                    {this.renderColumn(idx, 1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
        <footer key="ts-footer">
          <TranscriptFooter page={idx} />
        </footer>
      </div>
    );
    return html;
  }
}

TranscriptPage.propTypes = {
  rowsPerCol: PropTypes.int.isRequired,
  pageIdx: PropTypes.int.isRequired
};

// transcript root class
class Transcript extends Component {
  constructor(props) {
    super(props);
    this.dataIdx = 0;
    this.maxPages = this.props.maxPages
      ? parseInt(this.props.maxPages, 10)
      : MAX_PAGES;
    this.maxRows = this.props.maxRows
      ? parseInt(this.props.maxRows, 10)
      : MAX_ROWS_PER_COL;
    this.page = 0;
    this.col = 0;
    this.row = 0;
    this.firstHeaderPrinted = false;
  }

  // clean up after rendering
  cleanup() {
    // clean up pages
    for (let i = this.maxPages - 1; i > this.page; i -= 1) pageEl(i).remove();
    for (let i = this.page; i >= 0; i -= 1) {
      pageEl(i).removeAttribute("id");
      canvasEl(i).removeAttribute("id");
    }
    // clean up rows
    for (let i = 0; i <= this.page; i += 1) {
      for (let j = 0; j < 2; j += 1)
        for (let k = this.maxRows; k >= 0; k -= 1) {
          const node = rowEl(i, j, k);
          if (node)
            if (!node.filled) node.remove();
            else {
              node.removeAttribute("id");
              node.removeAttribute("filled");
            }
        }
    }
  }

  // fill up transcript pages
  componentDidMount() {
    let dataRow;
    let node;
    // print subsequence rows
    gState.subscribe(() => {
      if (this.dataIdx >= dataFeeder.length) {
        // all data has been rendered
        this.cleanup();
        this.renderFooters();
        return;
      }
      if (gState.getState()) {
        // state is {nextCol: true}, change column (and page when necessary)
        if (this.col === 0) {
          this.col = 1;
          this.row = 0;
        } else {
          this.page += 1;
          if (this.page >= this.maxPages) {
            /* for debug
            // error prompted, must be fixed
            window.alert(
              "Error: Max pages reached. Some data cannot be rendered."
            );
            */
            return;
          }
          this.col = 0;
          this.row = 0;
        }
        node = rowEl(this.page, this.col, this.row);
        if (this.dataIdx > dataFeeder.termDataRange.end) {
          dataRow = (
            <TranscriptDataRow
              data={dataFeeder.data(this.dataIdx)}
              parent={node}
            />
          );
        } else {
          dataRow = (
            <TranscriptDataRow
              data={renderTranscriptTermHeader()}
              parent={node}
            />
          );
          this.dataIdx -= 1; // re-render the row
        }
        ReactDOM.render(dataRow, node);
      } else {
        // state is {nextCol: false}, continue to render to current column
        this.dataIdx += 1;
        this.row += 1;
        if (this.row >= this.maxRows) {
          // max rows reached, force change of column
          gState.dispatch({ type: "CHANGE_COLUMN" });
          return;
        }
        node = rowEl(this.page, this.col, this.row);
        if (
          this.dataIdx === dataFeeder.termDataRange.start &&
          !this.firstHeaderPrinted
        ) {
          // print header when term data begins
          dataRow = (
            <TranscriptDataRow
              data={renderTranscriptTermHeader()}
              parent={node}
            />
          );
          this.firstHeaderPrinted = true;
          this.dataIdx -= 1; // re-render the row
        } else {
          dataRow = (
            <TranscriptDataRow
              data={dataFeeder.data(this.dataIdx)}
              parent={node}
            />
          );
        }
        ReactDOM.render(dataRow, node);
      }
    });
    // record content bottom for each page
    for (let i = 0; i < this.maxPages; i += 1) {
      const rect = canvasEl(i).getBoundingClientRect();
      contentBottom.push(rect.top + rect.height + window.scrollY);
    }
    // print first row
    node = rowEl(0, 0, 0);
    dataRow = <TranscriptDataRow data={dataFeeder.data(0)} parent={node} />;
    ReactDOM.render(dataRow, node);
  }

  // render footer content
  renderFooters() {
    const totalPages = this.page + 1;
    for (let i = 0; i < totalPages; i += 1) {
      const footer = footerEl(i);
      if (footer) ReactDOM.render(`PAGE ${i + 1} OF ${totalPages}`, footer);
    }
  }

  // render a page
  renderPage(idx) {
    const html = <TranscriptPage pageIdx={idx} rowsPerCol={this.maxRows} />;
    return html;
  }

  // main render
  render() {
    const html = [];
    // render blank pages
    for (let i = 0; i < this.maxPages; i += 1) {
      html.push(
        <div id={`page-${i}`} filled={false} className={cls("nus-transcript")}>
          {this.renderPage(i)}
        </div>
      );
      html.push(<p />);
    }
    return html;
  }
}

Transcript.propTypes = {
  maxPages: PropTypes.int,
  maxRows: PropTypes.int
};

// transcript data row
class TranscriptDataRow extends Component {
  constructor(props) {
    super(props);
    this.state = { hide: false };
    this.parent = this.props.parent;
  }

  componentDidMount() {
    const rect = this.parent.getBoundingClientRect();
    const watermark = rect.top + rect.height + window.scrollY;
    const pageIdx = parseInt(this.parent.id.split("-")[1], 10);
    const cap = contentBottom[pageIdx];
    if (watermark > cap) {
      gState.dispatch({ type: "CHANGE_COLUMN" });
      this.setState({ hide: true });
    } else {
      gState.dispatch({ type: "NO_CHANGE" });
    }
  }

  render() {
    if (this.state.hide) {
      // remove the row, to be re-rendered in the next column
      this.parent.filled = false;
      return "";
    }
    this.parent.filled = true;
    return this.props.data;
  }
}

TranscriptDataRow.propTypes = {
  data: PropTypes.object,
  parent: PropTypes.object
};

// ========================================
// render
const Template = ({ certificate }) => {
  // JSON data source
  jsonData = certificate;
  // prepare data
  dataFeeder = new TranscriptDataFeeder();
  new TranscriptProgram().render();
  new TranscriptData().render();
  // render data
  return <Transcript maxPages="8" maxRows="50" />;
};
export default Template;
Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
