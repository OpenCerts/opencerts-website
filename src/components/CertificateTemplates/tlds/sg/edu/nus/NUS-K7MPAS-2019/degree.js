/* eslint-disable class-methods-use-this */
import React from "react";
import PropTypes from "prop-types";
import {
  DegreeScrollDataFeeder,
  Degree,
  renderSmallNUSLogo
} from "../common/degreeScrollFramework";
import { renderNUSSeal, renderImage, renderVoid, MPAS_LOGO } from "../common";

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
    width: "3.4cm",
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
          <td width="45%">{renderSmallNUSLogo(1)}</td>
          <td width="55%">
            <div style={styleHeader}>
              MARITIME & PORT
              <br />
              AUTHORITY OF SINGAPORE
            </div>
            <img src={MPAS_LOGO} style={styleLogo} />
          </td>
        </tr>
        <tr>
          <td>{renderVoid("1.27cm")}</td>
        </tr>
      </tbody>
    </table>
  );
};

// custom signatures and seals
const renderSigs = dataSource => {
  const styleSig = {
    display: "block",
    width: "100%"
  };
  const styleTitle = {
    display: "block",
    width: "100%",
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
  if (dataSource.additionalData.images) {
    sig1 = renderImage(dataSource.additionalData.images.TRUSTEES, 240, 90);
    sig2 = renderImage(dataSource.additionalData.images.PRESIDENT, 240, 90);
    sig3 = renderImage(dataSource.additionalData.images.MPAS_CEO, 240, 90);
  }
  const html = (
    <table width="100%">
      <tbody>
        <tr>
          <td align="center" width="30%">
            {/* signature 1 - image */}
            <div style={styleSig}>{sig1}</div>
          </td>
          <td align="center" width="32%">
            {/* signature 2 - image */}
            <div style={styleSig}>{sig2}</div>
          </td>
          <td align="center" width="38%">
            {/* signature 3 - image */}
            <div style={styleSig}>{sig3}</div>
          </td>
        </tr>
        <tr>
          <td align="center">
            {/* signature 1 - text */}
            <div style={styleTitle}>
              Chair, Board of Trustees
              <br />
              National University of Singapore
            </div>
          </td>
          <td align="center">
            {/* signature 2 - text */}
            <div style={styleTitle}>
              President
              <br />
              National University of Singapore
            </div>
          </td>
          <td align="center">
            {/* signature 3 - text */}
            <div style={styleTitle}>
              Chief Executive
              <br />
              Maritime & Port Authority of Singapore
            </div>
          </td>
        </tr>
        <tr>
          <td>{renderNUSSeal(null, styleSeal)}</td>
          <td />
          <td>{/* MPAS_SEAL here (if any) */}</td>
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
    "having completed the requirements prescribed\nfor the Joint Programme of the National\nUniversity of Singapore and the Maritime & Port\nManagement of Singapore was awarded the";
  dataFeeder.degreeCode = dataSource.additionalData.degreeScroll[0].degreeCode;
  dataFeeder.degreeTitle =
    dataSource.additionalData.degreeScroll[0].degreeTitle;
  dataFeeder.honours = dataSource.additionalData.degreeScroll[0].honours;
  dataFeeder.major = dataSource.additionalData.degreeScroll[0].major;
  dataFeeder.heightTitleDisplay = "2cm";
  dataFeeder.conferDate =
    dataSource.additionalData.degreeScroll[0].dateConferred;
  dataFeeder.spaceBeforeSig = "1.5cm";
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
