import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  certificateData,
  validateSchema,
  verifySignature
} from "@govtechsg/open-certificate";

import styles from "./certificateViewer.scss";
import {
  updateCertificate,
  getCertificate,
  getTemplates,
  selectTemplateTab
} from "../reducers/certificate";
import FramelessCertificateViewer from "./FramelessCertificateViewer";
import { getLogger } from "../utils/logger";

const { trace } = getLogger("components:FramelessViewerPageContainer");

class FramelessViewerContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
  }

  componentDidMount() {
    window.templates = () => this.props.templates;
    window.renderCertificate = this.handleCertificateChange;
    window.selectTemplateTab = this.props.selectTemplateTab;
  }

  handleTextFieldChange(e) {
    const fieldContents = JSON.parse(e.target.value);
    trace(fieldContents);
    const validated = validateSchema(fieldContents);
    if (!validated) {
      throw new Error(
        "Certificate string does not conform to OpenCerts schema"
      );
    }
    const verified = verifySignature(fieldContents);
    trace(`Certificate verification: ${verified}`);
    this.props.updateCertificate(fieldContents);
  }

  handleCertificateChange(certificate) {
    this.props.updateCertificate(certificate);
  }

  render() {
    if (!this.props.document) {
      return (
        <input
          id="certificateContentsString"
          type="hidden"
          onChange={this.handleTextFieldChange}
        />
      );
    }
    return (
      <FramelessCertificateViewer
        id={styles["frameless-container"]}
        document={this.props.document}
        certificate={certificateData(this.props.document)}
      />
    );
  }
}

const mapStateToProps = store => ({
  document: getCertificate(store),
  templates: getTemplates(store)
});

const mapDispatchToProps = dispatch => ({
  updateCertificate: payload => dispatch(updateCertificate(payload)),
  selectTemplateTab: tabIndex => dispatch(selectTemplateTab(tabIndex))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FramelessViewerContainer);

FramelessViewerContainer.propTypes = {
  updateCertificate: PropTypes.func.isRequired,
  document: PropTypes.object,
  certificate: PropTypes.object,
  selectTemplateTab: PropTypes.func.isRequired,
  templates: PropTypes.array
};
