import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { get } from "lodash";
import { certificateData } from "@govtechsg/open-certificate";
import InvalidCertificateNotice from "../InvalidCertificateNotice";

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
  render() {
    const { document, whitelist, templates, activeTab } = this.props;
    const certificate = certificateData(document);
    const allowedToRender = storeCanRenderTemplate({ whitelist, certificate });
    trace(`%o`, { certificate, whitelist, templates });
    if (allowedToRender) {
      const template = templates[activeTab];
      return renderTemplateToTab({
        document,
        template,
        certificate,
        // TODO: Add obfuscation to postMessage
        handleObfuscation: () => {}
      }).content;
    }
    return <InvalidCertificateNotice />;
  }
}

MultiCertificateRenderer.propTypes = {
  whitelist: PropTypes.array,
  templates: PropTypes.array.isRequired,
  document: PropTypes.object.isRequired,
  activeTab: PropTypes.number.isRequired
};

export default MultiCertificateRenderer;
