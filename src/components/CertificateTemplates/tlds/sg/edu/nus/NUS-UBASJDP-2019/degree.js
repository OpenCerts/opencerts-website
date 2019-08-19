/* eslint-disable class-methods-use-this */
import React from "react";
import PropTypes from "prop-types";
import {
  DegreeScrollDataFeeder,
  Degree
} from "../common/degreeScrollFramework";

// data feeder
const getDataFeeder = dataSource => {
  // data feeder
  const dataFeeder = new DegreeScrollDataFeeder();
  // logo is default
  dataFeeder.studentName = dataSource.recipient.name.toUpperCase();
  dataFeeder.postNameText =
    "having completed the requirements\nfor the Joint Programme of the National\nUniversity of Singapore and the University\nof Basel was conferred the degree of";
  dataFeeder.degreeCode = dataSource.additionalData.degreeScroll[0].degreeCode;
  dataFeeder.degreeTitle =
    dataSource.additionalData.degreeScroll[0].degreeTitle;
  dataFeeder.honours = dataSource.additionalData.degreeScroll[0].honours;
  dataFeeder.major = dataSource.additionalData.degreeScroll[0].major;
  dataFeeder.conferDate =
    dataSource.additionalData.degreeScroll[0].dateConferred;
  if (dataSource.additionalData.images) {
    dataFeeder.useDefaultSignature(
      dataSource.additionalData.images.TRUSTEES,
      dataSource.additionalData.images.PRESIDENT
    );
    dataFeeder.spaceBeforeSig = "2.5cm";
  }
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
