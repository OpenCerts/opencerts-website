const SectionTitle = () => <div className="mb-3"><h2>How it works</h2></div>;

const tabs = [
  {
    title: "How it works",
    content: (
      <div>
        <p>
          The .json certificate provided to you has a unique signature anchored
          onto the Ethereum blockchain. This site helps you to validate the
          authenticity and provenance of the document by checking whether:
        </p>
        <ol>
          <li>
            The contents of the certificate matches the signature attached to it
          </li>
          <li>
            The issuer indicated in the certificate is a recognised issuer
          </li>
          <li>
            The signature attached to the certificate has been issued by the
            issuer
          </li>
          <li>The issuer has revoked the certificate</li>
          <li>The expiry date on the certificate has passed</li>
        </ol>
      </div>
    ),
    control: "view"
  },
  {
    title: "Verification Processes",
    content: (
      <div>
        <p>
          <b>The certificate may have been tampered with</b>
          <br />
          The contents of this .json file has been altered and does not match
          it&apos;s signature. Please obtain a new copy from your educational
          institute.
        </p>
        <p>
          <b>This certificate was issued by an unascertained institution</b>
          <br />
          The issuer indicated in the certificate is not on our list of
          educational credentials issuer. If you would like us to add this
          issuer to our list, please contact us at addme@opencerts.io
        </p>
        <p>
          <b>The certificate was not issued by the indicated issuer</b>
          <br />
          There is no proof on the Ethereum Blockchain that this certificate was
          issued, if this is a mistake please contact your educational institute
          to rectify this.
        </p>
        <p>
          <b>This certificate has been revoked by the issuer</b>
          <br />
          The issuer has explicitly revoked this certificate, if this is a
          mistake please contact your educational institute to rectify this.
        </p>
        <p>
          <b>This certificate has an expiry date and has lapsed</b>
          <br />
          This certificate has an expiry date and has lapsed. Please contact
          your educational institute to be reissued with a new certificate.
        </p>
      </div>
    ),
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
