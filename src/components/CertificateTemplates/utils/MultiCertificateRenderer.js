import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { get } from "lodash";
import styles from "../../certificateViewer.scss";
import InvalidCertificateNotice from "../InvalidCertificateNotice";
import { analyticsEvent } from "../../Analytics";

import { getLogger } from "../../../utils/logger";

const { trace } = getLogger("components:MultiCertificateRenderer");

/**
 * Renders the template view using the provided template function and certificate.
 * Adds this rendered content under the .content key and returns it.
 * @param {*} template
 * @param {*} certificate
 */
export const renderTemplateToTab = ({
  template,
  certificate,
  handleObfuscation
}) => {
  const Template = template.template;
  return Object.assign({}, template, {
    content: (
      <Template
        certificate={certificate}
        handleObfuscation={handleObfuscation}
      />
    )
  });
};

/**
 * Retrieves the contract store address from the provided certificate
 * and tries to find it in the provided whitelist of allowed addresses
 *
 * @returns true if contract store address is present in whitelist, or if whitelist is empty
 * @param {*} whitelist
 * @param {*} certificate
 */
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

/**
 * This React component renders a certificate's data, given an array of template views.
 * @param {*} certificate Certificate Data
 * @param {*} whitelist A list of contract store addresses which are allowed to use this template
 * @param {*} templates An array of template views to render using `renderTemplateToTab()`
 */
export class MultiCertificateRenderer extends Component {
  componentDidMount() {
    const { certificate } = this.props;
    analyticsEvent(window, {
      category: "CERTIFICATE_VIEWED",
      action: get(certificate, "issuers[0].certificateStore"),
      label: get(certificate, "id")
    });
  }

  render() {
    const { certificate, whitelist, templates, handleObfuscation } = this.props;
    const tabs = templates.map(template => {
      trace(`%o`, template);
      return renderTemplateToTab({ template, certificate, handleObfuscation });
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
  }
}

MultiCertificateRenderer.propTypes = {
  whitelist: PropTypes.array,
  templates: PropTypes.array.isRequired,
  certificate: PropTypes.object.isRequired,
  handleObfuscation: PropTypes.func
};
