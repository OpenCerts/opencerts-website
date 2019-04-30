import PropTypes from "prop-types";
import guideData from "./common/transcriptGuide";

export const tableColBorder = {
  border: "2px solid black",
  padding: "15px",
  paddingBottom: "2px",
  paddingTop: "2px"
};
export const remarksColBorder = {
  border: "2px solid black",
  padding: "15px",
  width: "30%"
};

export const renderHeader = () => (
  <div>
    <br />
    <br />
    <br />
    <h6>
      <b>GUIDE TO ACADEMIC TRANSCRIPT</b>
    </h6>
    <h7>
      <b>NCS BLOCKCHAIN UNIVERSITY</b>
    </h7>
    <div>
      <h10>Office of Student Administration</h10>
    </div>
    <div>
      <h10>
        NCS Hub; Telephone: xxxx xxxx; Fax: xxxx xxxx; URL:{" "}
        <u>www.ncs.com.sg;</u> Email: <u>registar@ncs.com.sg</u>
      </h10>
    </div>
    <hr style={{ border: "1px solid black" }} />
  </div>
);

export const renderInfo = () => (
  <div>
    <div className="mb-2">
      <h10>
        The NCS Blockchain University Act 2015 enacted by the Parliament of the
        Republic of Singapore in Year 2011, recognizes and confirms NCS
        authority to confer and award degrees, diplomas and certificates,
        including honorary degrees and other distinctions.
      </h10>
    </div>
    <div className="mb-2">
      <h10>
        NCS academic calender is divided into three academic terms of 14
        teaching weeks per term.
      </h10>
    </div>
    <div className="mb-2">
      <h10>
        All undergraduate students, except for students under special
        programmes, will take two academic terms per academic year. Currently
        the special programmes for undergraduate students are the NCS-SMU Double
        Degree Programme or the NCS Technology Entrepreneurship Programme.
      </h10>
    </div>
    <div className="mb-2">
      <h10>
        All undergraduate students are admitted in the May-August Term and will
        take a total of 8 academic terms to complete their programme. Students
        under special programme will require additional terms to complete their
        programmes.
      </h10>
    </div>
    <div className="mb-2">
      <h10>
        Postgraduate students are admitted either in the January-April or
        September-December Term. They generally take three terms per academic
        year.
      </h10>
    </div>
    <div className="mb-3">
      <h10>The medium of instruction at NCS is English.</h10>
    </div>
  </div>
);

export const renderGradingSystem = () => (
  <div className="mb-3">
    <h8>
      <b>GRADING SYSTEM (for 2012 to 2016 intakes only)</b>
    </h8>
    <div className="mb-3">
      <h10>
        NCS Blockchain University uses a 5-point grading system for both
        Undergraduate (level U) and Graduate (level G) degree programmes. The
        following grade notations and status codes are used:
      </h10>
    </div>

    <div className="ml-2">
      <table style={{ width: "98%", height: "auto" }}>
        <tbody>
          <tr style={tableColBorder}>
            <td style={tableColBorder}>
              <div>Grade</div>
            </td>
            <td style={tableColBorder}>
              <div>Grade Point /</div>
              <div>Status Codes</div>
            </td>
            <td style={remarksColBorder}>
              <div>Remarks</div>
            </td>
            <td style={tableColBorder}>
              <div>Grade</div>
            </td>
            <td style={tableColBorder}>
              <div>Grade Point /</div>
              <div>Status Codes</div>
            </td>
            <td style={remarksColBorder}>
              <div>Remarks</div>
            </td>
          </tr>
          <tr>
            <td style={tableColBorder}>{guideData.grading[0].grade}</td>
            <td style={tableColBorder}>{guideData.grading[0].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[0].remarks}</div>
            </td>
            <td style={tableColBorder}>{guideData.grading[1].grade}</td>
            <td style={tableColBorder}>{guideData.grading[1].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[1].remarks}</div>
            </td>
          </tr>

          <tr>
            <td style={tableColBorder}>{guideData.grading[2].grade}</td>
            <td style={tableColBorder}>{guideData.grading[2].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[2].remarks}</div>
            </td>
            <td style={tableColBorder}>{guideData.grading[3].grade}</td>
            <td style={tableColBorder}>{guideData.grading[3].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[3].remarks}</div>
            </td>
          </tr>

          <tr>
            <td style={tableColBorder}>{guideData.grading[4].grade}</td>
            <td style={tableColBorder}>{guideData.grading[4].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[4].remarks}</div>
            </td>
            <td style={tableColBorder}>{guideData.grading[5].grade}</td>
            <td style={tableColBorder}>{guideData.grading[5].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[5].remarks}</div>
            </td>
          </tr>

          <tr>
            <td style={tableColBorder}>{guideData.grading[6].grade}</td>
            <td style={tableColBorder}>{guideData.grading[6].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[6].remarks}</div>
            </td>
            <td style={tableColBorder}>{guideData.grading[7].grade}</td>
            <td style={tableColBorder}>{guideData.grading[7].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[7].remarks}</div>
            </td>
          </tr>

          <tr>
            <td style={tableColBorder}>{guideData.grading[8].grade}</td>
            <td style={tableColBorder}>{guideData.grading[8].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[8].remarks}</div>
            </td>
            <td style={tableColBorder}>{guideData.grading[9].grade}</td>
            <td style={tableColBorder}>{guideData.grading[9].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[9].remarks}</div>
            </td>
          </tr>

          <tr>
            <td style={tableColBorder}>{guideData.grading[10].grade}</td>
            <td style={tableColBorder}>{guideData.grading[10].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[10].remarks}</div>
            </td>
            <td style={tableColBorder}>{guideData.grading[11].grade}</td>
            <td style={tableColBorder}>{guideData.grading[11].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[11].remarks}</div>
            </td>
          </tr>

          <tr>
            <td style={tableColBorder}>{guideData.grading[12].grade}</td>
            <td style={tableColBorder}>{guideData.grading[12].gradePoint}</td>
            <td style={tableColBorder}>
              <div>{guideData.grading[12].remarks}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export const renderClassification = () => (
  <div>
    <br />
    <br />
    <div className="mb-2">
      <h8>
        <b>CLASSIFICATIONS OF HONOURS</b>
      </h8>
    </div>
    <div className="ml-5 mb-2">
      <h8>
        <li>
          <b>FOR UNDERGRADUATE PROGRAMME</b>
        </li>
      </h8>
    </div>
    <div className="mb-3">
      <h10>
        NCS adopts the US sytem of Latin awards which translates as with Highest
        Distinction, with High Distinction and with Distinction respectively.
        The corresponding Cumalative Grade Point Average (CPGA) range eligible
        for the different classes of honours are as follows:
      </h10>
    </div>
    <div className="row d-flex justify-content-center mb-3 ">
      <table style={{ width: "60%", height: "auto" }}>
        <tbody>
          <tr>
            <td style={tableColBorder}>
              Cumalative Grade Point Average (CGPA) Range
            </td>
            <td style={tableColBorder}>Class of Honours</td>
          </tr>

          <tr>
            <td style={tableColBorder}>4.50 and above</td>
            <td style={tableColBorder}>Summa Cum Laude</td>
          </tr>

          <tr>
            <td style={tableColBorder}>4.00 to 4.49</td>
            <td style={tableColBorder}>Magna Cum Laude</td>
          </tr>

          <tr>
            <td style={tableColBorder}>3.00 to 3.99</td>
            <td style={tableColBorder}>Cum Laude</td>
          </tr>

          <tr>
            <td style={tableColBorder}>2.00 to 2.99</td>
            <td style={tableColBorder}>Pass</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div className="mb-3">
      <h10>
        Students who have active and showed leadership in the 5th Row may be
        upgraded to the next class of honours if he/she marginally misses the
        cut-off. All Cum Laude awards are highly selective. They do not equate
        to the various classes of degree honours conferred by universities that
        follow the British system of academic honours.
      </h10>
    </div>
    <div className="ml-5 mb-2">
      <h8>
        <li>
          <b>FOR MASTER OF ARCHITECTURE PROGRAMME</b>
        </li>
      </h8>
    </div>
    <div className="mb-3">
      <h10>
        Students with CGPA of 4.5 and above, and A grade for Thesis, will be
        awarded the Master of Architecture with Distinction.
      </h10>
    </div>
  </div>
);

export const renderFooter = () => (
  <div className="d-flex justify-content-center">
    <h10>
      <b>
        <i>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          Any queries about this document should be directed to the Office of
          the Registar, NCS Blockchain University.
        </i>
      </b>
    </h10>
  </div>
);

const Template = () => (
  <div className="container" style={{ fontSize: "0.9rem" }}>
    {renderHeader()}
    {renderInfo()}
    {renderGradingSystem()}
    {renderClassification()}
    {renderFooter()}
  </div>
);

Template.propTypes = {
  certificate: PropTypes.object.isRequired
};
export default Template;
