import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { get } from "lodash";
import styles from "../../certificateViewer.scss";
import InvalidCertificateNotice from "../InvalidCertificateNotice";
import { analyticsEvent } from "../../Analytics";
import Drawer from "../../UI/Drawer";

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
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0
    };
    this.setTabIndex = this.setTabIndex.bind(this);
  }

  componentDidMount() {
    const { certificate } = this.props;
    analyticsEvent(window, {
      category: "CERTIFICATE_VIEWED",
      action: get(certificate, "issuers[0].certificateStore"),
      label: get(certificate, "id")
    });
  }

  setTabIndex(index) {
    this.setState({ selectedTabIndex: index });
  }

  render() {
    const { certificate, whitelist, templates, handleObfuscation } = this.props;
    const { selectedTabIndex } = this.state;
    const tabs = templates.map(template => {
      trace(`%o`, template);
      return renderTemplateToTab({ template, certificate, handleObfuscation });
    });
    const allowedToRender = storeCanRenderTemplate({ whitelist, certificate });
    const validCertificateContent = (
      <>
        <Tabs
          onSelect={this.setTabIndex}
          selectedIndex={this.state.selectedTabIndex}
          selectedTabClassName={styles.active}
        >
          <div id={styles["header-ui"]}>
            <div className={styles["header-container"]}>
              <TabList
                id="template-tabs-list"
                className="nav nav-tabs d-none d-lg-block d-xl-block"
              >
                {tabs.map(tab => (
                  <Tab key={tab.id} className={styles.tab}>
                    {tab.label}
                  </Tab>
                ))}
                <a
                  id="btn-view-another"
                  href=" "
                  className={styles["view-another"]}
                >
                  View another
                </a>
              </TabList>

              <div className="d-lg-none d-xl-none">
                <Drawer
                  tabs={tabs}
                  activeIdx={selectedTabIndex}
                  toggle={idx => this.setTabIndex(idx)}
                />
              </div>
            </div>
          </div>
          <div
            className="tab-content bg-white p-3 mt-3 rounded"
            id="rendered-certificate"
          >
            {tabs.map(tab => (
              <TabPanel key={tab.id}>{tab.content}</TabPanel>
            ))}
          </div>
        </Tabs>
      </>
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
