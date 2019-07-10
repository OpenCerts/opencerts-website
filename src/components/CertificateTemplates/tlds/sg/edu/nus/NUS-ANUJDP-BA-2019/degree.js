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

  // render cert title
  renderANUTitle = () => (
    <div className={cls("cert-header")}>
      THE AUSTRALIAN NATIONAL
      <br />
      UNIVERSITY
    </div>
  );

  // render ANU logo
  renderANULogo = () => <img src={ANU_LOGO} className={cls("cert-logo1")} />;

  // render degree and honours
  renderDegree = degreeData => {
    const DegreeTitleCase = capitalizedText(
      degreeData.degreeTitle.toLowerCase()
    );

    const html = [];
    html.push(<div className={cls("cert-degree")}>{DegreeTitleCase}</div>);
    let honorsTitle = degreeData.honours ? degreeData.honours : "";
    if (honorsTitle) {
      honorsTitle = honorsTitle.replace(/1st/gi, "FIRST");
      honorsTitle = honorsTitle.replace(/2nd/gi, "SECOND");
      const DegreeHonTitleCase = capitalizedText(honorsTitle.toLowerCase());
      html.push(
        <div className={cls("cert-degree")}>
          with&nbsp;
          {DegreeHonTitleCase}
        </div>
      );
    }
    return html;
  };

  // render additional content
  renderContAdd = degreeData => {
    const style = {
      width: "13.4cm",
      height: ".5cm",
      textAlign: "center",
      border: "0px solid"
    };
    let html;
    if (degreeData.degreeTitle.indexOf("ART") >= 0)
      html = (
        <div className={cls("cert-content cert-justify")} style={style}>
          of Arts (Honours) Joint Degree Programme
        </div>
      );
    else
      html = (
        <div className={cls("cert-content cert-justify")} style={style}>
          of Science (Honours) Joint Degree Programme
        </div>
      );
    return html;
  };

  // render content
  renderContent() {
    const style1 = {
      width: "13.4cm",
      height: ".5cm",
      textAlign: "center",
      border: "0px solid"
    };
    const degreeData = this.dataSource.additionalData.degreeScroll[0];
    const dateConferred = isoDateToLocalLong(degreeData.dateConferred);
    // let honorsTitle = "";
    // if(degreeData.degreeTitle.indexOf("ART") !== -1)
    //		honorsTitle = "Arts";
    // else
    //		honorsTitle = "Science";
    const html = (
      <table width="100%">
        <tbody>
          <tr>
            <td>
              {/* This is to certify that following the completion of */}
              <div className={cls("cert-content cert-justify")} style={style1}>
                This is to certify that following the completion of
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {/* the Bachelor of Philosophy (Honours) / Bachelor  */}
              <div className={cls("cert-content cert-justify")} style={style1}>
                the Bachelor of Philosophy (Honours) / Bachelor
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {/* of Arts (Honours) Joint Degree Programme */}
              {this.renderContAdd(degreeData)}
            </td>
          </tr>
          <tr>
            <td>
              {/* of The Australian Nat ional University */}
              <div className={cls("cert-content1 cert-justify")} style={style1}>
                of The Australian National University
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {/* and The National University of Singapore */}
              <div className={cls("cert-content1 cert-justify")} style={style1}>
                and The National University of Singapore
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
            <td>
              {/* was conferred the degree of */}
              <div className={cls("cert-content")} style={style1}>
                was conferred the degree of
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
            <td>{renderVoid("0.2cm")}</td>
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
            <td>{renderVoid("0.20cm")}</td>
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

  // render ANU seal
  renderSealANU = () => <img src={ANU_SEAL} className={cls("cert-seal")} />;

  // render signatures
  renderSigs = () => {
    let sig1;
    let sig2;
    let sig3;
    let sig4;
    if (this.dataSource.additionalData.images) {
      sig1 = renderImage(this.dataSource.additionalData.images.TRUSTEES);
      sig2 = renderImage(this.dataSource.additionalData.images.PRESIDENT);
      sig3 = renderImage(this.dataSource.additionalData.images.ANU_CHANCELLOR);
      sig4 = renderImage(
        this.dataSource.additionalData.images.ANU_VICE_CHANCELLOR
      );
    }
    const html = (
      <table width="100%">
        <tbody>
          <tr>
            <td align="center">
              {/* signature 1 */}
              <div className={cls("cert-sig")}>
                &nbsp;&nbsp; {sig1}
                <br />
                &nbsp;&nbsp;Chair, Board of Trustees
                <br />
                &nbsp;&nbsp;National University of Singapore
              </div>
            </td>
            <td align="center">
              {/* signature 3 */}
              <div className={cls("cert-sig")}>
                &nbsp;&nbsp; {sig3}
                <br />
                &nbsp;&nbsp; Chancellor
                <br />
                &nbsp;&nbsp; The Australian National University
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              {/* signature 2 */}
              <div className={cls("cert-sig")}>
                <br />
                &nbsp;&nbsp;{sig2}
                <br />
                &nbsp;&nbsp; President
                <br />
                &nbsp;&nbsp; National University of Singapore
              </div>
            </td>
            <td align="center">
              {/* signature 4 */}
              <div className={cls("cert-sig")}>
                &nbsp;&nbsp; {sig4}
                <br />
                &nbsp;&nbsp; Vice-Chancellor
                <br />
                &nbsp;&nbsp; The Australian National University
              </div>
            </td>
          </tr>
          <tr>
            <td>{renderNUSSeal(cls("cert-seal"))}</td>
            <td>{this.renderSealANU()}</td>
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
            <div style={{ height: "18.4cm", border: "0px solid" }}>
              {renderVoid("1cm")}
              <table width="100%">
                <tbody>
                  <tr>
                    <td width="50%">{renderNUSTitle(cls("cert-header"))} </td>
                    <td>{this.renderANUTitle()}</td>
                  </tr>
                  <tr>
                    <td> {renderNUSLogo(cls("cert-logo"))} </td>
                    <td>{this.renderANULogo()}</td>
                  </tr>
                </tbody>
              </table>
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
