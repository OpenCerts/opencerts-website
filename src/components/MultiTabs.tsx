import Link from "next/link";
import React, { useState } from "react";
import { connect } from "react-redux";
import { resetCertificateState } from "../reducers/certificate.actions";
import { Drawer } from "./UI/Drawer";
import styles from "./certificateViewer.module.scss";

interface MultiTabsProps {
  resetData: () => void;
  templates: { id: string; label: string }[];
  onSelectTemplate: (label: string) => void;
}
const MultiTabs: React.FunctionComponent<MultiTabsProps> = ({ resetData, templates, onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  return (
    <div id={styles["header-ui"]}>
      <div className={`${styles["header-container"]} d-none d-lg-block d-xl-block`}>
        <div id="template-tabs-list" className="nav nav-tabs">
          {templates && templates.length > 0
            ? templates.map((template, idx) => (
                <li key={idx} className="nav-item">
                  <a
                    className={`${styles.tab}
                    ${idx === selectedTemplate ? styles.active : ""}`}
                    data-testid={template.id}
                    onClick={() => {
                      setSelectedTemplate(idx);
                      onSelectTemplate(template.id);
                    }}
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    {template.label}
                  </a>
                </li>
              ))
            : null}
          <Link href="/">
            <a id="btn-view-another" onClick={() => resetData()} className={styles["view-another"]}>
              View another
            </a>
          </Link>
        </div>
      </div>
      <div className="d-lg-none d-xl-none">
        <Drawer
          tabs={templates}
          activeIdx={selectedTemplate}
          toggle={(index, id) => {
            setSelectedTemplate(index);
            onSelectTemplate(id);
          }}
        />
      </div>
    </div>
  );
};

export const MutiTabsContainer = connect(null, (dispatch) => ({
  resetData: () => dispatch(resetCertificateState()),
}))(MultiTabs);
