const SectionTitle = () => <div className="h2 mb-3">How It Works</div>;

const tabs = [
  {
    title: "Viewing A Certificate",
    content: <p>This is how you view</p>,
    id: "view-tab",
    control: "view"
  },
  {
    title: "Verification Process",
    content: <p>This is how you verify</p>,
    id: "verify-tab",
    control: "verify"
  }
];

const renderTabTitle = () => {
  const list = tabs.map((tab, i) => (
    <li className="nav-item" key={i}>
      <a
        className={`nav-link ${i === 0 ? "active" : ""}`}
        id={tab.id}
        data-toggle="tab"
        href={`#${tab.control}`}
        role="tab"
        aria-controls={tab.control}
        aria-selected={i === 0 ? "true" : "false"}
      >
        {tab.title}
      </a>
    </li>
  ));
  return (
    <ul className="nav nav-tabs" id="myTab" role="tablist">
      {list}
    </ul>
  );
};

const renderTabContent = () => {
  const list = tabs.map((tab, i) => (
    <div
      key={i}
      className={`tab-pane fade ${i === 0 ? "show active" : ""}`}
      id={tab.control}
      role="tabpanel"
      aria-labelledby={tab.id}
    >
      {tab.content}
    </div>
  ));
  return (
    <div
      className="tab-content py-3"
      id="myTabContent"
      style={{ minHeight: 300 }}
    >
      {list}
    </div>
  );
};

const AboutSection = () => (
  <div className="row p-4 bg-light" id="how-it-works">
    <div className="container-fluid">
      <SectionTitle />
      {renderTabTitle()}
      {renderTabContent()}
    </div>
  </div>
);

export default AboutSection;
