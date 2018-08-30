const SectionTitle = () => <div className="h2 mb-3">How It Works</div>;

const tabs = [
  {
    title: "Viewing A Certificate",
    content: <p>This is how you view</p>,
    id: "view-tab",
    control: "view"
  }
];

const AboutSection = () => (
  <div className="row p-4 bg-light" id="how-it-works">
    <div className="container-fluid">
      <SectionTitle />
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="view-tab"
            data-toggle="tab"
            href="#view"
            role="tab"
            aria-controls="view"
            aria-selected="true"
          >
            Viewing A Certificate
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="verification-tab"
            data-toggle="tab"
            href="#verification"
            role="tab"
            aria-controls="verification"
            aria-selected="false"
          >
            Verification Process
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade show active"
          id="view"
          role="tabpanel"
          aria-labelledby="view-tab"
        >
          ...
        </div>
        <div
          className="tab-pane fade"
          id="verification"
          role="tabpanel"
          aria-labelledby="verification-tab"
        >
          ...
        </div>
      </div>
    </div>
  </div>
);

export default AboutSection;
