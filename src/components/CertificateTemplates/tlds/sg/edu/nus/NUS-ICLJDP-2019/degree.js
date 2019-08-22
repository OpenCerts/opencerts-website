/* eslint-disable class-methods-use-this */
import React from "react";
import PropTypes from "prop-types";
import {
  DegreeScrollDataFeeder,
  Degree,
  renderSmallNUSLogo
} from "../common/degreeScrollFramework";
import {
  renderNUSSeal,
  renderImage,
  renderVoid,
  ICL_LOGO,
  ICL_SEAL
} from "../common";

// custom logos
const renderLogos = () => {
  const styleLogo = {
    display: "block",
    marginLeft: "auto",
    width: "10.5cm"
  };
  return (
    <table width="100%">
      <tbody>
        <tr>
          <td>{renderVoid("1.27cm")}</td>
        </tr>
        <tr>
          <td width="25%">{renderSmallNUSLogo()}</td>
          <td>
            <img src={ICL_LOGO} style={styleLogo} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// custom name and text
const renderNameAndText = name => {
  const style1 = {
    display: "block",
    fontSize: "16pt",
    lineHeight: "24pt",
    fontFamily: "'Times New Roman', Serif",
    fontWeight: "bold",
    textAlign: "center"
  };
  const style2 = {
    display: "block",
    fontSize: "23pt",
    fontFamily: "'Times New Roman', Serif",
    fontStyle: "italic",
    fontWeight: "bold",
    textAlign: "center",
    padding: "10px 0"
  };
  return (
    <table width="100%">
      <tbody>
        <tr>
          <td>
            <div style={style1}>
              National University of Singapore
              <br />
              And
              <br />
              Imperial College London
            </div>
          </td>
        </tr>
        <tr>
          <td>
            {renderVoid("0.2cm")}
            <div style={style1}>have conferred on</div>
          </td>
        </tr>
        <tr>
          <td>
            <div style={style2}>{name}</div>
          </td>
        </tr>
        <tr>
          <td>
            <div style={style1}>the degree of</div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// custom signatures and seals
const renderSigs = dataSource => {
  const styleSig = {
    display: "block",
    width: "80%",
    fontSize: "12pt",
    fontFamily: "'Times New Roman', Serif",
    fontStyle: "italic",
    textAlign: "left"
  };
  const styleSeal = {
    display: "float",
    width: "4.95cm",
    marginLeft: "40px"
  };
  let sig1;
  let sig2;
  let sig3;
  let sig4;
  if (dataSource.additionalData.images) {
    sig1 = renderImage(dataSource.additionalData.images.TRUSTEES, 240, 90);
    sig2 = renderImage(dataSource.additionalData.images.ICL_PRESIDENT, 240, 90);
    sig3 = renderImage(dataSource.additionalData.images.PRESIDENT, 240, 90);
    sig4 = renderImage(dataSource.additionalData.images.ICL_REGISTRAR, 240, 90);
  }
  const html = (
    <table width="100%">
      <tbody>
        <tr>
          <td align="center" width="50%">
            {/* signature 1 - image */}
            <div style={styleSig}>&nbsp;&nbsp; {sig1}</div>
          </td>
          <td align="center" width="50%">
            {/* signature 2 - image */}
            <div style={styleSig}>&nbsp;&nbsp; {sig2}</div>
          </td>
        </tr>
        <tr>
          <td align="center">
            {/* signature 1 - text */}
            <div style={styleSig}>
              &nbsp;&nbsp;Chair, Board of Trustees
              <br />
              &nbsp;&nbsp;National University of Singapore
            </div>
          </td>
          <td align="center">
            {/* signature 2 - text */}
            <div style={styleSig}>
              &nbsp;&nbsp; President & Rector
              <br />
              &nbsp;&nbsp; Imperial College London
            </div>
          </td>
        </tr>
        <tr>
          <td align="center">
            {/* signature 3 - image */}
            <div style={styleSig}>
              <br />
              &nbsp;&nbsp;{sig3}
            </div>
          </td>
          <td align="center">
            {/* signature 4 - image */}
            <div style={styleSig}>
              &nbsp;&nbsp; {sig4}
              <br />
            </div>
          </td>
        </tr>
        <td align="center">
          {/* signature 3 - text */}
          <div style={styleSig}>
            &nbsp;&nbsp; President
            <br />
            &nbsp;&nbsp; National University of Singapore
          </div>
        </td>
        <td align="center">
          {/* signature 4 - text */}
          <div style={styleSig}>
            &nbsp;&nbsp; Academic Registrar
            <br />
            &nbsp;&nbsp; Imperial College London
          </div>
        </td>
        <tr />
        <tr>
          <td>{renderNUSSeal(null, styleSeal)}</td>
          <td>
            <img src={ICL_SEAL} style={styleSeal} />
          </td>
        </tr>
      </tbody>
    </table>
  );
  return html;
};

// data feeder
const getDataFeeder = dataSource => {
  // data feeder
  const dataFeeder = new DegreeScrollDataFeeder();
  dataFeeder.logo = renderLogos();
  dataFeeder.nameAndText = renderNameAndText(
    dataSource.recipient.name.toUpperCase()
  );
  dataFeeder.degreeCode = dataSource.additionalData.degreeScroll[0].degreeCode;
  dataFeeder.degreeTitle =
    dataSource.additionalData.degreeScroll[0].degreeTitle;
  dataFeeder.honours = dataSource.additionalData.degreeScroll[0].honours;
  dataFeeder.major = dataSource.additionalData.degreeScroll[0].major;
  dataFeeder.heightTitleDisplay = "2cm";
  dataFeeder.conferDate =
    dataSource.additionalData.degreeScroll[0].dateConferred;
  dataFeeder.spaceBeforeSig = ".5cm";
  dataFeeder.sig = renderSigs(dataSource);
  return dataFeeder;
};

const Template = ({ certificate }) => {
  // JSON data source
  const jsonData = certificate;

  // data feeder
  const dataFeeder = getDataFeeder(jsonData);

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
      <Degree dataFeeder={dataFeeder} />
    </div>
  );
  return html;
};
export default Template;
Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
