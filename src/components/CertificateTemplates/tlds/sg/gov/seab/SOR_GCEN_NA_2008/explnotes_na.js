import { get, groupBy } from "lodash";
import {
  EXPLANATORY_FONT_SIZE_13,
  EXPLANATORY_TITLE,
  EXPLANATORY_PAGE_SIZE,
  EXPLANATORY_CONTENT
} from "../common";

export const renderExplonataryNotes = ({ certificate }) => (
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
          Normal (Academic) Level [GCE N(A)-Level] Examination.
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
          The pass grades for GCE N(A)-Level subjects are shown by numerical
          grades 1 to 5 (Grade 1 is the highest and Grade 5 the lowest).
          ‘Ungraded’ denotes a fail grade.
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
          Performance in the Oral/Aural Examinations in the Mother Tongue
          subjects is indicated as Distinction (DIST), Merit, Pass or Ungraded.
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
          As of 2002, subjects taken under access arrangements are annotated
          with the following symbols:
          <br />
          <br />
          <b># Exemption Symbol</b>
          <br />
          The candidate was exempted from satisfying the full range of
          assessment objectives in this subject. Details may be obtained from
          the Singapore Examinations and Assessment Board.
          <br />
          <br />
          <b>+Access Arrangement Symbol</b>
          <br />
          The candidate sat the paper under access arrangements. Details may be
          obtained from the Singapore Examinations and Assessment Board.
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
          This document is issued on condition of your strict compliance with
          the Examination Instructions and Regulations. You must comply with any
          direction by the Singapore Examinations and AssessmentBoard (SEAB) to
          return this document to SEAB.
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
          For further information or clarification on the GCE N(A)-Level, please
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
            <div className="col-md-1" />
            <div className="col-md-11">
              {renderExplonataryNotes(certificate)}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-2" />
    </div>
  </div>
);

export default Template;
