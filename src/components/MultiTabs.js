import { connect } from "react-redux";
import PropTypes from "prop-types";
import React from "react";
import styles from "./certificateViewer.scss";
import { getTemplates, getActiveTemplateTab } from "../reducers/certificate";
import Drawer from "./UI/Drawer";

const MultiTabs = ({ activeTab, templates, selectTemplateTab }) => (
  <div id={styles["header-ui"]}>
    <div
      className={`${styles["header-container"]} d-none d-lg-block d-xl-block`}
    >
      <div id="template-tabs-list" className="nav nav-tabs">
        {templates && templates.length > 0
          ? templates.map((t, idx) => (
              <li key={idx} className="nav-item">
                <a
                  className={`${styles.tab}
                    ${idx === activeTab ? styles.active : ""}`}
                  id={t.id}
                  onClick={() => {
                    selectTemplateTab(idx);
                  }}
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  {t.label}
                </a>
              </li>
            ))
          : null}
        <a id="btn-view-another" href=" " className={styles["view-another"]}>
          View another
        </a>
      </div>
    </div>
    <div className="d-lg-none d-xl-none">
      <Drawer
        tabs={templates}
        activeIdx={activeTab}
        toggle={idx => selectTemplateTab(idx)}
      />
    </div>
  </div>
);

const mapStateToProps = store => ({
  templates: getTemplates(store),
  activeTab: getActiveTemplateTab(store)
});

export default connect(
  mapStateToProps,
  null
)(MultiTabs);

MultiTabs.propTypes = {
  document: PropTypes.object,
  templates: PropTypes.array,
  selectTemplateTab: PropTypes.func,
  activeTab: PropTypes.number
};
