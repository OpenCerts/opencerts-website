/* eslint-disable class-methods-use-this */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  DegreeScrollDataFeeder,
  Degree
} from "../common/degreeScrollFramework";
import { renderVoid, renderNUSLogo, NUS_CHN_NAME } from "../common";

// custom NUS title
const renderCustomNUSTitle = () => {
  const styleEnglish = {
    display: "block",
    fontSize: "26pt",
    lineHeight: "30pt",
    textAlign: "center",
    fontFamily: "'Times New Roman', Serif",
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto"
  };
  const styleChinese = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "320px"
  };
  return (
    <div style={styleEnglish}>
      NATIONAL UNIVERSITY
      <br />
      OF SINGAPORE
      <img src={NUS_CHN_NAME} style={styleChinese} />
    </div>
  );
};

// custom logo
const renderLogo = () => (
  <Fragment>
    {renderVoid("2.13cm")}
    {renderCustomNUSTitle()}
    {renderVoid("0.59cm")}
    {renderNUSLogo()}
  </Fragment>
);

// data feeder
const getDataFeeder = dataSource => {
  // data feeder
  const dataFeeder = new DegreeScrollDataFeeder();
  dataFeeder.logo = renderLogo();
  dataFeeder.studentName = dataSource.recipient.name.toUpperCase();
  dataFeeder.namePadding = "20px 0";
  // text is default
  dataFeeder.degreeCode = dataSource.additionalData.degreeScroll[0].degreeCode;
  // this template (K4MBACN) is only for MBA conducted in Chinese, hence directly allocate the literal degree title
  dataFeeder.degreeTitle =
    "Master of Business Administration (Conducted in Chinese)";
  dataFeeder.honours = dataSource.additionalData.degreeScroll[0].honours;
  dataFeeder.major = dataSource.additionalData.degreeScroll[0].major;
  dataFeeder.conferDate =
    dataSource.additionalData.degreeScroll[0].dateConferred;
  if (dataSource.additionalData.images) {
    dataFeeder.useDefaultSignature(
      dataSource.additionalData.images.TRUSTEES,
      dataSource.additionalData.images.PRESIDENT
    );
  }
  dataFeeder.spaceBeforeSig = "2cm";
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
