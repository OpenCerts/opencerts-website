import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  dateToWords,
  capitalizedText,
  sassClassNames,
  renderImage,
  renderVoid,
  NUS_LOGO,
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

  // render NUS name
  renderNUSTitle = () => (
    <div className={cls("cert-header-name")}>
      NATIONAL UNIVERSITY
      <br />
      OF SINGAPORE
    </div>
  );

  // render logos
  renderNUSLogo = () => <img src={NUS_LOGO} className={cls("cert-logo-nus")} />;

  renderJHULogo = () => <img src={JHU_LOGO} className={cls("cert-logo-jhu")} />;

  // render degree title
  renderDegreeTitle = degreeData => {
    const degreeTitleCase = capitalizedText(
      degreeData.degreeTitle.toLowerCase()
    );

    const html = (
      <div className={cls("cert-degree-title")}>{degreeTitleCase}</div>
    );
    return html;
  };

  // render degree major
  renderDegreeMajor = degreeData => {
    const degreeMajor = capitalizedText(degreeData.major.toLowerCase());

    const html = <div className={cls("cert-degree-major")}>{degreeMajor}</div>;
    return html;
  };

  // render starting phrase before name
  renderContent() {
    const degreeData = this.dataSource.additionalData.degreeData[0];
    const words = dateToWords(degreeData.dateConferred);
    const dateConferred = `${words.monthDay}, ${words.year}`;
    const html = (
      <table className={cls("cert-content-table")}>
        <tbody>
          <tr>
            <td>
              The Johns Hopkins University and National University of Singapore
            </td>
          </tr>
          <tr>
            <td>Upon the recommendation of the Faculties of the</td>
          </tr>
          <tr>
            <td>
              Peabody Conservatory of Music and Yong Siew Toh Conservatory of
              Music
            </td>
          </tr>
          <tr>
            <td>have conferred upon</td>
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
            <td>{renderVoid("0.3cm")}</td>
          </tr>
          <tr>
            <td>the degree of</td>
          </tr>
          <tr>
            <td>{renderVoid("0.2cm")}</td>
          </tr>
          <tr>
            <td>{this.renderDegreeTitle(degreeData)}</td>
          </tr>
          <tr>
            <td>{this.renderDegreeMajor(degreeData)}</td>
          </tr>
          <tr>
            <td>{renderVoid("0.2cm")}</td>
          </tr>
          <tr>
            <td>
              with all the rights, honors and privileges appertaining thereto.
            </td>
          </tr>
          <tr>
            <td>
              Given under the seats of the Johns Hopkins University and National
              University of Singapore
            </td>
          </tr>
          <tr>
            <td>at Baltimore, Maryland on {dateConferred}.</td>
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
    let sig5;
    if (this.dataSource.additionalData.images) {
      sig1 = renderImage(this.dataSource.additionalData.images.TRUSTEES);
      sig2 = renderImage(this.dataSource.additionalData.images.PRESIDENT);
      sig3 = renderImage(this.dataSource.additionalData.images.TRUSTEESANU);
      sig4 = renderImage(this.dataSource.additionalData.images.PRESIDENTANU);
      sig5 = renderImage(this.dataSource.additionalData.images.TRUSTEES);
    }

    const html = (
      <table className={cls("cert-sig")}>
        <tbody>
          <tr>
            <td width="20%" />
            <td width="25%">
              <table width="100%">
                <tbody>
                  <tr>
                    <td>{sig1}</td>
                  </tr>
                  <tr>
                    <td className={cls("cert-sig-line")}>Dean</td>
                  </tr>
                  <tr>
                    <td>{sig2}</td>
                  </tr>
                  <tr>
                    <td className={cls("cert-sig-line")}>President</td>
                  </tr>
                  <tr>
                    <td>{sig3}</td>
                  </tr>
                  <tr>
                    <td className={cls("cert-sig-line")}>
                      Chair of the Board of Trustees
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td width="10%" />
            <td width="25%">
              <table width="100%">
                <tbody>
                  <tr>
                    <td>{sig4}</td>
                  </tr>
                  <tr>
                    <td className={cls("cert-sig-line")}>
                      Chair, Board of Trustees
                    </td>
                  </tr>
                  <tr>
                    <td>{sig5}</td>
                  </tr>
                  <tr>
                    <td className={cls("cert-sig-line")}>President</td>
                  </tr>
                </tbody>
              </table>
            </td>
            <td width="20%" />
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
        <div className={cls("jhu-custom")}>
          <article>
            <div style={{ border: "0px solid" }}>
              {renderVoid("3cm")}
              <table className={cls("cert-header-table")}>
                <tbody>
                  <tr>
                    <td width="5%" />
                    <td width="45%">The Johns Hopkins University</td>
                    <td width="35%">National University of Singapore</td>
                    <td width="15%" />
                  </tr>
                  <tr>
                    <td>{renderVoid("0.5cm")}</td>
                  </tr>
                  <tr>
                    <td />
                    <td rowSpan="3">{this.renderJHULogo()}</td>
                    <td>{this.renderNUSTitle()}</td>
                    <td />
                  </tr>
                  <tr>
                    <td />
                    <td>{this.renderNUSLogo()}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
              {renderVoid("0.2cm")}
              <div style={{ textAlign: "center" }}>{this.renderContent()}</div>
              {renderVoid("0.4cm")}
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
