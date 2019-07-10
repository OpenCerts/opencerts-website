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
  ANU_LOGO,
  ANU_SEAL
} from "../common";
import scss from "./degree.scss";

// construct class names
const cls = names => sassClassNames(names, scss);

class Degree extends Component {
  constructor(props) {
    super(props);
    this.dataSource = this.props.dataSource;
  }

  // render ANU title
  renderANUTitle = () => (
    <div className={cls("cert-header-name")}>
      THE AUSTRALIAN NATIONAL
      <br />
      UNIVERSITY
    </div>
  );

  // render ANU logo
  renderANULogo = () => <img src={ANU_LOGO} className={cls("cert-logo-anu")} />;

  // render degree title
  renderDegreeTitle = degreeData => {
    const degreeTitleCase = degreeData.degreeTitle.toLowerCase();

    let html;
    if (degreeData.major) {
      html = (
        <div className={cls("cert-degree-title")}>
          {degreeTitleCase}
          <br />({degreeData.major.toLowerCase()})
        </div>
      );
    } else {
      html = <div className={cls("cert-degree-title")}>{degreeTitleCase}</div>;
    }
    return html;
  };

  // render honours
  renderHonours = degreeData => {
    let html = "";
    let honorsTitle = degreeData.honours ? degreeData.honours : "";
    if (honorsTitle) {
      honorsTitle = honorsTitle.replace(/1st/gi, "FIRST");
      honorsTitle = honorsTitle.replace(/2nd/gi, "SECOND");
      html = (
        <tr>
          <td>
            with&nbsp;
            {honorsTitle}
          </td>
        </tr>
      );
    }
    return html;
  };

  renderANUSeal = () => <img src={ANU_SEAL} className={cls("cert-seal")} />;

  // render starting phrase before name
  renderContent() {
    const degreeData = this.dataSource.additionalData.degreeScroll[0];
    const dateConferred = isoDateToLocalLong(degreeData.dateConferred);

    const html = (
      <table className={cls("cert-content-table")}>
        <tbody>
          <tr>
            <td>This is to certify that</td>
          </tr>
          <tr>
            <td>{renderVoid("0.5cm")}</td>
          </tr>
          <tr>
            <td className={cls("cert-content-name")}>
              {this.dataSource.recipient.name.toLowerCase()}
            </td>
          </tr>
          <tr>
            <td>{renderVoid("0.5cm")}</td>
          </tr>
          <tr>
            <td>Having completed the requirements</td>
          </tr>
          <tr>
            <td>For the joint degree programme of</td>
          </tr>
          <tr>
            <td>The Australian National University and</td>
          </tr>
          <tr>
            <td>The National University of Singapore</td>
          </tr>
          <tr>
            <td>Was conferred the degree of</td>
          </tr>
          <tr>
            <td>{renderVoid("0.5cm")}</td>
          </tr>
          <tr>
            <td>{this.renderDegreeTitle(degreeData)}</td>
          </tr>
          <tr>
            <td>{renderVoid("0.5cm")}</td>
          </tr>
          {this.renderHonours(degreeData)}
          <tr>
            <td>{renderVoid("0.3cm")}</td>
          </tr>
          <tr>
            <td>on</td>
          </tr>
          <tr>
            <td>{renderVoid("0.3cm")}</td>
          </tr>
          <tr>
            <td>{dateConferred}</td>
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
      sig1 = renderImage(this.dataSource.additionalData.images.ANU_CHANCELLOR);
      sig2 = renderImage(
        this.dataSource.additionalData.images.ANU_VICE_CHANCELLOR
      );
      sig3 = renderImage(this.dataSource.additionalData.images.TRUSTEES);
      sig4 = renderImage(this.dataSource.additionalData.images.PRESIDENT);
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
              Chancellor
              <br />
              The Australian National University
            </td>
            <td>
              Chair, Board of Trustees
              <br />
              National University of Singapore
            </td>
          </tr>
          <tr>
            <td />
            <td>{sig2}</td>
            <td>{sig4}</td>
          </tr>
          <tr>
            <td />
            <td>
              Vice-Chancellor
              <br />
              The Australian National University
            </td>
            <td>
              President
              <br />
              National University of Singapore
            </td>
          </tr>
          <tr>
            <td />
            <td>{this.renderANUSeal()}</td>
            <td>{renderNUSSeal()}</td>
            <td />
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
        <div className={cls("a3-portrait")}>
          <article>
            <div style={{ border: "0px solid" }}>
              {renderVoid("2cm")}
              <table className={cls("cert-header-table")}>
                <tbody>
                  <tr>
                    <td width="5%" />
                    <td width="45%">{this.renderANUTitle()}</td>
                    <td width="45%">
                      {renderNUSTitle(cls("cert-header-name"))}
                    </td>
                    <td width="5%" />
                  </tr>
                  <tr>
                    <td>{renderVoid("0.4cm")}</td>
                  </tr>
                  <tr>
                    <td />
                    <td>{this.renderANULogo()}</td>
                    <td>{renderNUSLogo(cls("cert-logo-nus"))}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
              {renderVoid("0.93cm")}
              {this.renderContent()}
              {renderVoid("0.93cm")}
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
  // 1123px is width of A4 portrait (29.7cm)
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
