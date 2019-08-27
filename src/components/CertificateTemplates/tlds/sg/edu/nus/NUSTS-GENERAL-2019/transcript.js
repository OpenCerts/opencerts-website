/* eslint-disable class-methods-use-this */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  isoDateToLocal,
  sassClassNames,
  NUS_TS_BACKIMG,
  NUS_TS_BACKIMG_YALE,
  NUS_TS_LEGEND,
  NUS_TS_LEGEND_DUKE,
  NUS_TS_LEGEND_YALE
} from "../common";
import {
  TranscriptDataFeeder,
  Transcript,
  renderTranscriptHeaderData
} from "../common/transcriptFramework";
import scss from "../common/transcriptFramework.scss";

// construct class names
const cls = names => sassClassNames(names, scss);

// flags to calssify transcript type
let isDuke;
let isMedDen;
let isCDP;
let isYaleNUS;

// transcript content - program info
class TranscriptProgram {
  constructor(dataSource, dataFeeder) {
    this.dataSource = dataSource;
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    const progData = this.dataSource.additionalData.programData;
    if (progData) {
      progData.forEach(data => {
        if (data.statusCode !== "DC") this.renderProgData(data);
      });
      this.dataFeeder.push(
        "ts-prog-end",
        <td colSpan="4">
          <hr />
        </td>
      );
    }
  }

  // render for a program
  renderProgData(data) {
    this.dataFeeder.push(
      "ts-prog",
      <td colSpan="4">
        <div className={cls("prog-row1 ts-title")}>
          <div className={cls("prog-key prog-col0")}>PROGRAMME:</div>
          <div className={cls("prog-col1")}>
            {data.programName.toUpperCase()}
          </div>
        </div>
      </td>
    );
    if (isDuke) {
      // print DUKE school name under program name
      this.dataFeeder.push(
        "ts-prog",
        <td colSpan="4">
          <div className={cls("prog-row2 ts-title")}>
            <div className={cls("prog-key prog-col0")} />
            <div className={cls("prog-col1")}>DUKE-NUS MEDICAL SCHOOL</div>
          </div>
        </td>
      );
    }
    this.dataFeeder.push(
      "ts-prog",
      <td colSpan="4">
        <div className={cls("prog-row2 ts-title")}>
          <div className={cls("prog-key prog-col0")}>PROGRAMME STATUS:</div>
          <div className={cls("prog-col1")}>
            {data.statusDescription.toUpperCase()}
          </div>
        </div>
      </td>
    );
  }
}

// transcript credit transfer
class TranscriptCreditTransfer {
  // constructor
  constructor(termData, termIdx, dataFeeder) {
    this.termData = termData;
    this.termIdx = termIdx;
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    // bypass non-transfer
    if (this.termData.creditTransfer) {
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
      if (isMedDen) this.renderFormOfStudy();
      if (this.termIdx !== 0) {
        // from 2nd term onward
        this.renderTrfFromExtOrg();
      }
      this.renderTrfEqualNUS();
    }
  }

  // render external transfer title
  renderExtTrfTitle() {
    this.dataFeeder.push(
      "ts-term-trf-extitle",
      <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
        CREDITS RECOGNISED ON ADMISSION
      </td>
    );
  }

  // render APC
  renderAPC() {
    this.termData.creditTransfer.forEach(transferData => {
      if (transferData.sourceType === "E" && transferData.creditsNoGPA > 0) {
        // APC
        if (isCDP) {
          const isNUSAPCTest = transferData.orgId === "E0000002277";
          const isAPC = transferData.orgId === "E0000002430";
          let title = "";
          if (!isNUSAPCTest && !isAPC) {
            title = `AWARDED ADVANCED PLACEMENT CREDITS FOR THE ACADEMIC WORK COMPLETED AT ${transferData.orgName.toUpperCase()}`;
          } else if (isNUSAPCTest) {
            title =
              "AWARDED ADVANCED PLACEMENT CREDITS FOR PASSING THE PLACEMENT TEST(S) CONDUCTED BY NUS";
          }
          if (title) {
            this.dataFeeder.push(
              "ts-term-trf-apc",
              <Fragment>
                <td colSpan="2" className={cls("ts-termrem")}>
                  {title}
                </td>
                <td className={cls("ts-grade")}>-</td>
                <td className={cls("ts-credits")}>
                  {transferData.creditsNoGPA.toFixed(2)}
                </td>
              </Fragment>
            );
          }
        } else {
          this.dataFeeder.push(
            "ts-term-trf-apc",
            <Fragment>
              <td colSpan="2" className={cls("ts-termrem")}>
                AWARDED ADVANCED PLACEMENT CREDITS FOR THE ACADEMIC WORK
                COMPLETED AT {transferData.orgName.toUpperCase()}
              </td>
              <td className={cls("ts-grade")}>-</td>
              <td className={cls("ts-credits")}>
                {isMedDen ? "" : transferData.creditsNoGPA.toFixed(2)}
              </td>
            </Fragment>
          );
        }
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
        if (isDuke || isMedDen) {
          title =
            "CREDITS RECOGNISED ON ADMISSION (NUS MODULES COMPLETED PRIOR TO CURRENT PROGRAMME):";
        } else if (!isNUSAPCTest && !isAPC) {
          title =
            "CREDITS RECOGNISED ON ADMISSION (NUS MODULES COMPLETED PRIOR TO CURRENT PROGRAMME):";
        } else if (isNUSAPCTest) {
          title =
            "AWARDED ADVANCED PLACEMENT CREDITS FOR PASSING THE PLACEMENT TEST(S) CONDUCTED BY NUS";
        } else {
          // isAPC === true
          title = "AWARDED ADVANCED PLACEMENT CREDITS";
        }
        const grade = isNUSAPCTest || isAPC ? "-" : "";
        const credits =
          transferData.creditsNoGPA !== 0
            ? transferData.creditsNoGPA.toFixed(2)
            : "";
        this.dataFeeder.push(
          "ts-term-trf-intapc",
          <Fragment>
            <td colSpan="2" className={cls("ts-termrem")}>
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
      const isNUSAPCTest = transferData.orgId === "E0000002277";
      const isAPC = transferData.orgId === "E0000002430";
      if (
        transferData.sourceType === "I" &&
        (!isCDP || (!isNUSAPCTest && !isAPC))
      ) {
        let title;
        if (transferData.sourceCareer) {
          title = `CREDITS RECOGNISED (COMPLETED MODULES FROM ${
            transferData.sourceCareer
          } CAREER)`;
        } else if (!isMedDen) {
          title = "CREDITS RECOGNISED (COMPLETED MODULES FROM OTHER PROGRAMME)";
        }
        const credits =
          transferData.creditsNoGPA !== 0 && !isMedDen
            ? transferData.creditsNoGPA.toFixed(2)
            : "";
        this.dataFeeder.push(
          "ts-term-trf-inttrf",
          <Fragment>
            <td colSpan="3" className={cls("ts-termrem")}>
              {title}
            </td>
            <td className={cls("ts-credits")}>{credits}</td>
          </Fragment>
        );
      }
    });
  }

  // render internal transfer details
  renderIntTrfDetail() {
    this.termData.creditTransfer.forEach(transferData => {
      if (
        transferData.sourceType === "I" &&
        ((isDuke && transferData.creditsNoGPA > 0) || !isDuke)
      ) {
        transferData.details.forEach(detail => {
          if (
            detail.status === "P" &&
            (detail.includeInGPA ||
              (detail.grade === "S" || detail.grade === "CS") ||
              isMedDen)
          ) {
            let credits = "";
            if (!isMedDen)
              credits = detail.credits !== 0 ? detail.credits.toFixed(2) : "-";
            this.dataFeeder.push(
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
        this.dataFeeder.push(
          "ts-term-trf-fromorg",
          <Fragment>
            <td colSpan="2" className={cls("ts-termrem")}>
              CREDITS TRANSFERRED FROM {transferData.orgName.toUpperCase()}
            </td>
            <td className={cls("ts-grade")}>-</td>
            <td className={cls("ts-credits")}>
              {isMedDen ? "" : transferData.creditsNoGPA.toFixed(2)}
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
        this.dataFeeder.push(
          "ts-term-trf-eqnus",
          <td colSpan="4" className={cls("ts-termrem")}>
            CREDITS TRANSFERRED (WITH EQUIVALENT NUS GRADE) FROM
            {transferData.orgName.toUpperCase()}:
          </td>
        );
        transferData.details.forEach(detail => {
          if (
            detail.status === "P" &&
            (detail.includeInGPA ||
              (detail.grade === "S" || detail.grade === "CS"))
          ) {
            let credits = "";
            if (!isMedDen)
              credits = detail.credits !== 0 ? detail.credits.toFixed(2) : "-";
            this.dataFeeder.push(
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
  constructor(data, dataFeeder) {
    this.data = data;
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    let { moduleCode } = this.data;
    if (
      (this.data.gradingBasis === "NCP" && !this.data.includeInGPA) ||
      this.data.remarks
    )
      moduleCode = `*${moduleCode}`;
    let moduleDescr = this.data.moduleName;
    const isMedDenSuppl =
      isMedDen &&
      (this.data.gradingBasis === "SUP" || this.data.gradingBasis === "SPN");
    if (this.data.moduleType && !isMedDenSuppl)
      moduleDescr += ` ${this.data.moduleType}`;
    if (this.data.moduleNotes) moduleDescr += ` ${this.data.moduleNotes}`;
    let credits = "";
    if (!isMedDen)
      credits = this.data.credits === 0 ? "-" : this.data.credits.toFixed(2);
    this.dataFeeder.push(
      "ts-term-enl-mod",
      <Fragment>
        <td className={cls("ts-col0 ts-modcode")}>{moduleCode}</td>
        <td className={cls("ts-col1 ts-modname")}>{moduleDescr}</td>
        <td className={cls("ts-col2 ts-grade")}>{this.data.grade}</td>
        <td className={cls("ts-col3 ts-credits")}>{credits}</td>
      </Fragment>
    );
  }
}

// render module enrollment
class TranscriptEnrollment {
  // constructor
  constructor(termData, dataFeeder) {
    this.termData = termData;
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    this.renderEnrollData();
  }

  // render module enrollment title
  renderEnrollTitle() {
    this.dataFeeder.push(
      "ts-term-enl-title",
      <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
        <p />
        ENROLLED IN THE FOLLOWING NUS MODULES:
      </td>
    );
  }

  // render supplementary exam title
  renderSupplementaryTitle() {
    this.dataFeeder.push(
      "ts-term-enl-suptitle",
      <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
        <p />
        SUPPLEMENTARY EXAMINATION:
      </td>
    );
  }

  // render repeat modules title
  renderRepeatModulesTitle() {
    this.dataFeeder.push(
      "ts-term-enl-suptitle",
      <td colSpan="4" className={cls("ts-termrem")}>
        REPEAT MODULE(S):
      </td>
    );
  }

  // render remediate modules title
  renderRemediateModulesTitle() {
    this.dataFeeder.push(
      "ts-term-enl-suptitle",
      <td colSpan="4" className={cls("ts-termrem")}>
        REMEDIATE MODULE(S):
      </td>
    );
  }

  // render module enrollment data
  renderEnrollData() {
    if (!this.termData.modules) return;
    if (this.termData.creditTransfer && this.termData.modules) {
      this.renderEnrollTitle();
    }
    let hasSuppl = false;
    let hasRepeat = false;
    let hasRemediate = false;
    this.termData.modules.forEach(data => {
      if (
        data.gradingBasis === "SUP" ||
        (isMedDen && data.gradingBasis === "SPN")
      )
        hasSuppl = true;
      else if (isDuke && data.gradingBasis === "REP") hasRepeat = true;
      else if (isDuke && data.gradingBasis === "REM") hasRemediate = true;
      else new TranscriptModuleEnroll(data, this.dataFeeder).render();
    });
    if (hasSuppl) {
      this.renderSupplementaryTitle();
      this.termData.modules.forEach(data => {
        if (data.gradingBasis === "SUP")
          new TranscriptModuleEnroll(data, this.dataFeeder).render();
      });
    }
    if (hasRepeat) {
      // only for DUKE
      this.renderRepeatModulesTitle();
      this.termData.modules.forEach(data => {
        if (data.gradingBasis === "REP")
          new TranscriptModuleEnroll(data, this.dataFeeder).render();
      });
    }
    if (hasRemediate) {
      // only for DUKE
      this.renderRemediateModulesTitle();
      this.termData.modules.forEach(data => {
        if (data.gradingBasis === "REM")
          new TranscriptModuleEnroll(data, this.dataFeeder).render();
      });
    }
  }
}

// render transcript summary
class TranscriptSummary {
  // constructor
  constructor(termData, dataFeeder) {
    this.termData = termData;
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    this.termData.summary.forEach(data => {
      // degree name
      if (!isMedDen) this.renderTermDegree(data);
      // GPA
      if (data.specialGPA) this.renderSpecialGPA(data);
      else if (!isMedDen) this.renderGPA(data);
      // acad standing
      if (isMedDen) this.renderAcadStanding(data);
      // term honours
      if (data.awards) this.renderTermHonours(data);
    });
  }

  // render degree
  renderTermDegree(sumData) {
    this.dataFeeder.push(
      "ts-term-deg",
      <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
        <p />
        {sumData.programName.toUpperCase()}
      </td>
    );
  }

  // render GPA
  renderGPA(sumData) {
    let gpa;
    let gpaName;
    if (sumData.includeInGPA || isDuke) {
      gpa = sumData.GPA.toFixed(2);
      gpaName = sumData.GPAName.toUpperCase();
    } else {
      gpa = "NOT APPLICABLE";
      gpaName = "CUMULATIVE AVERAGE POINT";
    }
    this.dataFeeder.push(
      "ts-term-gpa",
      <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
        {`${gpaName} : ${gpa}`}
      </td>
    );
  }

  // render special GPA
  renderSpecialGPA(sumData) {
    sumData.specialGPA.forEach(data => {
      const name = data.type === "FCAP" ? "*" : `${data.name}`;
      this.dataFeeder.push(
        "ts-term-sgpa",
        <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
          {`${name.toUpperCase()} :${data.GPA.toFixed(2)}`}
        </td>
      );
    });
  }

  // render acad standing
  renderAcadStanding(sumData) {
    if (sumData.standing)
      this.dataFeeder.push(
        "ts-term-standing",
        <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
          {`RESULT : ${sumData.standing}`}
        </td>
      );
  }

  // render term honours
  renderTermHonours(sumData) {
    sumData.awards.forEach(data => {
      this.dataFeeder.push(
        "ts-term-awd",
        <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
          {data.awardName.toUpperCase()}
        </td>
      );
    });
  }
}

// render remarks at the end of a term
class TranscriptTermRemarks {
  // constructor
  constructor(termData, dataFeeder) {
    this.termData = termData;
    this.cache = new TranscriptDataFeeder();
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    this.renderEnrollRemarks();
    this.renderTransferRemarks();
    if (!isMedDen) this.renderFinalGPARemarks();
    this.renderTranscriptTexts();
    if (this.cache.length === 0) return;
    this.renderRemarksTitle();
    for (let i = 0; i < this.cache.length; i += 1) {
      this.dataFeeder.push(this.cache.type(i), this.cache.data(i));
    }
  }

  // render remarks title
  renderRemarksTitle() {
    this.dataFeeder.push(
      "ts-term-rem-title",
      <td colSpan="4" className={cls("ts-termrem ts-highlight")}>
        <p />
        <u>REMARKS:</u>
      </td>
    );
  }

  // render enrollment remarks
  renderEnrollRemarks() {
    if (this.termData.modules) {
      // remarks of NCP
      this.termData.modules.forEach(data => {
        if (
          !data.includeInGPA &&
          data.gradingBasis === "NCP" &&
          !isDuke &&
          !isMedDen
        ) {
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
    }
  }

  // render credit transfer remarks
  renderTransferRemarks() {
    if (this.termData.creditTransfer && this.termData.formOfStudy !== "NOC") {
      this.termData.creditTransfer.forEach(transferData => {
        if (transferData.sourceType === "E") {
          const isNUSAPCTest = transferData.orgId === "E0000002277";
          const isAPC = transferData.orgId === "E0000002430";
          if ((!isNUSAPCTest && !isAPC) || isDuke || isMedDen) {
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
    if (hasFinalGPA) {
      this.cache.push(
        "ts-term-rem-fgpa",
        <td colSpan="4" className={cls("ts-termrem")}>
          The Final Cumulative Average Point takes into account student&rsquo;s
          academic performance at the Partner University.
        </td>
      );
    }
  }

  // render transcript texts
  renderTranscriptTexts() {
    if (!this.termData.remarks) return;
    let text = "";
    this.termData.remarks.forEach(data => {
      text += `${data.trim()} `;
    });
    if (text) {
      this.cache.push(
        "ts-term-rem-txt",
        <td colSpan="4" className={cls("ts-termrem")}>
          {text}
        </td>
      );
    }
  }
}

// translate module information
const translateModule = module => {
  const translated = {};
  for (const key in module) {
    switch (key) {
      case "name":
        if (
          module.name.startsWith("(") &&
          module.name.endsWith(")") &&
          module.transferSeq
        )
          translated.moduleName = "";
        else translated.moduleName = module.name;
        break;
      case "grade":
        translated.grade = module[key];
        break;
      case "courseCredit":
        translated.credits = module[key];
        break;
      case "courseCode":
        translated.moduleCode = module[key];
        break;
      default:
        translated[key] = module[key];
        break;
    }
  }
  return translated;
};

// traverse transcript data to retrieve matched credit transfer details
const getCreditTransferDetails = (transcriptData, semester, seq) => {
  const details = [];
  transcriptData.forEach(module => {
    if (
      module.semester === semester &&
      module.transferSeq &&
      module.transferSeq === seq
    )
      details.push(translateModule(module));
  });
  return details;
};

// traverse transcript data to retrieve enrolment modules
const getEnrolmentModules = (transcriptData, semester) => {
  const modules = [];
  transcriptData.forEach(module => {
    if (module.semester === semester && !module.transferSeq)
      modules.push(translateModule(module));
  });
  return modules;
};

// construct a JSON of transcript data with nested structure.
// The returned JSON will be the data source of TranscriptTermData
const translateTranscriptTermData = dataSource => {
  if (!dataSource.transcriptRaw)
    dataSource.transcriptRaw = dataSource.transcript;
  dataSource.additionalData.transcriptGroup.forEach(term => {
    if (term.creditTransfer)
      term.creditTransfer.forEach(transfer => {
        transfer.details = getCreditTransferDetails(
          dataSource.transcriptRaw,
          term.name,
          transfer.transferSeq
        );
      });
    const enrolmentModules = getEnrolmentModules(
      dataSource.transcriptRaw,
      term.name
    );
    if (enrolmentModules) term.modules = enrolmentModules;
  });
  dataSource.transcript = dataSource.additionalData.transcriptGroup;
};

// transcript term data - nested structure
class TranscriptTermData {
  // constructor
  constructor(termData, termIdx, dataFeeder) {
    this.termData = termData;
    this.termIdx = termIdx;
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    // NOTE: all term data rows should have a type starting with "ts-term"
    this.renderAcadYear();
    if (!isMedDen) this.renderFormOfStudy();
    this.renderCreditTransfer();
    this.renderEnrollment();
    this.renderTermSummary();
    this.renderTermRemarks();
  }

  // render academic year
  renderAcadYear() {
    // acad year can't be last row
    this.dataFeeder.push(
      "ts-term-year",
      <td colSpan="4" className={cls("ts-title ts-highlight")}>
        <p />
        ACADEMIC YEAR {this.termData.term.toUpperCase()}
        <p />
      </td>,
      true
    );
  }

  // render form of study description
  renderFormOfStudy() {
    if (
      this.fosPrintArea !== "ND" &&
      this.termData.fosDescription &&
      this.termData.organization
    ) {
      this.dataFeeder.push(
        "ts-term-fos",
        <td colSpan="4" className={cls("ts-termrem")}>
          {`${this.termData.fosDescription.toUpperCase()} ${this.termData.organization.toUpperCase()}`}
        </td>
      );
    }
  }

  // render credit transfer data
  renderCreditTransfer() {
    new TranscriptCreditTransfer(
      this.termData,
      this.termIdx,
      this.dataFeeder
    ).render();
  }

  // render module enrollment data
  renderEnrollment() {
    new TranscriptEnrollment(this.termData, this.dataFeeder).render();
  }

  // render term summary info
  renderTermSummary() {
    new TranscriptSummary(this.termData, this.dataFeeder).render();
  }

  // render term remarks
  renderTermRemarks() {
    new TranscriptTermRemarks(this.termData, this.dataFeeder).render();
  }
}

// render student LOA data
class TranscriptLeave {
  // constructor
  constructor(leaveData, dataFeeder) {
    this.leaveData = leaveData;
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    if (this.leaveData) {
      this.leaveData.forEach((data, idx) => {
        this.renderLeave(data, idx);
      });
    }
  }

  // render leave data
  renderLeave(data, idx) {
    let text = `LEAVE OF ABSENCE FROM ${isoDateToLocal(data.from)}`;
    if (data.to) text += ` TO ${isoDateToLocal(data.to)}`;
    if (idx === 0)
      // print a line before 1st row
      this.dataFeeder.push(
        "ts-loa",
        <td colSpan="4" className={cls("ts-title ts-highlight")}>
          <hr />
          {text}
        </td>
      );
    else
      this.dataFeeder.push(
        "ts-loa",
        <td colSpan="4" className={cls("ts-title ts-highlight")}>
          {text}
        </td>
      );
  }
}

// render degree conferment
class TranscriptDegree {
  // constructor
  constructor(degreeData, dataFeeder) {
    this.degreeData = degreeData;
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    if (this.degreeData) {
      this.renderDegreeInfoTitle();
      this.degreeData.forEach(data => {
        this.renderDegree(data);
      });
    }
  }

  // render degree info beginning title
  renderDegreeInfoTitle() {
    this.dataFeeder.push(
      "ts-deg-begin",
      <td colSpan="4" className={cls("ts-title ts-highlight")}>
        <hr />
        CONFERRED/AWARDED THE DEGREE(S)/DIPLOMA(S) OF:
      </td>
    );
  }

  // render major/minor
  renderMajorMinor(data) {
    if (data.plans) {
      let descr;
      data.plans.forEach(planData => {
        if (!planData.specialProgram) {
          if (planData.type === "HON")
            descr = `MAJOR: ${planData.transcriptDescr}`;
          else descr = `${planData.typeName}: ${planData.transcriptDescr}`;
          if (planData.type === "JMP" && planData.planDescr)
            descr += ` with ${planData.planDescr}`;
          this.dataFeeder.push(
            "ts-deg-plan",
            <td
              colSpan="4"
              className={cls("ts-title ts-highlight")}
              style={{ paddingLeft: "20px" }}
            >
              {descr.toUpperCase()}
            </td>
          );
        }
      });
    }
  }

  // render subplans
  renderSubplans(data) {
    if (data.plans) {
      let descr;
      data.plans.forEach(planData => {
        if (planData.subplans)
          planData.subplans.forEach(subplData => {
            descr = `${subplData.typeName}: ${subplData.transcriptDescr}`;
            this.dataFeeder.push(
              "ts-deg-spln",
              <td
                colSpan="4"
                className={cls("ts-title ts-highlight")}
                style={{ paddingLeft: "20px" }}
              >
                {descr.toUpperCase()}
              </td>
            );
          });
      });
    }
  }

  // render specializations
  renderSpecializations(data) {
    if (data.specializations) {
      let descr;
      data.specializations.forEach(splData => {
        descr = `${splData.typeName}: ${splData.transcriptDescr}`;
        this.dataFeeder.push(
          "ts-deg-spcl",
          <td
            colSpan="4"
            className={cls("ts-title ts-highlight")}
            style={{ paddingLeft: "20px" }}
          >
            {descr.toUpperCase()}
          </td>
        );
      });
    }
  }

  // render degree
  renderDegree(data) {
    let degTitle = data.degreeTitle.toUpperCase();
    if (data.honours) {
      if (data.isYNC) degTitle += `, ${data.honours}`;
      else degTitle += ` with ${data.honours}`;
    }
    this.dataFeeder.push(
      "ts-deg-title",
      <td
        colSpan="4"
        className={cls("ts-title ts-highlight")}
        style={{ paddingLeft: "10px" }}
      >
        {degTitle.toUpperCase()}
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
  constructor(msData, dataFeeder) {
    this.msData = msData;
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    if (this.msData) {
      this.msData.forEach(data => {
        if (data.milestoneTitle) {
          const descr = `${data.milestoneTitle} ${data.thesisTitle}`;
          this.dataFeeder.push(
            "ts-ms",
            <td
              colSpan="4"
              className={cls("ts-title ts-highlight")}
              style={{ paddingLeft: "20px" }}
            >
              {descr.toUpperCase()}
            </td>
          );
        }
      });
    }
  }
}

// render special programs
class TranscriptSpclProg {
  // constructor
  constructor(degreeData, dataFeeder) {
    this.degreeData = degreeData;
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    if (this.degreeData) {
      this.degreeData.forEach(data => {
        if (data.plans)
          data.plans.forEach(planData => {
            if (planData.specialProgram) {
              let descr = planData.transcriptDescr;
              if (planData.planDescr) descr += ` ${planData.planDescr}`;
              this.dataFeeder.push(
                "ts-splprg",
                <td
                  colSpan="4"
                  className={cls("ts-title ts-highlight")}
                  style={{ paddingLeft: "10px" }}
                >
                  {descr.toUpperCase()}
                </td>
              );
            }
          });
      });
    }
  }
}

// render awards
class TranscriptAward {
  // constructor
  constructor(awardData, dataFeeder) {
    this.awardData = awardData;
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    if (this.awardData) {
      this.renderAwardHeader();
      this.renderAwardDetails();
    }
  }

  // render award header
  renderAwardHeader() {
    this.dataFeeder.push(
      "ts-awd-head",
      <td colSpan="4" className={cls("ts-title ts-highlight")}>
        <hr />
        AWARDS:
      </td>
    );
  }

  renderAwardDetails() {
    this.awardData.forEach(data => {
      this.dataFeeder.push(
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
      this.dataFeeder.push(
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
  constructor(dataSource, dataFeeder) {
    this.dataSource = dataSource;
    this.dataFeeder = dataFeeder;
  }

  // main render
  render() {
    // render transcript term data
    // build for each term, termIdx is used to identify 1st term
    this.dataSource.transcript.forEach((termData, termIdx) => {
      new TranscriptTermData(termData, termIdx, this.dataFeeder).render();
    });
    // render LOA data
    new TranscriptLeave(
      this.dataSource.additionalData.leaveData,
      this.dataFeeder
    ).render();
    // render degree data
    new TranscriptDegree(
      this.dataSource.additionalData.degreeData,
      this.dataFeeder
    ).render();
    // render milestone data
    new TranscriptMilestone(
      this.dataSource.additionalData.milestoneData,
      this.dataFeeder
    ).render();
    // render special program data
    new TranscriptSpclProg(
      this.dataSource.additionalData.degreeData,
      this.dataFeeder
    ).render();
    this.renderConferDate();
    this.renderDegreeRemarks();
    // render award data
    new TranscriptAward(
      this.dataSource.additionalData.awardData,
      this.dataFeeder
    ).render();
    // end of transcript
    this.renderTranscriptEnd();
  }

  // render conferment date
  renderConferDate() {
    const { degreeData } = this.dataSource.additionalData;
    if (degreeData) {
      const date = isoDateToLocal(degreeData[0].dateConferred);
      this.dataFeeder.push(
        "ts-confdt",
        <td colSpan="4" className={cls("ts-title ts-highlight")}>
          CONFERMENT DATE: {date}
        </td>
      );
    }
  }

  // render final remarks
  renderDegreeRemarks() {
    const remarksData = this.dataSource.additionalData.remarks;
    if (remarksData) {
      let text = "";
      remarksData.forEach(line => {
        text += `${line.trim()} `;
      });
      this.dataFeeder.push(
        "ts-degrem",
        <td colSpan="4" className={cls("ts-title ts-highlight")}>
          {text}
        </td>
      );
    }
  }

  // render end of transcript
  renderTranscriptEnd() {
    const line = "*".repeat(50);
    this.dataFeeder.push(
      "ts-end",
      <td colSpan="4" className={cls("ts-text")} align="center">
        {line}END OF TRANSCRIPT{line}
      </td>
    );
  }
}

// ========================================
// render
const Template = ({ certificate }) => {
  // JSON data source
  const jsonData = certificate;
  // translate
  if (jsonData.additionalData.transcriptGroup)
    translateTranscriptTermData(jsonData);
  // to be used in rendering
  isDuke = jsonData.additionalData.transcriptType.startsWith("DK");
  isCDP = jsonData.additionalData.transcriptType.startsWith("CDP");
  isMedDen =
    jsonData.additionalData.transcriptType.startsWith("UM") ||
    jsonData.additionalData.transcriptType.startsWith("UD");
  isYaleNUS = (transcriptData => {
    const programData = transcriptData.additionalData.programData;
    if (programData)
      for (let i = 0; i < programData.length; i += 1)
        if (programData[i].programCode.substring(1, 3) === "17") return true;
    return false;
  })(jsonData);
  // prepare data
  const dataFeeder = new TranscriptDataFeeder();
  dataFeeder.headerData = renderTranscriptHeaderData(jsonData);
  new TranscriptProgram(jsonData, dataFeeder).render();
  new TranscriptData(jsonData, dataFeeder).render();
  dataFeeder.resetTermRange("ts-term");
  // render data
  // 1123px is width of A4 portrait (29.7cm)
  const ratio = (window.innerWidth - 30) / 1123;
  const scale =
    ratio < 1
      ? {
          transform: `scale(${ratio}, ${ratio})`,
          transformOrigin: "top left"
        }
      : null;
  let legend;
  if (isDuke) legend = NUS_TS_LEGEND_DUKE;
  else if (isYaleNUS) legend = NUS_TS_LEGEND_YALE;
  else legend = NUS_TS_LEGEND;
  const html = (
    <div style={scale}>
      <Transcript
        maxPages="8"
        maxRows="50"
        dataFeeder={dataFeeder}
        backImgUrl={`url(${isYaleNUS ? NUS_TS_BACKIMG_YALE : NUS_TS_BACKIMG})`}
        legendPage={legend}
        legendRatio="0.95"
      />
    </div>
  );
  return html;
};
export default Template;
Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
