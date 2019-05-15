const ExamResultsStyles = () => (
  <style>
    {`
      .exam-results-header {
        border-top: 2px solid #212529;
        border-bottom: 2px solid #212529;
        margin-bottom:0.8em;
        font-weight: bold
      }

      .semester-header{
        font-weight: bold;
        text-transform:uppercase;
      }

      .semester-header.exemption {
        text-transform: none;
      }

      .credit-unit,
      .grade {
        text-align: center
      }

      .exam-results-footer{
        font-weight: bold
      }

    `}
  </style>
);

export default ExamResultsStyles;
