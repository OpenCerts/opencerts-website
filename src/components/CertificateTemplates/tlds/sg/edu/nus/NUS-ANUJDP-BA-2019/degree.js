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
  ANU_LOGO,
  ANU_SEAL
} from "../common";

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
    display: "float",
    width: "4.5cm"
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
            <div style={styleHeader}>
              THE AUSTRALIAN NATIONAL
              <br />
              UNIVERSITY
            </div>
            <img src={ANU_LOGO} style={styleLogo} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

// custom pre-name text
const constructPreNameText = degreeTitle => {
  if (degreeTitle.toUpperCase() === "Bachelor of Arts".toUpperCase())
    return "This is to certify that following the completion of\nthe Bachelor of Philosophy (Honours) / Bachelor \nof Arts (Honours) Joint Degree Programme\nof The Australian National University \nand The National University of Singapore";
  if (degreeTitle.toUpperCase() === "Bachelor of Science".toUpperCase())
    return "This is to certify that following completion of\nthe Bachelor of Science (Honours) / Bachelor of\nPhilosophy (Honours) Joint Degree Programme\nof the National University of Singapore\nand The Australian National University";
  return "This is to certify that";
};

// custom post-name text
const constructPostNameText = degreeTitle => {
  if (
    degreeTitle.toUpperCase() === "Bachelor of Arts".toUpperCase() ||
    degreeTitle.toUpperCase() === "Bachelor of Science".toUpperCase()
  )
    return "was conferred the degree of";
  return "having completed the requirements for the\nJoint Degree Programme of the National\nUniversity of Singapore and The Australian\nNational University was conferred the degree of";
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
  const styleSeal = {
    display: "float",
    width: "4.95cm"
  };
  let sig1;
  let sig2;
  let sig3;
  let sig4;
  if (dataSource.additionalData.images) {
    sig1 = renderImage(dataSource.additionalData.images.TRUSTEES, 240, 90);
    sig2 = renderImage(dataSource.additionalData.images.PRESIDENT, 240, 90);
    sig3 = renderImage(
      dataSource.additionalData.images.ANU_CHANCELLOR,
      240,
      90
    );
    sig4 = renderImage(
      dataSource.additionalData.images.ANU_VICE_CHANCELLOR,
      240,
      90
    );
  }
  const html = (
    <table style={styleSig}>
      <tbody>
        <tr>
          <td width="5%" />
          <td width="55%">{sig1}</td>
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
            Chancellor
            <br />
            The Australian National University
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
            Vice-Chancellor
            <br />
            The Australian National University
          </td>
        </tr>
        <tr>
          <td>{renderVoid("0.3cm")}</td>
        </tr>
        <tr>
          <td />
          <td>{renderNUSSeal()}</td>
          <td>
            <img src={ANU_SEAL} style={styleSeal} />;
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
  dataFeeder.preNameText = constructPreNameText(
    dataSource.additionalData.degreeScroll[0].degreeTitle
  );
  dataFeeder.postNameText = constructPostNameText(
    dataSource.additionalData.degreeScroll[0].degreeTitle
  );
  dataFeeder.degreeCode = dataSource.additionalData.degreeScroll[0].degreeCode;
  dataFeeder.degreeTitle =
    dataSource.additionalData.degreeScroll[0].degreeTitle;
  dataFeeder.honours = dataSource.additionalData.degreeScroll[0].honours;
  if (dataSource.additionalData.degreeScroll[0].major)
    dataFeeder.major = dataSource.additionalData.degreeScroll[0].major.replace(
      /English Lit /gi,
      "English Literature "
    );
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
