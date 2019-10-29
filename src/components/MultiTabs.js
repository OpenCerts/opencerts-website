import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
import React from "react";
import styles from "./certificateViewer.scss";
import {
  getTemplates,
  getActiveTemplateTab,
  resetCertificateState
} from "../reducers/certificate";
import Drawer from "./UI/Drawer";

const MultiTabs = ({ resetData, activeTab, templates, selectTemplateTab }) => (
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
        <Link href="/">
          <a
            id="btn-view-another"
            onClick={() => resetData()}
            className={styles["view-another"]}
          >
            View another
          </a>
        </Link>
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

const mapDispatchToProps = dispatch => ({
  resetData: () => dispatch(resetCertificateState())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiTabs);

MultiTabs.propTypes = {
  resetData: PropTypes.func,
  document: PropTypes.object,
  templates: PropTypes.array,
  selectTemplateTab: PropTypes.func,
  activeTab: PropTypes.number
};
