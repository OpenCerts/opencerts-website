import PropTypes from "prop-types";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Component } from "react";
import styles from "./certificateViewer.scss";

const renderTemplateToTab = (template, certificate) =>
  Object.assign(template, { content: template.template(certificate) });

export const MultiCertificateRenderer = tabs => (
  <div>
    <Tabs selectedTabClassName="active">
      <div id={styles["header-ui"]}>
        <div className={styles["header-container"]}>
          <TabList className="nav nav-tabs justify-content-end">
            {tabs.map(tab => (
              <Tab key={tab.id} className="nav-item slanted-tab">
                {tab.label}
              </Tab>
            ))}
          </TabList>
        </div>
      </div>
      <div className="tab-content bg-white p-3 mt-3 rounded" id="myTabContent">
        {tabs.map(tab => (
          <TabPanel key={tab.id}>{tab.content}</TabPanel>
        ))}
      </div>
    </Tabs>
  </div>
);

export class MultiCertificateRendererContainer extends Component {
  render() {
    const { certificate, templates } = this.props;

    const tabs = templates.map(template =>
      renderTemplateToTab(template, certificate)
    );

    return MultiCertificateRenderer(tabs);
  }
}

MultiCertificateRendererContainer.propTypes = {
  certificate: PropTypes.object,
  templates: PropTypes.array
};

MultiCertificateRenderer.propTypes = {
  tabs: {
    id: PropTypes.string, // internal ID for the tabs
    label: PropTypes.string, // Label that shows up on the Tab List
    content: PropTypes.string // Rendered Certificate
  }
};
