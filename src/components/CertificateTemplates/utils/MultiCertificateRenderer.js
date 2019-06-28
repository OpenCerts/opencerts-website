import React, { Component } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import InvalidCertificateNotice from "../InvalidCertificateNotice";
import { analyticsEvent } from "../../Analytics";

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
  componentDidMount() {
    const {
      certificate,
      templates,
      updateParentHeight,
      updateParentTemplates
    } = this.props;

    // Analytics
    analyticsEvent(window, {
      category: "CERTIFICATE_VIEWED",
      action: get(certificate, "issuers[0].certificateStore"),
      label: get(certificate, "id")
    });

    // Templates
    updateParentTemplates(templates);

    // Update Height
    updateParentHeight();
  }

  render() {
    const {
      certificate,
      whitelist,
      templates,
      activeTab,
      obfuscateField,
      updateParentHeight
    } = this.props;
    const SelectedTemplateTab = templates[activeTab].template;
    const allowedToRender = storeCanRenderTemplate({
      whitelist,
      certificate
    });
    if (allowedToRender) {
      return (
        <SelectedTemplateTab
          certificate={certificate}
          handleObfuscation={obfuscateField}
          updateParentHeight={updateParentHeight}
        />
      );
    }
    return <InvalidCertificateNotice />;
  }
}

MultiCertificateRenderer.propTypes = {
  whitelist: PropTypes.array,
  templates: PropTypes.array.isRequired,
  certificate: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  updateParentHeight: PropTypes.func,
  updateParentTemplates: PropTypes.func,
  obfuscateField: PropTypes.func
};

export default MultiCertificateRenderer;
