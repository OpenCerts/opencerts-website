import PropTypes from "prop-types";

import {
  EXPLANATORY_CONTENT,
  EXPLANATORY_TABLE_WIDTH70_CENTER,
  EXPLANATORY_FONT_SIZE_13,
  EXPLANATORY_MARGIN_LEFT
} from "./style";

import { COMMAN_EXPL_1, COMMAN_EXPL_2 } from "./explnotes";

export const RENDEREXPLANATORYNOTES_O = () => (
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
          Ordinary Level (GCE O-Level) Examination.
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
          Where a GCE O-Level subject is not MOE/CIE developed, the examining
          agency for the subject is printed in brackets below the subject title.
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
          The grades for GCE O-Level subjects are shown by the numerical grades
          1 to 9 (Grade 1 is the highest and Grade 9 is the lowest). The
          alphabetical equivalent of the numerical grades are as follows:
          <br />
          <br />
          <table
            border="1"
            align="center"
            style={EXPLANATORY_TABLE_WIDTH70_CENTER}
          >
            <tbody>
              <tr>
                <td colSpan="2">GRADE</td>
                <td rowSpan="2">REMARKS</td>
              </tr>
              <tr>
                <td>Numerical</td>
                <td>Alphanetical</td>
              </tr>
              <tr>
                <td>1,2</td>
                <td>A</td>
                <td rowSpan="3">GCE O-Level Pass</td>
              </tr>
              <tr>
                <td>3,4</td>
                <td>B</td>
              </tr>
              <tr>
                <td>5,6</td>
                <td>C</td>
              </tr>
              <tr>
                <td>7</td>
                <td>D</td>
                <td rowSpan="2">Below GCE O-Level Pass</td>
              </tr>
              <tr>
                <td>8</td>
                <td>E</td>
              </tr>
              <tr>
                <td>9</td>
                <td>No Alphabetical Grades</td>
                <td />
              </tr>
            </tbody>
          </table>
          <br />
          [GCE O-Level results obtained in and before 1975 are shown in
          numerical grades only.]
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          5
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          Performance in the Oral/Aural Examinations in the Mother Tongue
          subjects is indicated as Distinction, Merit, Pass or Ungraded.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          6
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          Mother Tongue B subjects (Chinese B / Malay B / Tamil B) place greater
          emphasis on practical communication skills, especially aural and oral
          skills. The grades awarded for Mother Tongue B subjects are Merit,
          Pass or Ungraded. Mother Tongue B is not an O-Level subject.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          7
        </div>
        {COMMAN_EXPL_2()}
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          8
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          Abbreviation used in this Statement:
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
          9
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
          10
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          <div style={EXPLANATORY_MARGIN_LEFT}>
            For further information or clarification on the GCE O-Level, please
            visit the website of the Singapore Examinations and Assessment Board
            (http://www.seab.gov.sg).
          </div>
        </div>
      </div>
    </div>
  </div>
);

RENDEREXPLANATORYNOTES_O.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default () => RENDEREXPLANATORYNOTES_O;
