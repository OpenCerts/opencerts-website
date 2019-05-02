import PropTypes from "prop-types";

import {
  EXPLANATORY_FONT_SIZE_13,
  EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID,
  EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TR,
  EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TD,
  EXPLANATORY_CONTENT
} from "./style";

import { COMMAN_EXPL_1, COMMAN_EXPL_2, COMMAN_EXPL_3 } from "./explnotes";

export const RENDEREXPLANATORYNOTES_N = () => (
  <div className="row">
    <div className="col-md-12">
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          1
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          The Singapore Examinations and Assessment Board is authorised by the
          Republic of Singapore to manage national examinations in Singapore.
          The Board, together with the Ministry of Education (MOE), Singapore
          and the University of Cambridge International Examinations (CIE) are
          joint examining authorities for the General Certificate of Education
          Normal Level (GCE N-Level) Examination.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      {COMMAN_EXPL_1()}
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          3
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          The pass grades for GCE N-Level subjects are shown by numerical grades
          1 to 5 (Grade 1 is the highest and Grade 5 the lowest).
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          4
        </div>
        {COMMAN_EXPL_3()}
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          5
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          As of 1992, the following Language subjects have been renamed:
          <br />
          <br />
          <table align="center" style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID}>
            <tbody>
              <tr style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TR}>
                <td
                  align="center"
                  style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TD}
                >
                  Subject
                </td>
                <td
                  align="center"
                  style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TD}
                >
                  New Name
                </td>
              </tr>
              <tr style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TR}>
                <td style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TD}>
                  Chinese as a Second Language
                </td>
                <td style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TD}>
                  Chinese
                </td>
              </tr>
              <tr style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TR}>
                <td style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TD}>
                  Malay as a Second Language
                </td>
                <td style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TD}>Malay</td>
              </tr>
              <tr style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TR}>
                <td style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TD}>
                  Tamil as a Second Language
                </td>
                <td style={EXPLANATORY_TABLE_WIDTH70_CENTER_SOLID_TD}>Tamil</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          6
        </div>
        {COMMAN_EXPL_2()}
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          7
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          Abbreviations used in this Statement:
          <br />
          DIST
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Distinction
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          8
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          This document is issued on condition of your strict compliance with
          the Examination Instructions and Regulations. You must comply with any
          direction by the Singapore Examinations and Assessment Board (SEAB) to
          return this document to SEAB.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          9
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          For further information or clarification on the GCE N-Level, please
          visit the website of the Singapore Examinations and Assessment Board
          (http://www.seab.gov.sg).
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
    </div>
  </div>
);

RENDEREXPLANATORYNOTES_N.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default () => RENDEREXPLANATORYNOTES_N;
