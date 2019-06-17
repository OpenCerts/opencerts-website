import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  isoDateToLocalLong,
  capitalizedText,
  sassClassNames,
  renderImage,
  renderVoid,
  renderNUSSeal,
  NUS_LOGO,
  ICL_LOGO,
  ICL_SEAL
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
  renderTitle = () => (
    <div className={cls("cert-header")}>
      NATIONAL UNIVERSITY
      <br />
      OF SINGAPORE
    </div>
  );

  // render logo
  renderLogo = () => <img src={NUS_LOGO} className={cls("cert-logo")} />;

  renderLogo1 = () => <img src={ICL_LOGO} className={cls("cert-logo1")} />;

  // render degree and honours
  renderDegree = degreeData => {
    const DegreeTitleCase = capitalizedText(
      degreeData.degreeTitle.toLowerCase()
    );
    const html = <div className={cls("cert-degree")}>{DegreeTitleCase}</div>;
    return html;
  };

  // render content
  renderContent() {
    const style1 = {
      width: "10cm",
      height: ".9cm",
      textAlign: "center",
      border: "0px solid"
    };
    const style3 = {
      width: "10cm",
      height: ".2cm",
      textAlign: "center",
      border: "0px solid"
    };
    const style2 = {
      width: "10cm",
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
              {/* National Univerify of Singapore */}
              <div className={cls("cert-headerdet")} style={style1}>
                National University of Singapore
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {/* and */}
              <div className={cls("cert-headerdet")} style={style1}>
                And
              </div>
            </td>
          </tr>
          <tr>
            <td>
              {/* Imperial College London */}
              <div className={cls("cert-headerdet")} style={style1}>
                Imperial College London
              </div>
            </td>
          </tr>
          <tr>
            <td>{renderVoid("0.32cm")}</td>
          </tr>
          <tr>
            <td>
              {/* have conferred on */}
              <div className={cls("cert-headerdet")} style={style3}>
                have conferred on
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
              {/* the degree of */}
              <div className={cls("cert-content")} style={style2}>
                the degree of
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

  // render signatures
  renderSigs = () => {
    let sig1;
    let sig2;
    let sig3;
    let sig4;
    if (this.dataSource.additionalData.images) {
      sig1 = renderImage(this.dataSource.additionalData.images.TRUSTEES);
      sig2 = renderImage(this.dataSource.additionalData.images.PRESIDENT);
      sig3 = renderImage(this.dataSource.additionalData.images.TRUSTEESIMP);
      sig4 = renderImage(this.dataSource.additionalData.images.PRESIDENTIMP);
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
              {/* signature 2 */}
              <div className={cls("cert-sig")}>
                &nbsp;&nbsp; {sig2}
                <br />
                &nbsp;&nbsp; President & Rector
                <br />
                &nbsp;&nbsp; Imperial College London
              </div>
            </td>
          </tr>
          <tr>
            <td align="center">
              {/* signature 3 */}
              <div className={cls("cert-sig")}>
                <br />
                &nbsp;&nbsp;{sig3}
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
                &nbsp;&nbsp; Academic Registrar
                <br />
                &nbsp;&nbsp; Imperial College London
              </div>
            </td>
          </tr>
          <tr>
            <td style={{ paddingLeft: "40px" }}>{renderNUSSeal()}</td>
            <td>{this.renderSealICL()}</td>
          </tr>
        </tbody>
      </table>
    );
    return html;
  };

  // render ICL seal
  renderSealICL = () => <img src={ICL_SEAL} className={cls("cert-seal")} />;

  // main render
  render() {
    const html = (
      <div className={cls("nus-degree")}>
        <div className={cls("a4-portrait")}>
          <article>
            <div style={{ height: "18.4cm", border: "0px solid" }}>
              {renderVoid("1.27cm")}
              <table width="100%">
                <tbody>
                  <tr>
                    <td width="25%">
                      {this.renderTitle()}
                      {this.renderLogo()}
                    </td>
                    <td>{this.renderLogo1()}</td>
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
