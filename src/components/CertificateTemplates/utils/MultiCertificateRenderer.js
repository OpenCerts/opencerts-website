import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { get } from "lodash";
import { certificateData, obfuscateFields } from "@govtechsg/open-certificate";
import styles from "../../certificateViewer.scss";
import InvalidCertificateNotice from "../InvalidCertificateNotice";
import { analyticsEvent } from "../../Analytics";
import Drawer from "../../UI/Drawer";
import {
  getCertificate,
  getActiveTemplateTab,
  updateObfuscatedCertificate,
  registerTemplates as registerTemplatesAction,
  selectTemplateTab as selectTemplateTabAction
} from "../../../reducers/certificate";

import { getLogger } from "../../../utils/logger";

const { trace } = getLogger("components:MultiCertificateRenderer");

/**
 * Renders the template view using the provided template function and certificate.
 * Adds this rendered content under the .content key and returns it.
 * @param {*} template
 * @param {*} certificate
 */
export const renderTemplateToTab = ({
  document,
  template,
  certificate,
  handleObfuscation
}) => {
  const Template = template.template;
  return Object.assign({}, template, {
    content: (
      <Template
        document={document}
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
class MultiCertificateRenderer extends Component {
  constructor(props) {
    super(props);
    this.handleObfuscation = this.handleObfuscation.bind(this);
  }

  componentDidMount() {
    const { document, templates, registerTemplates } = this.props;
    const certificate = certificateData(document);
    analyticsEvent(window, {
      category: "CERTIFICATE_VIEWED",
      action: get(certificate, "issuers[0].certificateStore"),
      label: get(certificate, "id")
    });
    registerTemplates(templates);
  }

  handleObfuscation(field) {
    const updatedDocument = obfuscateFields(this.props.document, field);
    this.props.updateObfuscatedCertificate(updatedDocument);
  }

  render() {
    const {
      document,
      whitelist,
      templates,
      activeTab,
      selectTemplateTab
    } = this.props;
    const certificate = certificateData(document);
    const tabs = templates.map(template => {
      trace(`%o`, template);
      return renderTemplateToTab({
        document,
        template,
        certificate,
        handleObfuscation: this.handleObfuscation
      });
    });
    const allowedToRender = storeCanRenderTemplate({ whitelist, certificate });
    const validCertificateContent = (
      <>
        <Tabs
          onSelect={selectTemplateTab}
          selectedIndex={activeTab}
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
            </div>
          </div>
          <div className="d-lg-none d-xl-none">
            <Drawer
              tabs={tabs}
              activeIdx={activeTab}
              toggle={idx => selectTemplateTab(idx)}
            />
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
  document: PropTypes.object.isRequired,
  updateObfuscatedCertificate: PropTypes.func.isRequired,
  registerTemplates: PropTypes.func.isRequired,
  selectTemplateTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired
};

const mapStateToProps = store => ({
  document: getCertificate(store),
  activeTab: getActiveTemplateTab(store)
});

const mapDispatchToProps = dispatch => ({
  updateObfuscatedCertificate: updatedDoc =>
    dispatch(updateObfuscatedCertificate(updatedDoc)),
  registerTemplates: templates => dispatch(registerTemplatesAction(templates)),
  selectTemplateTab: tabIndex => dispatch(selectTemplateTabAction(tabIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiCertificateRenderer);
