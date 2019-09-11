/* eslint-disable consistent-return */
/* eslint-disable default-case */
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  isoDateToLocalLong,
  capitalizedText,
  sassClassNames,
  renderImage,
  renderVoid,
  renderNUSTitle,
  renderNUSLogo,
  renderNUSSeal
} from ".";
import scss from "./degreeScrollFramework.scss";

// construct class names
const cls = names => sassClassNames(names, scss);

// NUS name and logo used by default
// not necessary to be exported
const renderDefaultNUSLogo = () => (
  <Fragment>
    {renderVoid("2.13cm")}
    {renderNUSTitle()}
    {renderVoid("0.59cm")}
    {renderNUSLogo()}
  </Fragment>
);

const renderNUSTitleCustom = style => (
  <div style={style}>
    NATIONAL
    <br />
    UNIVERSITY OF SINGAPORE
  </div>
);

// smaller NUS name and logo used in JDP
export const renderSmallNUSLogo = type => {
  const styleHeader = {
    display: "block",
    fontSize: "10pt",
    textAlign: "center",
    fontFamily: "'Times New Roman', Serif",
    fontWeight: "bold"
  };
  const styleLogo = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    width: "2.8cm",
    height: "3.56cm"
  };
  return (
    <div>
      {!type
        ? renderNUSTitle(null, styleHeader)
        : renderNUSTitleCustom(styleHeader)}
      {renderNUSLogo(null, styleLogo)}
    </div>
  );
};

// default NUS degree scroll text
const renderNameAndText = (preNameText, name, postNameText, namePadding) => {
  const style = {
    height: "0.6cm",
    textAlign: "center",
    border: "0px solid"
  };
  const preNameHtml = [];
  if (preNameText) {
    const lines = preNameText.split("\n");
    lines.forEach(line => {
      preNameHtml.push(
        <tr>
          <td className={cls("cert-content")} style={style}>
            {line}
          </td>
        </tr>
      );
    });
  }
  const postNameHtml = [];
  if (postNameText) {
    const lines = postNameText.split("\n");
    lines.forEach(line => {
      postNameHtml.push(
        <tr>
          <td className={cls("cert-content")} style={style}>
            {line}
          </td>
        </tr>
      );
    });
  }
  return (
    <table width="100%">
      {preNameHtml}
      <tr>
        <td className={cls("cert-name")} style={{ padding: namePadding }}>
          {name}
        </td>
      </tr>
      {postNameHtml}
    </table>
  );
};

// default NUS signatures
const renderDefaultSigs = (trusteesSig, presidentSig) => {
  const sig1 = renderImage(trusteesSig, 240, 90);
  const sig2 = renderImage(presidentSig, 240, 90);
  return (
    <table width="100%">
      <tbody>
        <tr>
          <td rowSpan="2" width="50%" style={{ textAlign: "center" }}>
            {renderNUSSeal()}
          </td>
          <td align="center">
            <div className={cls("cert-sig")}>
              {sig1}
              <br />
              Chair, Board of Trustees
            </div>
          </td>
        </tr>
        <tr>
          <td align="center">
            <div className={cls("cert-sig")}>
              <br />
              {sig2}
              <br />
              President
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// pre-process degree title
// Thie function break lines for overlong degree title. The rules are:
// 1) For degree title consisting of a line break char, simply break lines accordingly
// 2) For graduate diploma, the 1st line break is between "Diploma" and "in". There can be
//    a 2nd line break if major title (after "in") is too long
// 3) For title with parenthesis, the first line break is before left parentheses. There can be
//    a 2nd line break if major title (within parenthesis)
// 4) Some degree titles (MBBS, BBA, MBA, etc) have ad hoc line breaks
// 5) If none of above rules applies, no break is needed
const preprocDegree = degreeTitle => {
  // Rule 1: if degree title already consists of line breaks, use the to break the lines
  const seps = ["\r\n", "\n", "\r", "^", "|"]; // several separaters to try out
  for (let i = 0; i < seps.length; i += 1) {
    if (degreeTitle.indexOf(seps[i]) >= 0) return degreeTitle.split(seps[i]);
  }
  // Rule 4: MBBS
  if (
    degreeTitle.toUpperCase() ===
    "Bachelor of Medicine and Bachelor of Surgery".toUpperCase()
  )
    return ["Bachelor of Medicine", "and", "Bachelor of Surgery"];
  // Rule 4: BBAs
  if (
    degreeTitle.toUpperCase() ===
    "Bachelor of Business Administration".toUpperCase()
  )
    return ["Bachelor of", "Business Administration"];
  if (
    degreeTitle.toUpperCase() ===
    "Bachelor of Business Administration (Accountancy)".toUpperCase()
  )
    return ["Bachelor of", "Business Administration (Accountancy)"];
  // Rule 4: MBA
  if (
    degreeTitle.toUpperCase() ===
    "Master of Business Administration".toUpperCase()
  )
    return ["Master of", "Business Administration"];
  if (
    degreeTitle.toUpperCase() ===
    "Master of Business Administration".toUpperCase()
  )
    return ["Master of", "Business Administration"];
  if (
    degreeTitle.toUpperCase() ===
    "Master of Business Administration (Conducted in Chinese)".toUpperCase()
  )
    return ["Master of", "Business Administration", "(Conducted in Chinese)"];
  // Rule 4: MPAM
  if (
    degreeTitle.toUpperCase() ===
    "Master in Public Administration and Management".toUpperCase()
  )
    return ["Master in Public Administration", "and Management"];
  // Rule 4: BEcSt
  if (
    degreeTitle.toUpperCase() ===
    "Bachelor of Environmental Studies".toUpperCase()
  )
    return ["Bachelor of", "Environmental Studies"];
  // Rule 4: SMA masters
  if (
    degreeTitle.toUpperCase() ===
    "Master of Science (Chemical and Pharmaceutical Engineering)".toUpperCase()
  )
    return [
      "Master of Science",
      "(Chemical and Pharmaceutical",
      "Engineering)"
    ];
  if (
    degreeTitle.toUpperCase() ===
      "Master of Science (High Performance Computing for Engineered Systems)".toUpperCase() ||
    degreeTitle.toUpperCase() ===
      "M.Sc.(High Perf Computation for Engrd Sys)".toUpperCase()
  )
    return [
      "Master of Science",
      "(High Performance Computing",
      "for Engineered Systems)"
    ];
  if (
    degreeTitle.toUpperCase() ===
      "Master of Science (Advanced Materials for Micro- and Nano- Systems)".toUpperCase() ||
    degreeTitle.toUpperCase() ===
      "M.Sc.(Advanced Materials for Micro & Nano Sys)".toUpperCase()
  )
    return [
      "Master of Science",
      "(Advanced Materials for",
      "Micro- and Nano- Systems)"
    ];
  // Rule 2: graduate diplomas
  let name;
  let spec;
  if (/^Graduate Diploma/i.test(degreeTitle)) {
    [, name, spec] = degreeTitle.match(/^(Graduate Diploma) (in [^)]+)/);
    if (name && spec) {
      spec = spec.trim();
      if (
        spec.toUpperCase() === "in Maritime Law and Arbitration".toUpperCase()
      )
        return ["Graduate Diploma", "in Maritime Law", "and Arbitration"];
      if (
        spec.toUpperCase() === "in Maritime and Port Management".toUpperCase()
      )
        return ["Graduate Diploma", "in Maritime", "and Port Management"];
      if (spec.toUpperCase() === "in Family Practice Dermatology".toUpperCase())
        return ["Graduate Diploma", "in Family Practice", "Dermatology"];
      if (
        spec.toUpperCase() ===
        "in Safety, Health and Environmental Technology".toUpperCase()
      )
        return [
          "Graduate Diploma",
          "in Safety, Health",
          "and Environmental Technology"
        ];
      return ["Graduate Diploma", spec];
    }
  }
  // Rule 5: common title w/o parenthesis
  if (degreeTitle.indexOf("(") < 0) return [degreeTitle];
  // Rule 3: degree title comprises specialisation with parenthesis
  // example: Bachelor of Engineering (Mechanical Engineering)
  [, name, spec] = degreeTitle.match(/^([\w ]+)\(([^)]+)\)/);
  if (spec) {
    // overlong specialisation in degree title
    if (
      spec.trim().toUpperCase() ===
      "Transportation Systems and Management".toUpperCase()
    )
      return [name, "(Transportation Systems", "and Management)"];
    if (
      spec.trim().toUpperCase() ===
      "Advanced Materials for Micro- And Nano- Systems".toUpperCase()
    )
      return [name, "(Advanced Materials for", "Micro- And Nano- Systems)"];
    return [name.trim(), `(${spec.trim()})`];
  }
};

// pre-process honours title
const preprocHonours = (honours, degreeTitle) => {
  if (!honours || honours.trim() === "") return "";
  let text = honours.trim();
  // 'PASS' not to be printed
  if (text.toUpperCase() === "PASS") return "";
  // class of honours (old)
  text = text
    .replace(/1st/gi, "First")
    .replace(/2nd/gi, "Second")
    .replace(/3rd/gi, "Third");
  if (/^(first|second|third)/i.test(text)) return text;
  // class of honours (new): add 'with'
  if (/^Honours/i.test(text)) return `with ${text}`;
  // 'pass with merit'
  if (
    text.toUpperCase() === "PASS WITH MERIT" &&
    (degreeTitle.toUpperCase() === "Bachelor of Science".toUpperCase() ||
      degreeTitle.toUpperCase() ===
        "Bachelor of Applied Science".toUpperCase() ||
      degreeTitle.toUpperCase() ===
        "Bachelor of Business Administration".toUpperCase() ||
      degreeTitle.toUpperCase() ===
        "Bachelor of Business Administration (Accountancy)".toUpperCase() ||
      degreeTitle.toUpperCase() ===
        "Bachelor of Science (Nursing)".toUpperCase())
  )
    return "with Merit";
  return text;
};

// pre-process major - removal of trailing (Hons) or Hons, and capitalization
const preprocMajor = major =>
  major
    ? `in ${capitalizedText(
        major.replace(/( \(HONS\)| HONS)$/i, "").toLowerCase()
      )}`
    : "";

// degree scroll data feeder class
export class DegreeScrollDataFeeder {
  constructor() {
    this.dsLogo = [];
    this.dsName = null;
    this.dsNamePadding = "20px 0"; // default
    this.dsPreNameText = "This is to certify that"; // default
    this.dsPostNameText =
      "having fulfilled the requirements prescribed\nby the University was conferred the degrees of"; // default
    this.dsDegreeCode = null;
    this.dsDegreeTitle = null;
    this.dsHonours = null;
    this.dsBreakBefHonours = true; // default
    this.dsMajor = null;
    this.dsBreakBefMajor = true; // default
    this.dsDate = null;
    this.dsSpaceBeforeSig = "4cm"; // default
    this.dsSig = null;
    this.dsCustomLogo = null;
    this.dsCustomNameAndText = null;
    this.dsHeightTitleDisplay = "3.56cm"; // default
  }

  // add logo
  addLogo(value) {
    this.dsLogo.push(value);
  }

  // custom logo(s) with style
  set logo(value) {
    this.dsCustomLogo = value;
  }

  // setter: student name
  set studentName(value) {
    this.dsName = value;
  }

  // settre: custom padding for student name
  set namePadding(value) {
    this.dsNamePadding = value;
  }

  // setter: pre-name text
  set preNameText(value) {
    this.dsPreNameText = value;
  }

  // setter: post-name text
  set postNameText(value) {
    this.dsPostNameText = value;
  }

  // setter: custom name and text with style
  set nameAndText(value) {
    this.dsCustomNameAndText = value;
  }

  // setter: degree code
  set degreeCode(value) {
    this.dsDegreeCode = value;
  }

  // setter: degree title
  set degreeTitle(value) {
    this.dsDegreeTitle = value;
  }

  // setter: honours
  set honours(value) {
    this.dsHonours = value;
  }

  // setter: line break before honours?
  set breakBeforeHonours(value) {
    this.dsBreakBefHonours = value;
  }

  // setter: major
  set major(value) {
    this.dsMajor = value;
  }

  // setter: line break before major?
  set breakBeforeMajor(value) {
    this.dsBreakBefMajor = value;
  }

  // setter: height of display of degree title, honours (if any) and major (if any)
  set heightTitleDisplay(value) {
    this.dsHeightTitleDisplay = value;
  }

  // setter: conferment date
  set conferDate(value) {
    this.dsDate = value;
  }

  // setter: spacing before signature(s)
  set spaceBeforeSig(value) {
    this.dsSpaceBeforeSig = value;
  }

  // use default sigantures
  useDefaultSignature(trusteesSig, presidentSig) {
    this.dsSig = renderDefaultSigs(trusteesSig, presidentSig);
  }

  // setter: custom signature(s) with style
  set sig(value) {
    this.dsSig = value;
  }

  // render logo
  get logo() {
    // render custom logo(s) if any
    if (this.dsCustomLogo) return this.dsCustomLogo;
    // render default NUS logo
    if (this.dsLogo.length === 0) return renderDefaultNUSLogo();
    // render custom logo(s)
    const html = [];
    this.dsLogo.forEach(logo => {
      html.push(<td style={{ textAlign: "center" }}>{logo}</td>);
    });
    return (
      <table width="100%">
        <tbody>
          <tr>{html}</tr>
        </tbody>
      </table>
    );
  }

  // render text and name
  get nameAndText() {
    if (this.dsCustomNameAndText) return this.dsCustomNameAndText;
    return renderNameAndText(
      this.dsPreNameText,
      this.dsName,
      this.dsPostNameText,
      this.dsNamePadding
    );
  }

  // render degree title, honours (if any) and major (if any)
  get titleDisplay() {
    const honorsTitle = preprocHonours(this.dsHonours, this.dsDegreeTitle);
    const majorTitle = preprocMajor(this.dsMajor);
    let ignoreHonours = false;
    let ignoreMajor = false;
    let lastLine;
    const lines = preprocDegree(this.dsDegreeTitle);
    if (lines.length > 1) {
      lastLine = lines[lines.length - 1];
      // specialisation is in degree title (in parenthesis), so not to print specialisation again
      ignoreMajor =
        lastLine.endsWith(")") ||
        this.dsDegreeTitle
          .toUpperCase()
          .startsWith("Bachelor of Business Administration".toUpperCase());
      if (!this.dsBreakBefHonours && honorsTitle) {
        lastLine = `${lastLine} ${honorsTitle}`;
        ignoreHonours = true;
      }
    }
    let htmlDegree;
    switch (lines.length) {
      case 1:
        htmlDegree = <div className={cls("cert-degree")}>{lines[0]}</div>;
        break;
      case 2:
        htmlDegree = (
          <div className={cls("cert-degree")}>
            {lines[0]}
            <br />
            {lastLine}
          </div>
        );
        break;
      case 3:
        htmlDegree = (
          <div className={cls("cert-degree")}>
            {lines[0]}
            <br />
            {lines[1]}
            <br />
            {lastLine}
          </div>
        );
        break;
    }
    // honours (if any)
    let htmlDegHonors;
    if (!ignoreHonours && honorsTitle) {
      if (!ignoreMajor && !this.dsBreakBefMajor && majorTitle) {
        htmlDegHonors = (
          <div className={cls("cert-degree")}>
            {honorsTitle} {majorTitle}
          </div>
        );
        ignoreMajor = true;
      } else {
        htmlDegHonors = <div className={cls("cert-degree")}>{honorsTitle}</div>;
      }
    }
    // major (if any)
    const htmlMajor =
      !ignoreMajor && majorTitle ? (
        <div className={cls("cert-degree")}>{majorTitle}</div>
      ) : (
        ""
      );
    return (
      <Fragment>
        {htmlDegree}
        {htmlDegHonors}
        {htmlMajor}
      </Fragment>
    );
  }

  // getter: height of display of degree title, honours (if any) and major (if any)
  get heightTitleDisplay() {
    return this.dsHeightTitleDisplay;
  }

  // render conferment date
  get conferDate() {
    const html = (
      <table width="100%">
        <tbody>
          <tr>
            <td className={cls("cert-content")} style={{ textAlign: "center" }}>
              on
            </td>
          </tr>
          <tr>
            <td>{renderVoid("0.3cm")}</td>
          </tr>
          <tr>
            <td className={cls("cert-date")}>
              {isoDateToLocalLong(this.dsDate)}
            </td>
          </tr>
        </tbody>
      </table>
    );
    return html;
  }

  // render spacing before signature(s)
  get spaceBeforeSig() {
    if (this.dsSpaceBeforeSig) return renderVoid(this.dsSpaceBeforeSig);
    return "";
  }

  // render signature(s)
  get signature() {
    return this.dsSig;
  }
}

// degree scroll root class
export class Degree extends Component {
  constructor(props) {
    super(props);
    this.dataFeeder = this.props.dataFeeder;
    if (!this.dataFeeder) this.dataFeeder = new DegreeScrollDataFeeder();
  }

  // main render
  render = () => (
    <div className={cls("nus-degree")}>
      <div className={cls("a4-portrait")}>
        <article>
          <table width="100%">
            <tbody>
              <tr>
                <td>{this.dataFeeder.logo}</td>
              </tr>
              <tr>
                <td>{this.dataFeeder.nameAndText}</td>
              </tr>
              <tr>
                <td style={{ height: this.dataFeeder.heightTitleDisplay }}>
                  {this.dataFeeder.titleDisplay}
                </td>
              </tr>
              <tr>
                <td>{this.dataFeeder.conferDate}</td>
              </tr>
              <tr>
                <td>{this.dataFeeder.spaceBeforeSig}</td>
              </tr>
              <tr>
                <td>{this.dataFeeder.signature}</td>
              </tr>
            </tbody>
          </table>
        </article>
      </div>
    </div>
  );
}

Degree.propTypes = {
  dataFeeder: PropTypes.object.isRequired
};
