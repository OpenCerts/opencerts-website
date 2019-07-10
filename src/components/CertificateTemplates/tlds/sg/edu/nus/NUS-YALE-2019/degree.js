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
    const DegreeTitleCase = capitalizedText(
      degreeData.degreeTitle.toLowerCase()
    );
    let honorsTitle = degreeData.honours ? degreeData.honours : "";

    let html;

    if (honorsTitle) {
      honorsTitle = honorsTitle.replace(/1st/gi, "FIRST");
      honorsTitle = honorsTitle.replace(/2nd/gi, "SECOND");
      const DegreeHonTitleCase = capitalizedText(honorsTitle.toLowerCase());
      html = (
        <div className={cls("cert-degree-title")}>
          {DegreeTitleCase} with {DegreeHonTitleCase}
        </div>
      );
    } else {
      html = <div className={cls("cert-degree-title")}>{DegreeTitleCase}</div>;
    }

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
    if (this.dataSource.additionalData.images) {
      sig1 = renderImage(this.dataSource.additionalData.images.TRUSTEES);
      sig2 = renderImage(this.dataSource.additionalData.images.YNC_GOVERNING);
      sig3 = renderImage(this.dataSource.additionalData.images.YNC_PRESIDENT);
    }

    const html = (
      <table className={cls("cert-sig")}>
        <tbody>
          <tr>
            <td width="33%">{sig1}</td>
            <td rowSpan="5">{renderNUSSeal()}</td>
            <td>{sig2}</td>
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
            <td />
            <td>{sig3}</td>
          </tr>
          <tr>
            <td />
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
