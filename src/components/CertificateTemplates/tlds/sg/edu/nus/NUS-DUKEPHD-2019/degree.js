import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  isoDateToLocalLong,
  capitalizedText,
  sassClassNames,
  renderImage,
  NUS_LOGO,
  NUS_SEAL
} from "../common";
import scss from "./degree.scss";

// construct class names
const cls = names => sassClassNames(names, scss);

class Degree extends Component {
  constructor(props) {
    super(props);
    this.dataSource = this.props.dataSource;
  }

  // render an empty div with specified height
  renderVoid = height => (
    <div
      style={{
        display: "block",
        width: "100%",
        height,
        border: "0px solid"
      }}
    />
  );

  // render cert title
  renderTitle = () => (
    <div className={cls("cert-header")}>
      NATIONAL UNIVERSITY
      <br />
      OF SINGAPORE
    </div>
  );

  // render logo
  renderLogo = () => <img src={NUS_LOGO} className={cls("cert-logo")} />;

  // render degree and honours
  renderDegree = degreeData => {
    const DegreeTitleCase = capitalizedText(
      degreeData.degreeTitle.toLowerCase()
    );
    const html = [];
    html.push(<div className={cls("cert-degree")}>{DegreeTitleCase}</div>);
    // let honorsTitle = degreeData.honours ? degreeData.honours : "";
    // if (honorsTitle) {
    //   honorsTitle = honorsTitle.replace(/1st/gi, "FIRST");
    //   honorsTitle = honorsTitle.replace(/2nd/gi, "SECOND");
    //   html.push(
    //     <div className={cls("cert-degree")}>
    //       <span style={{ fontSize: "18pt" }}>WITH&nbsp;</span>
    //       {honorsTitle.toUpperCase()}
    //     </div>
    //   );
    // }
    return html;
  };

  // render content
  renderContent() {
    const style1 = {
      width: "6.32cm",
      height: "0.1cm",
      textAlign: "center",
      border: "0px solid"
    };
    const style2 = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      width: "13.16cm",
      height: "0.5cm",
      textAlign: "center",
      border: "0px solid"
    };
    const degreeData = this.dataSource.additionalData.degreeData[0];
    const dateConferred = isoDateToLocalLong(degreeData.dateConferred);
    const html = (
      <table width="100%">
        <tbody>
          <tr>
            <td>
              {/* This is to certify that */}
              <div className={cls("cert-content")} style={style1}>
                This&nbsp;&nbsp;&nbsp;is&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;certify&nbsp;&nbsp;&nbsp;that
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
              {/* by the Univers ity and the Duke-NUS Medical */}
              <div style={style2}>
                by the University and the Duke-NUS Medical
              </div>
            </td>
          </tr>
          <tr>
            <td className={cls("cert-content cert-justify")}>
              {/* School Singapore, was conferred the degree of  */}
              <div style={style2}>
                School Singapore, conferred the degree of
              </div>
            </td>
          </tr>
          <tr>
            <td>{this.renderVoid("0.32cm")}</td>
          </tr>
          <tr>
            <td>
              {/* degree & honours */}
              {this.renderDegree(degreeData)}
            </td>
          </tr>
          <tr>
            <td>{this.renderVoid("0.32cm")}</td>
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
            <td>{this.renderVoid("0.78cm")}</td>
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

  // render seal
  renderSeal = () => <img src={NUS_SEAL} className={cls("cert-seal")} />;

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
              {this.renderSeal()}
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
    const html = [];
    html.push(
      <div className={cls("nus-degree")}>
        <div className={cls("a4-portrait")}>
          <article>
            <div style={{ height: "23.4cm", border: "0px solid" }}>
              {this.renderVoid("2.13cm")}
              {this.renderTitle()}
              {this.renderVoid("0.59cm")}
              {this.renderLogo()}
              {this.renderVoid("0.93cm")}
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
