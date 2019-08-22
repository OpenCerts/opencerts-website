/* eslint-disable class-methods-use-this */
import React from "react";
import PropTypes from "prop-types";
import {
  DegreeScrollDataFeeder,
  Degree,
  renderSmallNUSLogo
} from "../common/degreeScrollFramework";
import { renderNUSSeal, renderImage, renderVoid, JHU_LOGO } from "../common";

// custom logos
const renderLogos = () => {
  const styleLogo = {
    display: "float",
    width: "3.2cm"
  };
  return (
    <table width="100%">
      <tbody>
        <tr>
          <td>{renderVoid("1.2cm")}</td>
        </tr>
        <tr>
          <td width="50%">{renderSmallNUSLogo()}</td>
          <td width="50%" align="center">
            <img src={JHU_LOGO} style={styleLogo} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// custom signatures and seals
const renderSigs = dataSource => {
  const styleSig = {
    display: "float",
    width: "100%",
    fontSize: "12pt",
    fontFamily: "'Century Schoolbook', Georgia, serif",
    fontStyle: "italic",
    textAlign: "left"
  };
  let sig1;
  let sig2;
  let sig3;
  let sig4;
  if (dataSource.additionalData.images) {
    sig1 = renderImage(dataSource.additionalData.images.TRUSTEES, 240, 75);
    sig2 = renderImage(dataSource.additionalData.images.PRESIDENT, 240, 75);
    sig3 = renderImage(dataSource.additionalData.images.JHU_TRUSTEES, 240, 75);
    sig4 = renderImage(dataSource.additionalData.images.JHU_PRESIDENT, 240, 75);
  }
  const html = (
    <table style={styleSig}>
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

// data feeder
const getDataFeeder = dataSource => {
  // data feeder
  const dataFeeder = new DegreeScrollDataFeeder();
  dataFeeder.logo = renderLogos();
  dataFeeder.studentName = dataSource.recipient.name.toUpperCase();
  dataFeeder.namePadding = "10px 0";
  dataFeeder.postNameText =
    "having fulfilled the requirements for\nthe Joint Degree Programme prescribed by\nthe Yong Siew Toh Conservatory of Music,\nNational University of Singapore, and\nThe Peabody Conservatory of Music of\nThe Johns Hopkins University,\nwas conferred the degree of";
  dataFeeder.degreeCode = dataSource.additionalData.degreeScroll[0].degreeCode;
  dataFeeder.degreeTitle =
    dataSource.additionalData.degreeScroll[0].degreeTitle;
  dataFeeder.honours = dataSource.additionalData.degreeScroll[0].honours;
  dataFeeder.major = dataSource.additionalData.degreeScroll[0].major;
  dataFeeder.breakBeforeMajor = false;
  dataFeeder.heightTitleDisplay = "2cm";
  dataFeeder.conferDate =
    dataSource.additionalData.degreeScroll[0].dateConferred;
  dataFeeder.spaceBeforeSig = null; // no space
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
