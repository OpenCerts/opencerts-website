import React, { Component } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { certificateData, obfuscateFields } from "@govtechsg/open-certificate";
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
  constructor(props) {
    super(props);
    this.handleObfuscation = this.handleObfuscation.bind(this);
  }

  componentDidMount() {
    const {
      document,
      templates,
      updateParentHeight,
      updateParentTemplates
    } = this.props;

    // Analytics
    const certificate = certificateData(document);
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

  handleObfuscation(field) {
    const updatedDocument = obfuscateFields(this.props.document, field);
    this.props.updateParentCertificate(updatedDocument);
  }

  render() {
    const { document, whitelist, templates, activeTab } = this.props;
    const certificate = certificateData(document);
    const SelectedTemplateTab = templates[activeTab].template;
    const allowedToRender = storeCanRenderTemplate({ whitelist, certificate });
    if (allowedToRender) {
      return (
        <SelectedTemplateTab
          certificate={certificate}
          handleObfuscation={this.handleObfuscation}
          updateParentHeight={this.props.updateParentHeight}
        />
      );
    }
    return <InvalidCertificateNotice />;
  }
}

MultiCertificateRenderer.propTypes = {
  whitelist: PropTypes.array,
  templates: PropTypes.array.isRequired,
  document: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired,
  updateParentHeight: PropTypes.func,
  updateParentTemplates: PropTypes.func,
  updateParentCertificate: PropTypes.func.isRequired
};

export default MultiCertificateRenderer;
