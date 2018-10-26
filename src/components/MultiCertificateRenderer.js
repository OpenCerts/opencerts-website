import PropTypes from "prop-types";
import styles from "./certificateviewer.scss";

const renderTabList = (templates = []) => {
  const tabs = templates.map((t, i) => (
    <li className={`nav-item${i === 0 ? " ml-auto" : ""}`} key={i}>
      <a
        className={`slanted-tab ${i === 0 ? " active" : ""}`}
        data-toggle="tab"
        aria-controls={`${t.id}`}
        href={`#${t.id}`}
        role="tab"
        id={`${t.id}-tab`}
      >
        {t.label}
      </a>
    </li>
  ));
  return (
    <ul className="nav nav-tabs" role="tablist">
      {tabs}
    </ul>
  );
};

const renderTabContent = (certificate, templates = []) => {
  const contents = templates.map((t, i) => (
    <div
      id={`${t.id}`}
      key={i}
      className={`tab-pane fade${i === 0 ? " show active" : ""}`}
      role="tabpanel"
      aria-labelledby={`${t.id}-tab`}
    >
      {t.template(certificate)}
    </div>
  ));
  return (
    <div className="tab-content bg-white p-3 mt-3 rounded" id="myTabContent">
      {contents}
    </div>
  );
};

const MultiCertificateRenderer = ({ certificate, templates }) => {
  const renderedTabs = (
    <div id={styles["header-ui"]}>
      <div className={styles["header-container"]}>
        {renderTabList(templates)}
      </div>
    </div>
  );
  const renderedContent = renderTabContent(certificate, templates);
  return (
    <div>
      {renderedTabs}
      {renderedContent}
    </div>
  );
};

export default MultiCertificateRenderer;

MultiCertificateRenderer.propTypes = {
  certificate: PropTypes.object,
  templates: PropTypes.array
};
