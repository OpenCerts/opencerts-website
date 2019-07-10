import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  isoDateToLocalLong,
  capitalizedText,
  sassClassNames,
  renderImage,
  renderVoid,
  renderNUSTitle,
  renderNUSLogo,
  renderNUSSeal,
  JHU_LOGO
} from "../common";
import scss from "./degree.scss";

// construct class names
const cls = names => sassClassNames(names, scss);

class Degree extends Component {
  constructor(props) {
    super(props);
    this.dataSource = this.props.dataSource;
  }

  // render JHU logo
  renderJHULogo = () => <img src={JHU_LOGO} className={cls("cert-logo-jhu")} />;

  // render degree title
  renderDegreeTitle = degreeData => {
    const degreeTitleCase = capitalizedText(
      degreeData.degreeTitle.toLowerCase()
    );
    const degreeMajor = capitalizedText(degreeData.major.toLowerCase());
    const honorsTitle = capitalizedText(
      degreeData.honours ? degreeData.honours.toLowerCase() : ""
    );
    const html = (
      <div className={cls("cert-degree-title")}>
        {degreeTitleCase}
        <br />
        {honorsTitle ? `${honorsTitle} ` : ""}
        {degreeMajor ? `in ${degreeMajor}` : ""}
      </div>
    );

    return html;
  };

  // render starting phrase before name
  renderContent() {
    const degreeData = this.dataSource.additionalData.degreeScroll[0];
    const dateConferred = isoDateToLocalLong(degreeData.dateConferred);
    const html = (
      <table className={cls("cert-content-table")}>
        <tbody>
          <tr>
            <td width="12%" />
            <td width="76%" className={cls("cert-content-beforename")}>
              This is to certify that
            </td>
            <td width="12%" />
          </tr>
          <tr>
            <td colSpan="3">{renderVoid("0.5cm")}</td>
          </tr>
          <tr>
            <td />
            <td className={cls("cert-content-name")}>
              {this.dataSource.recipient.name.toLowerCase()}
            </td>
            <td />
          </tr>
          <tr>
            <td colSpan="3">{renderVoid("0.5cm")}</td>
          </tr>
          <tr>
            <td />
            <td>having fulfilled the requirements for</td>
            <td />
          </tr>
          <tr>
            <td />
            <td>the Joint Degree Programme prescribed by</td>
            <td />
          </tr>
          <tr>
            <td />
            <td>the Yong Siew Toh Conservatory of Music,</td>
            <td />
          </tr>
          <tr>
            <td />
            <td>National University of Singapore, and</td>
            <td />
          </tr>
          <tr>
            <td />
            <td>The Peabody Conservatory of Music of</td>
            <td />
          </tr>
          <tr>
            <td />
            <td>The Johns Hopkins University,</td>
            <td />
          </tr>
          <tr>
            <td />
            <td>was conferred the degree of</td>
            <td />
          </tr>
          <tr>
            <td colSpan="3">{renderVoid("0.2cm")}</td>
          </tr>
          <tr>
            <td colSpan="3">{this.renderDegreeTitle(degreeData)}</td>
          </tr>
          <tr>
            <td colSpan="3">{renderVoid("0.2cm")}</td>
          </tr>
          <tr>
            <td colSpan="3">on</td>
          </tr>
          <tr>
            <td colSpan="3">{renderVoid("0.3cm")}</td>
          </tr>
          <tr>
            <td colSpan="3" className={cls("cert-content-date")}>
              {dateConferred}
            </td>
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
      sig1 = renderImage(this.dataSource.additionalData.images.TRUSTEES);
      sig2 = renderImage(this.dataSource.additionalData.images.PRESIDENT);
      sig3 = renderImage(this.dataSource.additionalData.images.JHU_TRUSTEES);
      sig4 = renderImage(this.dataSource.additionalData.images.JHU_PRESIDENT);
    }
    const html = (
      <table className={cls("cert-sig")}>
        <tbody>
          <tr>
            <td width="3%" />
            <td width="60%">{sig1}</td>
            <td>{sig3}</td>
          </tr>
          <tr>
            <td />
            <td>
              Chair, Board of Trustees
              <br />
              National University of Singapore
            </td>
            <td>
              Chair of the Board of Trustees
              <br />
              Johns Hopkins University
            </td>
          </tr>
          <tr>
            <td>{renderVoid("0.5cm")}</td>
          </tr>
          <tr>
            <td />
            <td>{sig2}</td>
            <td>{sig4}</td>
          </tr>
          <tr>
            <td />
            <td>
              President
              <br />
              National University of Singapore
            </td>
            <td>
              President
              <br />
              Johns Hopkins University
            </td>
          </tr>
          <tr>
            <td>{renderVoid("0.3cm")}</td>
          </tr>
          <tr>
            <td colSpan="3" style={{ textAlign: "center" }}>
              {renderNUSSeal()}
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
            <div style={{ border: "0px solid" }}>
              {renderVoid("1.6cm")}
              <table className={cls("cert-header-table")}>
                <tbody>
                  <tr>
                    <td width="10%" />
                    <td width="35%">
                      {renderNUSTitle(cls("cert-header-name"))}
                    </td>
                    <td width="10%" />
                    <td width="35%" rowSpan="3">
                      {this.renderJHULogo()}
                    </td>
                    <td width="10%" />
                  </tr>
                  <tr>
                    <td />
                    <td>{renderVoid("0.1cm")}</td>
                  </tr>
                  <tr>
                    <td />
                    <td>{renderNUSLogo(cls("cert-logo-nus"))}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
              {renderVoid("0.6cm")}
              <div style={{ textAlign: "center" }}>{this.renderContent()}</div>
              {renderVoid("1cm")}
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
