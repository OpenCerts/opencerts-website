/* eslint-disable class-methods-use-this */
import React from "react";
import PropTypes from "prop-types";
import {
  DegreeScrollDataFeeder,
  Degree,
  renderSmallNUSLogo
} from "../common/degreeScrollFramework";
import { renderNUSSeal, renderImage, renderVoid, DTU_LOGO } from "../common";

// custom logos
const renderLogos = () => {
  const styleHeader = {
    display: "block",
    fontSize: "10pt",
    textAlign: "center",
    fontFamily: "'Times New Roman', Serif",
    fontWeight: "bold"
  };
  const styleLogo = {
    display: "block",
    width: "4cm",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center"
  };
  return (
    <table width="100%">
      <tbody>
        <tr>
          <td>{renderVoid("1.27cm")}</td>
        </tr>
        <tr>
          <td width="50%">{renderSmallNUSLogo()}</td>
          <td width="50%">
            <div style={styleHeader}>
              TECHNICAL UNVERSITY
              <br />
              OF DENMARK
            </div>
            <img src={DTU_LOGO} style={styleLogo} />
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
    sig2 = renderImage(dataSource.additionalData.images.DTU_RECTOR, 240, 90);
    sig3 = renderImage(dataSource.additionalData.images.PRESIDENT, 240, 90);
    sig4 = renderImage(dataSource.additionalData.images.DTU_DEAN, 240, 90);
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
              &nbsp;&nbsp; Rector
              <br />
              &nbsp;&nbsp; Technical University of Denmark
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
            &nbsp;&nbsp; Dean of Research
            <br />
            &nbsp;&nbsp; Technical University of Denmark
          </div>
        </td>
        <tr />
        <tr>
          <td>{renderNUSSeal(null, styleSeal)}</td>
          <td>{/* DTU_SEAL here (if any) */}</td>
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
  dataFeeder.studentName = dataSource.recipient.name.toUpperCase();
  dataFeeder.namePadding = "20px 0";
  dataFeeder.postNameText =
    "having completed the requirements for the\nJoint Degree Programme of the National\nUniversity of Singapore and the Technical\nUniversity of Denmark was conferred the degree of";
  dataFeeder.degreeCode = dataSource.additionalData.degreeScroll[0].degreeCode;
  dataFeeder.degreeTitle =
    dataSource.additionalData.degreeScroll[0].degreeTitle;
  dataFeeder.honours = dataSource.additionalData.degreeScroll[0].honours;
  dataFeeder.major = dataSource.additionalData.degreeScroll[0].major;
  dataFeeder.heightTitleDisplay = "2cm";
  dataFeeder.conferDate =
    dataSource.additionalData.degreeScroll[0].dateConferred;
  dataFeeder.spaceBeforeSig = "1cm";
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
