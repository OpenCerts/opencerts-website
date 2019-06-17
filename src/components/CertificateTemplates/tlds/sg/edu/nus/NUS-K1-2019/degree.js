import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  isoDateToLocalLong,
  sassClassNames,
  renderImage,
  renderVoid,
  renderNUSTitle,
  renderNUSLogo,
  renderNUSSeal
} from "../common";
import scss from "./degree.scss";

// construct class names
const cls = names => sassClassNames(names, scss);

class Degree extends Component {
  constructor(props) {
    super(props);
    this.dataSource = this.props.dataSource;
  }

  // render degree and honours
  renderDegree = degreeData => {
    const htmlDegree = (
      <div className={cls("cert-degree")}>
        {degreeData.degreeTitle.toUpperCase()}
      </div>
    );
    let htmlDegHonors = "";
    let honorsTitle = degreeData.honours ? degreeData.honours : "";
    if (honorsTitle) {
      honorsTitle = honorsTitle.replace(/1st/gi, "FIRST");
      honorsTitle = honorsTitle.replace(/2nd/gi, "SECOND");
      htmlDegHonors = (
        <div className={cls("cert-degree")}>
          <span style={{ fontSize: "18pt" }}>WITH&nbsp;</span>
          {honorsTitle.toUpperCase()}
        </div>
      );
    }
    let htmlMajor = "";
    const majorTitle = degreeData.major ? degreeData.major : "";
    if (majorTitle) {
      htmlMajor = (
        <div className={cls("cert-degree")}>
          <span style={{ fontSize: "18pt" }}>IN&nbsp;</span>
          {majorTitle.toUpperCase()}
        </div>
      );
    }
    return (
      <Fragment>
        {htmlDegree}
        {htmlDegHonors}
        {htmlMajor}
      </Fragment>
    );
  };

  // render content
  renderContent(dataSource) {
    const style1 = {
      width: "6.32cm",
      height: "0.6cm",
      textAlign: "center",
      border: "0px solid"
    };
    const style2 = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "13.16cm",
      height: "0.6cm",
      textAlign: "center",
      border: "0px solid"
    };
    const degreeData = dataSource.additionalData.degreeData[0];
    const dateConferred = isoDateToLocalLong(degreeData.dateConferred);
    const html = (
      <table width="100%">
        <tbody>
          <tr>
            <td>
              {/* This is to certify that */}
              <div className={cls("cert-content")} style={style1}>
                This is to certify that
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {/* student name */}
              <div className={cls("cert-name")}>
                {dataSource.recipient.name.toUpperCase()}
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
            <td className={cls("cert-content")}>
              {/* on */}
              <div style={style2}>on</div>
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
            <td rowSpan="2" width="50%" style={{ textAlign: "center" }}>
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
              {this.renderContent(this.dataSource)}
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
