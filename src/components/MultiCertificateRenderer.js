import PropTypes from "prop-types";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import styles from "./certificateViewer.scss";

const MultiCertificateRenderer = ({ certificate, templates }) => {
  return (
    <div>
      <Tabs selectedTabClassName="active">
        <div id={styles["header-ui"]}>
          <div className={styles["header-container"]}>
            <TabList className="nav nav-tabs justify-content-end">
              {templates.map(template => (
                <Tab className="nav-item slanted-tab">{template.label}</Tab>
              ))}
            </TabList>
          </div>
        </div>
        <div
          className="tab-content bg-white p-3 mt-3 rounded"
          id="myTabContent"
        >
          {templates.map(template => (
            <TabPanel>{template.template(certificate)}</TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

MultiCertificateRenderer.propTypes = {
  certificate: PropTypes.object,
  templates: PropTypes.array
};

export default MultiCertificateRenderer;