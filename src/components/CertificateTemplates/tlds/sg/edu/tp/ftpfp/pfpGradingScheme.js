const PfpGradingScheme = () => (
  <div className="container">
    <style>
      {`
      .grading-system{
        font-size:0.9em;
      }

      .grading-system-cell {
        border: 1px solid #212529;
        border-right:none;
        border-top:none;
      }

      .grading-system-header{
        border:1px solid #212529;
      }

      .grading-system-cell-last{
        border:1px solid #212529;
        border-top:none;
      }
      `}
    </style>

    <div className="grading-system">
      <div className="row">
        <div className="col-12 grading-system-header">Grading System</div>
      </div>
      <div className="row">
        <div className="grading-system-cell col-3">
          <div className="row">
            <div className="col-6">Grade</div>
            <div className="col-6">Description</div>
          </div>
        </div>
        <div className="grading-system-cell col-4">
          <div className="row">
            <div className="col-6">Grade</div>
            <div className="col-6">Description</div>
          </div>
        </div>
        <div className="grading-system-cell-last col-5">
          <div className="row">
            <div className="col-5">Grade</div>
            <div className="col-7">Description</div>
          </div>
        </div>
      </div>
    </div>

    <div className="grading-system row">
      <div className="grading-system-cell col-3">
        <div className="row">
          <div className="col-6">Distinction</div>
          <div className="col-6">Distinction</div>
        </div>
        <div className="row">
          <div className="col-6">A</div>
          <div className="col-6">Excellent</div>
        </div>
        <div className="row">
          <div className="col-6">B+</div>
          <div className="col-6">Very Good</div>
        </div>
        <div className="row">
          <div className="col-6">B</div>
          <div className="col-6">Very Good</div>
        </div>
      </div>

      <div className="grading-system-cell col-4">
        <div className="row">
          <div className="col-6">C+</div>
          <div className="col-6">Good</div>
        </div>
        <div className="row">
          <div className="col-6">C</div>
          <div className="col-6">Good</div>
        </div>
        <div className="row">
          <div className="col-6">D+</div>
          <div className="col-6">Credit</div>
        </div>
        <div className="row">
          <div className="col-6">D</div>
          <div className="col-6">Credit</div>
        </div>
      </div>

      <div className="grading-system-cell-last col-5">
        <div className="row">
          <div className="col-5">F</div>
          <div className="col-7">Fail</div>
        </div>
        <div className="row">
          <div className="col-5">P</div>
          <div className="col-7">Non-Graded Pass</div>
        </div>
        <div className="row">
          <div className="col-5">Fail</div>
          <div className="col-7">Fail</div>
        </div>
        <div className="row">
          <div className="col-5">Pass</div>
          <div className="col-7">Pass</div>
        </div>
      </div>
    </div>
  </div>
);
export default PfpGradingScheme;
