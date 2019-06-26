import React, { Component } from "react";
import {
  certificateData,
  validateSchema,
  verifySignature
} from "@govtechsg/open-certificate";
import connectToParent from "penpal/lib/connectToParent";
import styles from "../certificateViewer.scss";

import FramelessCertificateViewer from "./FramelessCertificateViewer";

const inIframe = () => window.location !== window.parent.location;
const formatTemplate = template =>
  template ? template.map(o => ({ label: o.label, id: o.id })) : null;

class FramelessViewerContainer extends Component {
  constructor(props) {
    super(props);

    this.handleDocumentChange = this.handleDocumentChange.bind(this);
    this.selectTemplateTab = this.selectTemplateTab.bind(this);
    this.updateParentHeight = this.updateParentHeight.bind(this);
    this.updateParentTemplates = this.updateParentTemplates.bind(this);
    this.updateParentCertificate = this.updateParentCertificate.bind(this);
    this.state = {
      parentFrameConnection: null,
      document: null,
      activeTab: 0
    };
  }

  componentDidMount() {
    const selectTemplateTab = this.selectTemplateTab;
    const renderCertificate = this.handleDocumentChange;
    const frameHeight = document.documentElement.scrollHeight;

    window.opencerts = {
      renderCertificate,
      selectTemplateTab
    };

    if (inIframe()) {
      const parentFrameConnection = connectToParent({
        methods: {
          renderCertificate,
          selectTemplateTab,
          frameHeight
        }
      });
      this.setState({ parentFrameConnection });
    }
  }

  // handleTextFieldChange(e) {
  //   const fieldContents = JSON.parse(e.target.value);
  //   trace(fieldContents);
  //   const validated = validateSchema(fieldContents);
  //   if (!validated) {
  //     throw new Error(
  //       "Certificate string does not conform to OpenCerts schema"
  //     );
  //   }
  //   const verified = verifySignature(fieldContents);
  //   trace(`Certificate verification: ${verified}`);
  //   this.props.updateCertificate(fieldContents);
  // }

  selectTemplateTab(activeTab) {
    if (inIframe()) {
      this.state.parentFrameConnection.promise.then(parent => {
        if (parent.selectTemplateTab) parent.selectTemplateTab(activeTab);
      });
    }
    this.setState({ activeTab });
  }

  handleDocumentChange(document) {
    this.setState({ document });
  }

  updateParentCertificate(document) {
    if (inIframe()) {
      this.state.parentFrameConnection.promise.then(parent => {
        if (parent.updateCertificate) {
          parent.updateCertificate(document);
        }
      });
    }
    this.setState({ document });
  }

  updateParentHeight() {
    if (inIframe()) {
      this.state.parentFrameConnection.promise.then(parent => {
        if (parent.updateHeight)
          parent.updateHeight(document.documentElement.scrollHeight + 150);
      });
    }
  }

  updateParentTemplates(templates) {
    if (inIframe()) {
      this.state.parentFrameConnection.promise.then(parent => {
        if (parent.updateTemplates)
          parent.updateTemplates(formatTemplate(templates));
      });
    }
  }

  render() {
    if (!this.state.document) {
      return null;
    }
    return (
      <div className="frameless-tabs">
        <FramelessCertificateViewer
          id={styles["frameless-container"]}
          activeTab={this.state.activeTab}
          document={this.state.document}
          certificate={certificateData(this.state.document)}
          updateParentHeight={this.updateParentHeight}
          updateParentTemplates={this.updateParentTemplates}
          updateParentCertificate={this.updateParentCertificate}
        />
      </div>
    );
  }
}

export default FramelessViewerContainer;
