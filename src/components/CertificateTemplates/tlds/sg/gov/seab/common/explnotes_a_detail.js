import PropTypes from "prop-types";

import {
  EXPLANATORY_CONTENT,
  EXPLANATORY_TABLE_WIDTH70_LEFT,
  EXPLANATORY_TABLE_WIDTH70_LEFT_TR,
  EXPLANATORY_TABLE_WIDTH70_LEFT_TD,
  EXPLANATORY_TABLE_WIDTH100_LEFT,
  EXPLANATORY_FONT_SIZE_13
} from "./style";

import {
  COMMAN_EXPL_1,
  COMMAN_EXPL_4,
  COMMAN_EXPL_5,
  COMMAN_EXPL_6
} from "./explnotes";

export const RENDEREXPLANATORYNOTES_A = () => (
  <div className="row">
    <div className="col-md-12">
      {COMMAN_EXPL_5()}
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
          The pass grades for GCE A-Level subjects are shown in alphabetical
          grades: A, B, C, D, and E (Grade A is the highest and Grade E the
          lowest). Grade O indicates that a candidate has failed to attain a
          pass at GCE A-Level but is judged to have reached Grade 6 at GCE
          Ordinary Level (GCE O-Level). Grade F is a fail grade.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          4
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          Candidates who sit GCE A-Level subject with Special Papers will have
          their Special Paper results shown by numerical grade 1 (Distinction),
          2 (Merit) or U (Unclassified).
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      {COMMAN_EXPL_6()}
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          6
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          As of 1992, the following Language subjects have been renamed:
          <br />
          <br />
          <table align="center" style={EXPLANATORY_TABLE_WIDTH70_LEFT}>
            <tbody>
              <tr style={EXPLANATORY_TABLE_WIDTH70_LEFT_TR}>
                <td align="center" style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>
                  Subject
                </td>
                <td align="center" style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>
                  New Name
                </td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>
                  &nbsp;Chinese as a Second Language
                </td>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>&nbsp;Chinese</td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>
                  &nbsp;Malay as a Second Language
                </td>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>&nbsp;Malay</td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>
                  &nbsp;Tamil as a Second Language
                </td>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>&nbsp;Tamil</td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>&nbsp;Chinese</td>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>
                  &nbsp;Higher Chinese
                </td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>&nbsp;Malay</td>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>
                  &nbsp;Higher Malay
                </td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>&nbsp;Tamil</td>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>
                  &nbsp;Higher Tamil
                </td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>
                  &nbsp;Chinese with Higher Chinese
                </td>
                <td style={EXPLANATORY_TABLE_WIDTH70_LEFT_TD}>
                  &nbsp;Higher Chinese with Special Paper
                </td>
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
          7
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          The following subjects appear on the certificate in their abbreviated
          forms:
          <br />
          <table align="center" style={EXPLANATORY_TABLE_WIDTH100_LEFT}>
            <tbody>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td>Subject</td>
                <td>Abbreviated Form</td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td>
                  <b>ARABIC LANGUAGE AND LITERATURE</b>
                </td>
                <td>
                  <b>ARABIC LANG AND LIT</b>
                </td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td>
                  <b>ECONOMICS AND PUBLIC AFFAIRS</b>
                </td>
                <td>
                  <b>ECON AND PUBLIC AFFAIRS</b>
                </td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td>
                  <b>ENGLISH AS A SECOND LANGUAGE</b>
                </td>
                <td>
                  <b>ENGLISH AS 2ND LANGUAGE</b>
                </td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td>
                  <b>GEOMETRICAL AND MECHANICAL DRAWING</b>
                </td>
                <td>
                  <b>GEOM AND MECH DRAWING</b>
                </td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td>
                  <b>HISTORY OF CHINESE LITERATURE</b>
                </td>
                <td>
                  <b>HISTORY OF CHINESE LIT</b>
                </td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td>
                  <b>STRUCTURE AND WORKING OF BRITISH</b>
                </td>
                <td>
                  <b>STRUCTURE & WORKING OF BRITISH GOVT.</b>
                </td>
              </tr>
              <tr style={EXPLANATORY_FONT_SIZE_13}>
                <td>
                  <b>GOVERNMENT</b>
                </td>
                <td />
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
          8
        </div>
        {COMMAN_EXPL_4()}
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          9
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          For further information or clarification on the GCE A-Level, please
          visit the website of the Singapore Examinations and Assessment Board
          (http://www.seab.gov.sg).
        </div>
      </div>
    </div>
  </div>
);

RENDEREXPLANATORYNOTES_A.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default () => RENDEREXPLANATORYNOTES_A;
