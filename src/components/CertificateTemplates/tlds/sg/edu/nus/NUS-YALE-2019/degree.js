import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  dateToWords,
  capitalizedText,
  sassClassNames,
  renderImage,
  renderVoid,
  renderNUSSeal,
  NUS_YALENUS_LOGO
} from "../common";
import scss from "./degree.scss";

// construct class names
const cls = names => sassClassNames(names, scss);

class Degree extends Component {
  constructor(props) {
    super(props);
    this.dataSource = this.props.dataSource;
  }

  // render logo
  renderLogo = () => (
    <img src={NUS_YALENUS_LOGO} className={cls("cert-logo")} />
  );

  // render taglone
  renderTagline = () => {
    const html = (
      <div className={cls("cert-tagline")}>
        Of the National University of Singapore
      </div>
    );
    return html;
  };

  // render degree title
  renderDegreeTitle = degreeData => {
    const degreeTitleCase = capitalizedText(
      degreeData.degreeTitle.toLowerCase()
    );
    /* do not display hnours for Yale NUS
    let honorsTitle = degreeData.honours ? degreeData.honours : "";

    let html;

    if (honorsTitle) {
      honorsTitle = honorsTitle.replace(/1st/gi, "FIRST");
      honorsTitle = honorsTitle.replace(/2nd/gi, "SECOND");
      const degreeHonTitleCase = capitalizedText(honorsTitle.toLowerCase());
      html = (
        <div className={cls("cert-degree-title")}>
          {degreeTitleCase} with {degreeHonTitleCase}
        </div>
      );
    } else {
      html = <div className={cls("cert-degree-title")}>{degreeTitleCase}</div>;
    }
    */
    const html = (
      <div className={cls("cert-degree-title")}>{degreeTitleCase}</div>
    );
    return html;
  };

  // render main content
  renderContent() {
    const degreeData = this.dataSource.additionalData.degreeScroll[0];
    const words = dateToWords(degreeData.dateConferred);
    const dateConferred = `${words.dayMonth} ${words.year}`;

    const html = (
      <table className={cls("cert-content-table")}>
        <tbody>
          <tr>
            <td>certifies that</td>
          </tr>
          <tr>
            <td>{renderVoid("0.3cm")}</td>
          </tr>
          <tr>
            <td className={cls("cert-content-name")}>
              {this.dataSource.recipient.name}
            </td>
          </tr>
          <tr>
            <td>{renderVoid("0.3cm")}</td>
          </tr>
          <tr>
            <td>
              having fulfilled the requirements prescribed by the board of
              governers and faculty
            </td>
          </tr>
          <tr>
            <td>of the College was awarded the degree of</td>
          </tr>
          <tr>
            <td>{renderVoid("0.3cm")}</td>
          </tr>
          <tr>
            <td>{this.renderDegreeTitle(degreeData)}</td>
          </tr>
          <tr>
            <td>{renderVoid("0.3cm")}</td>
          </tr>
          <tr>
            <td style={{ fontWeight: "bold" }}>{dateConferred}.</td>
          </tr>
        </tbody>
      </table>
    );

    return html;
  }

  renderSigns = () => {
    let sig1;
    let sig2;
    let sig3;
    let sig4;
    if (this.dataSource.additionalData.images) {
      sig1 = renderImage(
        this.dataSource.additionalData.images.TRUSTEES,
        240,
        90
      );
      sig2 = renderImage(
        this.dataSource.additionalData.images.PRESIDENT,
        240,
        90
      );
      sig3 = renderImage(
        this.dataSource.additionalData.images.YNC_GOVERNING,
        240,
        90
      );
      sig4 = renderImage(
        this.dataSource.additionalData.images.YNC_PRESIDENT,
        240,
        90
      );
    }

    const html = (
      <table className={cls("cert-sig")}>
        <tbody>
          <tr>
            <td width="33%">
              {sig1}
              {/* NUS trustees */}
            </td>
            <td rowSpan="5">{renderNUSSeal()}</td>
            <td>
              {sig3}
              {/* YNC gov board */}
            </td>
          </tr>
          <tr>
            <td>
              Chair, Board of Trustees
              <br />
              National University of Singapore
            </td>
            <td>
              Chair, Governing Board
              <br />
              Yale-NUS College
            </td>
          </tr>
          <tr>
            <td>{renderVoid("0.3cm")}</td>
            <td />
          </tr>
          <tr>
            <td>
              {sig2} {/* NUS president */}
            </td>
            <td>
              {sig4} {/* YNC president */}
            </td>
          </tr>
          <tr>
            <td>
              President
              <br />
              National University Of Singapore
            </td>
            <td>
              President
              <br />
              Yale-NUS College
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
        <div className={cls("a4-landscape")}>
          <article>
            <div style={{ height: "13cm", border: "0px solid" }}>
              {renderVoid("2cm")}
              <table className={cls("cert-header-table")}>
                <tbody>
                  <tr>
                    <td>{this.renderLogo()}</td>
                  </tr>
                  <tr>
                    <td>{renderVoid("0.1cm")}</td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "center" }}>
                      {this.renderTagline()}
                    </td>
                  </tr>
                  <tr>
                    <td>{renderVoid("0.1cm")}</td>
                  </tr>
                </tbody>
              </table>
              {this.renderContent()}
            </div>
            <div style={{ border: "0px solid" }}>{this.renderSigns()}</div>
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
  // 1123px is width of A4 landscape (29.7cm)
  const ratio = (window.innerWidth - 30) / 1123;
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
