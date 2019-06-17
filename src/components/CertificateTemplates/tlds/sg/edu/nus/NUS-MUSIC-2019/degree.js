import React, { Component, Fragment } from "react";
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

  // render name
  renderTitle = () => (
    <div className={cls("cert-header-name")}>
      NATIONAL UNIVERSITY
      <br />
      OF SINGAPORE
    </div>
  );

  // render logo
  renderLogo = () => <img src={NUS_LOGO} className={cls("cert-logo")} />;

  // render degree title
  renderDegreeTitle = degreeData => {
    const degreeTitleCase = capitalizedText(
      degreeData.degreeTitle.toLowerCase()
    );
    const degreeMajor = capitalizedText(degreeData.major.toLowerCase());
    const honorsTitle = capitalizedText(
      degreeData.honours ? degreeData.honours : ""
    );

    const html = (
      <div className={cls("cert-degree-title")}>
        {degreeTitleCase}
        {honorsTitle ? (
          <Fragment>
            <br />
            <span>with Honours</span>
          </Fragment>
        ) : (
          ""
        )}
        {degreeMajor ? (
          <Fragment>
            <br />
            <span>in {degreeMajor}</span>
          </Fragment>
        ) : (
          ""
        )}
      </div>
    );
    return html;
  };

  // render the official seal
  renderSeal = () => <img src={NUS_SEAL} className={cls("cert-seal")} />;

  // render starting phrase before name
  renderContent() {
    const html = [];
    const degreeData = this.dataSource.additionalData.degreeData[0];
    const dateConferred = isoDateToLocalLong(degreeData.dateConferred);
    const style1 = { lineHeight: "14pt" };

    html.push(
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
            <td colSpan="3">{this.renderVoid("0.5cm")}</td>
          </tr>
          <tr>
            <td />
            <td className={cls("cert-content-name")}>
              {this.dataSource.recipient.name.toLowerCase()}
            </td>
            <td />
          </tr>
          <tr>
            <td colSpan="3">{this.renderVoid("0.5cm")}</td>
          </tr>
          <tr>
            <td />
            <td style={style1}>having fulfilled the requirements prescribed</td>
            <td />
          </tr>
          <tr>
            <td />
            <td style={style1}>
              by the Yong Siew Toh Conservatory of Music, National
            </td>
            <td />
          </tr>
          <tr>
            <td />
            <td style={style1}>
              University of Singapore, in collaboration with the
            </td>
            <td />
          </tr>
          <tr>
            <td />
            <td style={style1}>Peabody Conservatory of Music of The Johns</td>
            <td />
          </tr>
          <tr>
            <td />
            <td style={style1}>
              Hopkins University, was conferred the degree of
            </td>
            <td />
          </tr>
          <tr>
            <td colSpan="3">{this.renderVoid("0.4cm")}</td>
          </tr>
          <tr>
            <td colSpan="3">{this.renderDegreeTitle(degreeData)}</td>
          </tr>
          <tr>
            <td colSpan="3">{this.renderVoid("0.4cm")}</td>
          </tr>
          <tr>
            <td colSpan="3" className={cls("cert-content-unjustified")}>
              on
            </td>
          </tr>
          <tr>
            <td colSpan="3">{this.renderVoid("0.6cm")}</td>
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
    if (this.dataSource.additionalData.images) {
      sig1 = renderImage(this.dataSource.additionalData.images.TRUSTEES);
      sig2 = renderImage(this.dataSource.additionalData.images.PRESIDENT);
    }

    const html = [];
    html.push(
      <table className={cls("cert-sig")}>
        <tbody>
          <tr>
            <td width="60%" rowSpan="4" style={{ textAlign: "center" }}>
              {this.renderSeal()}
            </td>
            <td>{sig1}</td>
            <td width="12%" />
          </tr>
          <tr>
            <td>Chair, Board of Trustees</td>
          </tr>
          <tr>
            <td>{sig2}</td>
          </tr>
          <tr>
            <td>President</td>
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
            <div style={{ border: "0px solid" }}>
              {this.renderVoid("1.6cm")}
              <table className={cls("cert-header-table")}>
                <tbody>
                  <tr>
                    <td width="10%" />
                    <td width="80%">{this.renderTitle()}</td>
                    <td width="10%" />
                  </tr>
                  <tr>
                    <td>{this.renderVoid("0.6cm")}</td>
                  </tr>
                  <tr>
                    <td />
                    <td>{this.renderLogo()}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
              {this.renderVoid("0.6cm")}
              <div style={{ textAlign: "center" }}>{this.renderContent()}</div>
              {this.renderVoid("1cm")}
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
