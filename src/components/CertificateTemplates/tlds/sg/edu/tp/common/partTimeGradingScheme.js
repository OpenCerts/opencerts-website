import GradingSchemeStyles from "./gradingSchemeStyles";

const PartTimeGradingScheme = () => (
  <div className="container">
    <GradingSchemeStyles />
    <style>
    {`
      .grading-system-header{
        border:none;
        border-bottom:1px solid #212529;
      }

      .column-header{
        font-weight:bold;
      }
    `}
    </style>

    <div className="grading-system">
      <div className="row">
        <div className="col-12 grading-system-header column-header">Grading System</div>
      </div>
      <div className="row column-header">
        <div className="grading-system-cell col-3">
          <div className="row">
            <div className="col-4">Grade</div>
            <div className="col-5">Description</div>
            <div className="col-3">
              Grade
              <br />
              Point
            </div>
          </div>
        </div>
        <div className="grading-system-cell col-4">
          <div className="row">
            <div className="col-3">Grade</div>
            <div className="col-6">Description</div>
            <div className="col-3">
              Grade
              <br />
              Point
            </div>
          </div>
        </div>
        <div className="grading-system-cell-last col-5">
          <div className="row">
            <div className="col-3">Grade</div>
            <div className="col-6">Description</div>
            <div className="col-3">
              Grade
              <br />
              Point
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grading-system row">
      <div className="grading-system-cell col-3">
        <div className="row">
          <div className="col-4">Distinction</div>
          <div className="col-5">Distinction</div>
          <div className="col-3">4.0</div>
        </div>
        <div className="row">
          <div className="col-4">A</div>
          <div className="col-5">Excellent</div>
          <div className="col-3">4.0</div>
        </div>
        <div className="row">
          <div className="col-4">B+</div>
          <div className="col-5">Very Good</div>
          <div className="col-3">3.5</div>
        </div>
        <div className="row">
          <div className="col-4">B</div>
          <div className="col-5">Very Good</div>
          <div className="col-3">3.0</div>
        </div>
        <div className="row">
          <div className="col-4">C+</div>
          <div className="col-5">Good</div>
          <div className="col-3">2.5</div>
        </div>
      </div>

      <div className="grading-system-cell col-4">
        <div className="row">
          <div className="col-3">C</div>
          <div className="col-6">Good</div>
          <div className="col-3">2.0</div>
        </div>
        <div className="row">
          <div className="col-3">D+</div>
          <div className="col-6">Credit</div>
          <div className="col-3">1.5</div>
        </div>
        <div className="row">
          <div className="col-3">D</div>
          <div className="col-6">Credit</div>
          <div className="col-3">1.0</div>
        </div>
        <div className="row">
          <div className="col-3">P</div>
          <div className="col-6">Non-Graded Pass</div>
          <div className="col-3">1.0</div>
        </div>
        <div className="row">
          <div className="col-3">F</div>
          <div className="col-6">Fail</div>
          <div className="col-3">0</div>
        </div>
      </div>

      <div className="grading-system-cell-last col-5">
        <div className="row">
          <div className="col-3">Pass</div>
          <div className="col-6">Pass in subject with no grade point</div>
          <div className="col-3">N.A.</div>
        </div>
        <div className="row">
          <div className="col-3">Fail</div>
          <div className="col-6">Fail in subject with no grade point</div>
          <div className="col-3">N.A.</div>
        </div>
        <div className="row">
          <div className="col-3">XM</div>
          <div className="col-6">Absence approved by the Polytechnic</div>
          <div className="col-3">N.A.</div>
        </div>
      </div>
    </div>
  </div>
);
export default PartTimeGradingScheme;
