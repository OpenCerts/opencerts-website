import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import {
  dateToWords,
  capitalizedText,
  sassClassNames,
  renderImage,
  renderVoid,
  UNC_SEAL
} from "../common";
import scss from "./degree.scss";

// construct class names
const cls = names => sassClassNames(names, scss);

class Degree extends Component {
  constructor(props) {
    super(props);
    this.dataSource = this.props.dataSource;
  }

  // render first degree title
  renderFirstDegreeTitle = degreeData => {
    if (degreeData) {
      const degreeTitle = degreeData.degreeTitle;
      const degreeTitleCase = capitalizedText(degreeTitle.toLowerCase());
      const html = (
        <div className={cls("cert-degree-title")}>
          {degreeTitleCase} (UNC-Chapel Hill)
        </div>
      );
      return html;
    }
    return "";
  };

  // render second degree title
  renderSecondDegreeTitle = degreeData => {
    const degreeTitleCase = capitalizedText(
      degreeData.degreeTitle.toLowerCase()
    );
    const honorsTitle = capitalizedText(
      degreeData.honours ? degreeData.honours : ""
    );
    const html = (
      <div className={cls("cert-degree-title")}>
        {degreeTitleCase}
        {honorsTitle ? ` Honours ${honorsTitle}` : ""}
        (NUS)
      </div>
    );
    return html;
  };

  // render degree major
  renderDegreeMajor = degreeData => {
    if (degreeData.major) {
      const degreeMajor = capitalizedText(degreeData.major.toLowerCase());
      const html = (
        <Fragment>
          <div style={{ fontSize: "28pt" }}>
            {renderVoid("0.5cm")}
            with a major in
            {renderVoid("0.5cm")}
          </div>
          <div className={cls("cert-degree-major")}>{degreeMajor}</div>
        </Fragment>
      );
      return html;
    }
    return "";
  };

  // render starting phrase before name
  renderContent() {
    const degreeData = this.dataSource.additionalData.degreeScroll[0];
    const words = dateToWords(degreeData.dateConferred);
    const dayMonthConferred = words.dayMonth;
    const yearConferred = words.year[0].toUpperCase() + words.year.substring(1);
    const html = (
      <table className={cls("cert-content-table")}>
        <tbody>
          <tr>
            <td>
              By the authority of the Chancellor of National University of
              Singapore and
            </td>
          </tr>
          <tr>
            <td>
              The Board of Trustees of the University of North Carolina at
              Chapel Hill.
            </td>
          </tr>
          <tr>
            <td>{renderVoid("0.7cm")}</td>
          </tr>
          <tr>
            <td className={cls("cert-content-name")}>
              {this.dataSource.recipient.name.toLowerCase()}
            </td>
          </tr>
          <tr>
            <td>{renderVoid("0.7cm")}</td>
          </tr>
          <tr>
            <td className={cls("cert-content-small")}>
              having completed the studies and fulfilled the requirements of the
              joint degree programme
            </td>
          </tr>
          <tr>
            <td>for the degree of</td>
          </tr>
          <tr>
            <td>{renderVoid("0.2cm")}</td>
          </tr>
          <tr>
            <td>{this.renderFirstDegreeTitle(degreeData)}</td>
          </tr>
          <tr>
            <td style={{ fontSize: "28pt" }}>
              {renderVoid("0.5cm")}
              and
              {renderVoid("0.3cm")}
            </td>
          </tr>
          <tr>
            <td>{this.renderSecondDegreeTitle(degreeData)}</td>
          </tr>
          <tr>
            <td>{this.renderDegreeMajor(degreeData)}</td>
          </tr>
          <tr>
            <td>{renderVoid("0.5cm")}</td>
          </tr>
          <tr>
            <td>has been conferred the degrees with all the rights, honors,</td>
          </tr>
          <tr>
            <td>responsibilities, and privileges pertaining thereunto.</td>
          </tr>
          <tr>
            <td>{renderVoid("0.5cm")}</td>
          </tr>
          <tr>
            <td>Given on {dayMonthConferred},</td>
          </tr>
          <tr>
            <td>{yearConferred}.</td>
          </tr>
        </tbody>
      </table>
    );
    return html;
  }

  renderSeal = () => <img src={UNC_SEAL} className={cls("cert-unc-seal")} />;

  renderSigns = () => {
    let sig1;
    let sig2;
    let sig3;
    let sig4;
    let sig5;
    if (this.dataSource.additionalData.images) {
      sig1 = renderImage(this.dataSource.additionalData.images.UNC_TRUSTEES);
      sig2 = renderImage(this.dataSource.additionalData.images.UNC_CHANCELLOR);
      sig3 = renderImage(this.dataSource.additionalData.images.UNC_DEAN);
      sig4 = renderImage(this.dataSource.additionalData.images.TRUSTEES);
      sig5 = renderImage(this.dataSource.additionalData.images.PRESIDENT);
    }
    const html = (
      <table className={cls("cert-sig")}>
        <tbody>
          <tr>
            <td width="15%" />
            <td width="30%">
              <table width="100%">
                <tbody>
                  <tr>
                    <td>{sig1}</td>
                  </tr>
                  <tr>
                    <td className={cls("cert-sig-line")}>
                      Chairman of the Board of Trustees
                      <br />
                      The University of North Carolina at Chapel Hill
                    </td>
                  </tr>
                  <tr>
                    <td>{sig2}</td>
                  </tr>
                  <tr>
                    <td className={cls("cert-sig-line")}>
                      Chancellor
                      <br />
                      The University of North Carolina at Chapel Hill
                    </td>
                  </tr>
                  <tr>
                    <td>{sig3}</td>
                  </tr>
                  <tr>
                    <td className={cls("cert-sig-line")}>
                      Dean
                      <br />
                      The University of North Carolina at Chapel Hill
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td width="10%" />
            <td width="30%">
              <table width="100%">
                <tbody>
                  <tr>
                    <td>{sig4}</td>
                  </tr>
                  <tr>
                    <td className={cls("cert-sig-line")}>
                      Chair, Board of Trustees
                      <br />
                      National University of Singapore
                    </td>
                  </tr>
                  <tr>
                    <td>{sig5}</td>
                  </tr>
                  <tr>
                    <td className={cls("cert-sig-line")}>
                      President
                      <br />
                      National University of Singapore
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td width="15%" />
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
        <div className={cls("ncch-custom")}>
          <article>
            <div
              style={{
                border: "0px solid",
                position: "relative",
                marginLeft: "6.4cm"
              }}
            >
              {renderVoid("3cm")}
              <div className={cls("cert-seal")}>{this.renderSeal()}</div>
              <table className={cls("cert-header-table")}>
                <tbody>
                  <tr>
                    <td>
                      <div className={cls("cert-header-name")}>
                        National University of Singapore
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>And</td>
                  </tr>
                  <tr>
                    <td>
                      <div className={cls("cert-header-name")}>
                        The University of North Carolina at Chapel Hill
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              {renderVoid("0.5cm")}
              <div style={{ textAlign: "center" }}>{this.renderContent()}</div>
              {renderVoid("1cm")}
            </div>
            <div style={{ border: "0px solid", marginLeft: "6.4cm" }}>
              {this.renderSigns()}
            </div>
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
  // 1660 is width of A3 landscape (42cm)
  const ratio = (window.innerWidth - 30) / 1660;
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
