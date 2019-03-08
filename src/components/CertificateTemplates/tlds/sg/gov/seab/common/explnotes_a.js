import {
  EXPLANATORY_CONTENT,
  EXPLANATORY_TITLE,
  EXPLANATORY_PAGE_SIZE,
  EXPLANATORY_TABLE_WIDTH70_CENTER,
  EXPLANATORY_TABLE_WIDTH70_LEFT,
  EXPLANATORY_TABLE_WIDTH70_LEFT_TR,
  EXPLANATORY_TABLE_WIDTH70_LEFT_TD,
  EXPLANATORY_TABLE_WIDTH100_LEFT,
  EXPLANATORY_FONT_SIZE_13
} from "../common";

export const renderExplonataryNotes = () => (
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
          Advanced Level (GCE A-Level) Examination.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          2
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          The NRIC / Foreign Identification No. refers to the National
          Registration Identity Card (NRIC) number of Singapore citizens and
          Permanent Residents. For non-Singapore citizens, the NRIC / Foreign
          Identification No. refers to the number on their official
          identification document, such as a passport.
        </div>
      </div>
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
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          5
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          Results in AO-Level are indicated by grades 1 to 9 (Grade 1 is the
          highest and Grade 9 the lowest). The alphabetical equivalence of the
          numerical grades is as follows:
          <br />
          <br />
          <table
            border="1"
            align="center"
            style={EXPLANATORY_TABLE_WIDTH70_CENTER}
          >
            <tr style={EXPLANATORY_FONT_SIZE_13}>
              <td colSpan="2">GRADE</td>
              <td>REMARKS</td>
            </tr>
            <tr style={EXPLANATORY_FONT_SIZE_13}>
              <td>Numerical</td>
              <td>Alphanetical</td>
              <td rowSpan="4">GCE O-Level Pass</td>
            </tr>
            <tr style={EXPLANATORY_FONT_SIZE_13}>
              <td>
                1<br />2
              </td>
              <td>A</td>
            </tr>
            <tr style={EXPLANATORY_FONT_SIZE_13}>
              <td>
                3<br />4
              </td>
              <td>B</td>
            </tr>
            <tr style={EXPLANATORY_FONT_SIZE_13}>
              <td>
                5<br />6
              </td>
              <td>C</td>
            </tr>
            <tr style={EXPLANATORY_FONT_SIZE_13}>
              <td>7</td>
              <td>D</td>
              <td rowSpan="3">Fail</td>
            </tr>
            <tr style={EXPLANATORY_FONT_SIZE_13}>
              <td>8</td>
              <td>E</td>
            </tr>
            <tr style={EXPLANATORY_FONT_SIZE_13}>
              <td>9</td>
              <td>No Alphabetical Grades</td>
            </tr>
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
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          As of 1992, the following Language subjects have been renamed:
          <br />
          <br />
          <table align="center" style={EXPLANATORY_TABLE_WIDTH70_LEFT}>
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
          For further information or clarification on the GCE A-Level, please
          visit the website of the Singapore Examinations and Assessment Board
          (http://www.seab.gov.sg).
        </div>
      </div>
    </div>
  </div>
);

const Template = certificate => (
  <div className="container-fluid">
    <div className="row justify-content-md-center">
      <div className="col-md-2" />
      <div className="col-md-8" style={EXPLANATORY_PAGE_SIZE}>
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-12">&nbsp;</div>
          </div>
          <div className="row">
            <div className="col-md-12" style={EXPLANATORY_TITLE}>
              EXPLANATORY NOTES
            </div>
          </div>
        </div>
        <br />
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-11">
              {renderExplonataryNotes(certificate)}
            </div>
          </div>
        </div>
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="col-md-2" />
    </div>
  </div>
);

export default Template;
