import {
  EXPLANATORY_FONT_SIZE_13,
  EXPLANATORY_TABLE_WIDTH70_CENTER,
  EXPLANATORY_CONTENT
} from "./style";

export const COMMAN_EXPL_1 = () => (
  <div className="row">
    <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
      2
    </div>
    <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
      The NRIC / Foreign Identification No. refers to the National Registration
      Identity Card (NRIC) number of Singapore citizens and Permanent Residents.
      For non-Singapore citizens, the NRIC / Foreign Identification No. refers
      to the number on their official identification document, such as a
      passport.
    </div>
  </div>
);

export const COMMAN_EXPL_2 = () => (
  <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
    As of 2002, subjects taken under access arrangements are annotated with the
    following symbols:
    <br />
    <br />
    <b># Exemption Symbol</b>
    <br />
    The candidate was exempted from satisfying the full range of assessment
    objectives in this subject. Details may be obtained from the Singapore
    Examinations and Assessment Board.
    <br />
    <br />
    <b>+Access Arrangement Symbol</b>
    <br />
    The candidate sat the paper under access arrangements. Details may be
    obtained from the Singapore Examinations and Assessment Board.
  </div>
);

export const COMMAN_EXPL_3 = () => (
  <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
    Performance in the Oral/Aural Examinations in the Mother Tongue subjects is
    indicated as Distinction (DIST), Merit, Pass or Ungraded.
  </div>
);

export const COMMAN_EXPL_4 = () => (
  <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
    This document is issued on condition of your strict compliance with the
    Examination Instructions and Regulations. You must comply with any direction
    by the Singapore Examinations and Assessment Board (SEAB) to return this
    document to SEAB.
  </div>
);

export const COMMAN_EXPL_5 = () => (
  <div className="row">
    <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
      1
    </div>
    <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
      The Singapore Examinations and Assessment Board is authorised by the
      Republic of Singapore to manage national examinations in Singapore. The
      Board, together with the Ministry of Education (MOE), Singapore and the
      University of Cambridge International Examinations (CIE) are joint
      examining authorities for the General Certificate of Education Advanced
      Level (GCE A-Level) Examination.
    </div>
  </div>
);

export const COMMAN_EXPL_6 = () => (
  <div className="row">
    <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
      5
    </div>
    <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
      Results in AO-Level are indicated by grades 1 to 9 (Grade 1 is the highest
      and Grade 9 the lowest). The alphabetical equivalence of the numerical
      grades is as follows:
      <br />
      <br />
      <table border="1" align="center" style={EXPLANATORY_TABLE_WIDTH70_CENTER}>
        <tbody>
          <tr>
            <td colSpan="2">GRADE</td>
            <td>REMARKS</td>
          </tr>
          <tr>
            <td>Numerical</td>
            <td>Alphanetical</td>
            <td rowSpan="4">GCE O-Level Pass</td>
          </tr>
          <tr>
            <td>
              1<br />2
            </td>
            <td>A</td>
          </tr>
          <tr>
            <td>
              3<br />4
            </td>
            <td>B</td>
          </tr>
          <tr>
            <td>
              5<br />6
            </td>
            <td>C</td>
          </tr>
          <tr>
            <td>7</td>
            <td>D</td>
            <td rowSpan="3">Fail</td>
          </tr>
          <tr>
            <td>8</td>
            <td>E</td>
          </tr>
          <tr>
            <td>9</td>
            <td>No Alphabetical Grades</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
