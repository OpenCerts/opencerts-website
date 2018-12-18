import PropTypes from "prop-types";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { get } from "lodash";
import styles from "./certificateViewer.scss";
import InvalidCertificateNotice from "./CertificateTemplates/InvalidCertificateNotice";

import { getLogger } from "../utils/logger";

const { trace } = getLogger("components:MultiCertificateRenderer");

export const renderTemplateToTab = (template, certificate) =>
  Object.assign(template, { content: template.template({ certificate }) });

const storeCanRenderTemplate = ({ whitelist, certificate }) => {
  if (!whitelist || whitelist === []) {
    return true;
  }
  const issuers = get(certificate, "issuers", []);
  const validStoreAddressForTemplate = whitelist.map(a => a.toLowerCase());
  return issuers.reduce((prev, curr) => {
    const storeAddress = get(curr, "certificateStore", "").toLowerCase();
    const foundInWhitelist = validStoreAddressForTemplate.includes(
      storeAddress
    );
    return prev && foundInWhitelist;
  }, true);
};

export const MultiCertificateRenderer = ({
  certificate,
  whitelist,
  templates
}) => {
  const tabs = templates.map(template => {
    trace(`%o`, template);
    return renderTemplateToTab(template, certificate);
  });
  const allowedToRender = storeCanRenderTemplate({ whitelist, certificate });
  const validCertificateContent = (
    <div>
      <Tabs selectedTabClassName={styles.active}>
        <div id={styles["header-ui"]}>
          <div className={styles["header-container"]}>
            <TabList className="nav nav-tabs">
              {tabs.map(tab => (
                <Tab key={tab.id} className={styles.tab}>
                  {tab.label}
                </Tab>
              ))}
              <a href=" " className={styles["view-another"]}>
                View another
              </a>
            </TabList>
          </div>
        </div>

        <div
          className="tab-content bg-white p-3 mt-3 rounded"
          id="myTabContent"
        >
          {tabs.map(tab => (
            <TabPanel key={tab.id}>{tab.content}</TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
  trace(`%o`, { certificate, whitelist, templates });
  if (allowedToRender) {
    return validCertificateContent;
  }
  return <InvalidCertificateNotice />;
};

MultiCertificateRenderer.propTypes = {
  whitelist: PropTypes.array,
  templates: PropTypes.array.isRequired,
  certificate: PropTypes.object.isRequired
};
