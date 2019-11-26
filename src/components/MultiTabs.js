import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./certificateViewer.scss";
import { resetCertificateState } from "../reducers/certificate";
import Drawer from "./UI/Drawer";

const MultiTabs = ({ resetData, templates, onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  return (
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
                    ${idx === selectedTemplate ? styles.active : ""}`}
                    id={t.id}
                    onClick={() => {
                      setSelectedTemplate(idx);
                      onSelectTemplate(idx);
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
          activeIdx={selectedTemplate}
          toggle={idx => {
            setSelectedTemplate(idx);
          }}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  resetData: () => dispatch(resetCertificateState())
});

export default connect(
  null,
  mapDispatchToProps
)(MultiTabs);

MultiTabs.propTypes = {
  resetData: PropTypes.func,
  document: PropTypes.object,
  templates: PropTypes.array,
  onSelectTemplate: PropTypes.func,
  activeTab: PropTypes.number
};
