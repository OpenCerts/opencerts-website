import { EXPLANATORY_FONT_SIZE_13, EXPLANATORY_CONTENT } from "./style";

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
