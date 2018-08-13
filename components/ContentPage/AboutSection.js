const TabsColumn = () => (
  <div className="col-3 no-padding mt-3">
    <div
      className="nav flex-column nav-pills"
      id="v-pills-tab"
      role="tablist"
      aria-orientation="vertical"
    >
      <a
        className="nav-link active"
        id="v-pills-home-tab"
        data-toggle="pill"
        href="#v-pills-home"
        role="tab"
        aria-controls="v-pills-home"
        aria-selected="true"
      >
        Overview
      </a>
      <a
        className="nav-link"
        id="v-pills-profile-tab"
        data-toggle="pill"
        href="#v-pills-profile"
        role="tab"
        aria-controls="v-pills-profile"
        aria-selected="false"
      >
        Viewing OpenCert Documents
      </a>
      <a
        className="nav-link"
        id="v-pills-messages-tab"
        data-toggle="pill"
        href="#v-pills-messages"
        role="tab"
        aria-controls="v-pills-messages"
        aria-selected="false"
      >
        Certificate Verification Process
      </a>
    </div>
  </div>
);

const TabContent = () => (
  <div className="col-9 no-padding bg-white rounded">
    <div className="tab-content" id="v-pills-tabContent">
      <div
        className="tab-pane fade show active m-3"
        id="v-pills-home"
        role="tabpanel"
        aria-labelledby="v-pills-home-tab"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <div
        className="tab-pane fade m-3"
        id="v-pills-profile"
        role="tabpanel"
        aria-labelledby="v-pills-profile-tab"
      >
        Massa massa ultricies mi quis hendrerit dolor magna eget. Faucibus a
        pellentesque sit amet porttitor. Faucibus nisl tincidunt eget nullam non
        nisi est. Nec ullamcorper sit amet risus nullam eget felis. Suspendisse
        ultrices gravida dictum fusce ut placerat orci. Eleifend mi in nulla
        posuere sollicitudin. Semper risus in hendrerit gravida rutrum quisque
        non. Justo laoreet sit amet cursus sit amet dictum sit amet. Sit amet
        nisl purus in mollis nunc sed id semper. Enim sit amet venenatis urna
        cursus eget. At tempor commodo ullamcorper a lacus vestibulum. Pharetra
        massa massa ultricies mi quis. Aliquet eget sit amet tellus cras
        adipiscing enim eu. Odio eu feugiat pretium nibh ipsum consequat nisl
        vel pretium.
      </div>
      <div
        className="tab-pane fade m-3"
        id="v-pills-messages"
        role="tabpanel"
        aria-labelledby="v-pills-messages-tab"
      >
        Quam viverra orci sagittis eu volutpat odio facilisis. Risus commodo
        viverra maecenas accumsan lacus. Risus feugiat in ante metus dictum at
        tempor commodo ullamcorper. Congue nisi vitae suscipit tellus mauris.
        Erat velit scelerisque in dictum. Vitae turpis massa sed elementum
        tempus. A arcu cursus vitae congue mauris rhoncus aenean vel. Volutpat
        sed cras ornare arcu dui. Amet justo donec enim diam vulputate ut
        pharetra sit. Justo donec enim diam vulputate ut. Sed cras ornare arcu
        dui. Sit amet consectetur adipiscing elit pellentesque.
      </div>
    </div>
  </div>
);

const TabbedSection = () => (
  <div className="row" id="how-it-works-section">
    <TabsColumn />
    <TabContent />
  </div>
);

const SectionTitle = () => <div className="h2 mb-3">How It Works</div>;

const AboutSection = () => (
  <div className="row my-3 p-4 bg-light">
    <div className="container-fluid">
      <SectionTitle />
      <TabbedSection />
    </div>
  </div>
);

export default AboutSection;
