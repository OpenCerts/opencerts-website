import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  isoDateToLocalLong,
  sassClassNames,
  renderImage,
  renderVoid,
  renderNUSTitle,
  renderNUSLogo,
  renderNUSSeal,
  capitalizedText
} from "../common";
import scss from "./degree.scss";

// construct class names
const cls = names => sassClassNames(names, scss);

const checkPosition = inputString => {
  let position1 = 0;
  const splitSentence = inputString.split(" ");
  for (let i = 0; i < splitSentence.length; i += 1) {
    const temptext = splitSentence[i];
    if (temptext === "Bachelor" && i !== 0) {
      position1 = i - 1;
      break;
    }
  }
  return position1;
};

class Degree extends Component {
  constructor(props) {
    super(props);
    this.dataSource = this.props.dataSource;
  }

  // render degree and honours
  renderDegree = degreeData => {
    const DegreeTitle = capitalizedText(degreeData.degreeTitle.toLowerCase());
    const position = checkPosition(DegreeTitle);
    let txt1 = "";
    let txt2 = "";
    const splitSentence = DegreeTitle.split(" ");
    let honorsTitle = degreeData.honours ? degreeData.honours : "";
    honorsTitle = honorsTitle.replace("PASS", "HONORS");
    honorsTitle = capitalizedText(honorsTitle.toLowerCase());
    let html;
    if (position > 0) {
      for (let i = 0; i < position; i += 1) {
        txt1 = `${txt1} ${splitSentence[i]}`;
      }
      for (let i = position + 1; i < splitSentence.length; i += 1) {
        txt2 = `${txt2} ${splitSentence[i]}`;
      }
      if (honorsTitle) {
        html = (
          <div className={cls("cert-degree")}>
            {txt1} <br />
            {splitSentence[position]} <br />
            {txt2}
            <span style={{ fontSize: "15pt" }}>&nbsp;WITH&nbsp;</span>
            {honorsTitle}
          </div>
        );
      } else {
        html = (
          <div className={cls("cert-degree")}>
            {txt1} <br />
            {splitSentence[position]} <br />
            {txt2}
          </div>
        );
      }
    } else if (honorsTitle) {
      html = (
        <div className={cls("cert-degree")}>
          {DegreeTitle} <span style={{ fontSize: "15pt" }}>WITH&nbsp;</span>
          {honorsTitle}
        </div>
      );
    } else {
      html = <div className={cls("cert-degree")}>{DegreeTitle}</div>;
    }
    return html;
  };

  // render content
  renderContent() {
    const style1 = {
      width: "6.32cm",
      height: "0.4cm",
      textAlign: "center",
      border: "0px solid"
    };
    const style2 = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "13.16cm",
      height: "0.4cm",
      textAlign: "center",
      border: "0px solid"
    };
    const degreeData = this.dataSource.additionalData.degreeScroll[0];
    const dateConferred = isoDateToLocalLong(degreeData.dateConferred);
    const html = (
      <table width="100%">
        <tbody>
          <tr>
            <td>
              {/* This is to certify that */}
              <div className={cls("cert-content cert-justify")} style={style1}>
                This is to certify that
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {/* student name */}
              <div className={cls("cert-name")}>
                {this.dataSource.recipient.name.toUpperCase()}
              </div>
            </td>
          </tr>
          <tr>
            <td className={cls("cert-content cert-justify")}>
              {/* having fulfilled the requirements prescribed */}
              <div style={style2}>
                having fulfilled the requirements prescribed
              </div>
            </td>
          </tr>
          <tr>
            <td className={cls("cert-content cert-justify")}>
              {/* by the University was conferred the degree of */}
              <div style={style2}>
                by the University was conferred the degree of
              </div>
            </td>
          </tr>
          <tr>
            <td>{renderVoid("0.32cm")}</td>
          </tr>
          <tr>
            <td>
              {/* degree & honours */}
              {this.renderDegree(degreeData)}
            </td>
          </tr>
          <tr>
            <td>{renderVoid("0.32cm")}</td>
          </tr>
          <tr>
            <td>
              {/* on */}
              <div className={cls("cert-content")} style={style1}>
                on
              </div>
            </td>
          </tr>
          <tr>
            <td>{renderVoid("0.78cm")}</td>
          </tr>
          <tr>
            <td className={cls("cert-date")}>
              {/* issue date */}
              {dateConferred}
            </td>
          </tr>
        </tbody>
      </table>
    );
    return html;
  }

  // render signatures
  renderSigs = () => {
    let sig1;
    let sig2;
    if (this.dataSource.additionalData.images) {
      sig1 = renderImage(this.dataSource.additionalData.images.TRUSTEES);
      sig2 = renderImage(this.dataSource.additionalData.images.PRESIDENT);
    }
    const html = (
      <table width="100%">
        <tbody>
          <tr>
            <td rowSpan="2" width="50%" align="center">
              {renderNUSSeal()}
            </td>
            <td align="center">
              {/* signature 1 */}
              <div className={cls("cert-sig")}>
                {sig1}
                <br />
                Chair, Board of Trustees
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              {/* signature 2 */}
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
    return html;
  };

  // main render
  render() {
    const html = (
      <div className={cls("nus-degree")}>
        <div className={cls("a4-portrait")}>
          <article>
            <div style={{ height: "23.4cm", border: "0px solid" }}>
              {renderVoid("2.13cm")}
              {renderNUSTitle()}
              {renderVoid("0.59cm")}
              {renderNUSLogo()}
              {renderVoid("0.93cm")}
              {this.renderContent()}
            </div>
            <div style={{ border: "0px solid" }}>{this.renderSigs()}</div>
          </article>
        </div>
      </div>
    );
    return html;
  }
}

Degree.propTypes = {
  dataSource: PropTypes.object.isRequired
};

const Template = ({ certificate }) => {
  // 794px is width of A4 portrait (21cm)
  const ratio = (window.innerWidth - 30) / 794;
  const scale =
    ratio < 1
      ? {
          transform: `scale(${ratio}, ${ratio})`,
          transformOrigin: "top left"
        }
      : null;
  const html = (
    <div style={scale}>
      <Degree dataSource={certificate} />
    </div>
  );
  return html;
};
export default Template;
Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
