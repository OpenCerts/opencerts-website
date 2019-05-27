import PropTypes from "prop-types";

import {
  EXPLANATORY_CONTENT,
  EXPLANATORY_FONT_SIZE_13,
  EXPLANATORY_FONT_SIZE_13_LEFT,
  EXPLANATORY_MARGIN_LEFT
} from "./style";

import {
  COMMAN_EXPL_1,
  COMMAN_EXPL_2,
  COMMAN_EXPL_5,
  COMMAN_EXPL_6
} from "./explnotes";

export const RENDEREXPLANATORYNOTES_A2 = () => (
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
          grades: A, B, C, D and E (Grade A is the highest and Grade E the
          lowest). Grade O indicates that a candidate has failed to obtain a
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
          Candidates who sit GCE A-Level subjects with Special Papers will have
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
          Performance in the Oral/Aural Examinations in Chinese Language and the
          Oral Examinations in Malay and Tamil Languages is indicated as
          Distinction (DIST), Merit, Pass or Ungraded.
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
          All JC1/PU2 school candidates from 2003 are required to offer Project
          Work (PW). The level of achievement in PW is indicated by bands from
          Band 1 to Band 4 (Band 1 is the highest and Band 4 the lowest).
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
          Performance in the Mother Tongue B subjects (Chinese B / Malay B /
          Tamil B) is indicated as Merit, Pass or Ungraded. Mother Tongue B is
          not an A-Level or AO-Level subject.
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13}>
          9
        </div>
        {COMMAN_EXPL_2()}
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13_LEFT}>
          10
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          <div style={EXPLANATORY_MARGIN_LEFT}>
            This document is issued on condition of your strict compliance with
            the Examination Instructions and Regulations. You must comply with
            any direction by the Singapore Examinations and Assessment Board
            (SEAB) to return this document to SEAB.
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-md-0.5" style={EXPLANATORY_FONT_SIZE_13_LEFT}>
          11
        </div>
        <div className="col-md-11" valign="top" style={EXPLANATORY_CONTENT}>
          <div style={EXPLANATORY_MARGIN_LEFT}>
            For further information or clarification on the GCE A-Level, please
            visit the website of the Singapore Examinations and Assessment Board
            (http://www.seab.gov.sg).
          </div>
        </div>
      </div>
    </div>
  </div>
);

RENDEREXPLANATORYNOTES_A2.propTypes = {
  certificate: PropTypes.object.isRequired
};

export default () => RENDEREXPLANATORYNOTES_A2;
