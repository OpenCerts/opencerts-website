import React, { Component } from "react";
import {
  validateSchema,
  verifySignature,
  certificateData
} from "@govtechsg/open-certificate";
import connectToParent from "penpal/lib/connectToParent";
import styles from "../certificateViewer.scss";
import FramelessCertificateViewer from "./FramelessCertificateViewer";
import { inIframe, formatTemplate } from "./utils";
import { getLogger } from "../../utils/logger";

const { trace } = getLogger("components:FramelessViewerPageContainer");

class FramelessViewerContainer extends Component {
  constructor(props) {
    super(props);

    this.handleDocumentChange = this.handleDocumentChange.bind(this);
    this.selectTemplateTab = this.selectTemplateTab.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.updateParentHeight = this.updateParentHeight.bind(this);
    this.updateParentTemplates = this.updateParentTemplates.bind(this);
    this.updateParentCertificate = this.updateParentCertificate.bind(this);
    this.state = {
      parentFrameConnection: null,
      document: null,
      activeTab: 0
    };
  }

  componentDidUpdate() {
    this.updateParentHeight();
  }

  componentDidMount() {
    const selectTemplateTab = this.selectTemplateTab;
    const renderCertificate = this.handleDocumentChange;

    window.opencerts = {
      renderCertificate,
      selectTemplateTab
    };

    if (inIframe()) {
      const parentFrameConnection = connectToParent({
        methods: {
          renderCertificate,
          selectTemplateTab
        }
      }).promise;
      this.setState({ parentFrameConnection });

      parentFrameConnection.then(parent => {
        if (parent.updateHeight)
          parent.updateHeight(document.documentElement.offsetHeight);
      });
    }
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
    this.updateParentCertificate(fieldContents);
  }

  async selectTemplateTab(activeTab) {
    if (inIframe()) {
      const { parentFrameConnection } = this.state;
      const parent = await parentFrameConnection;
      if (parent.selectTemplateTab) {
        parent.selectTemplateTab(activeTab);
      }
      this.setState({ activeTab });
    }
  }

  handleDocumentChange(document) {
    this.setState({ document });
  }

  async updateParentCertificate(obfuscateField) {
    if (inIframe()) {
      const { parentFrameConnection } = this.state;
      const parent = await parentFrameConnection;
      if (parent.updateCertificate) {
        parent.updateCertificate(obfuscateField);
      }
    }
  }

  async updateParentHeight() {
    if (inIframe()) {
      const { parentFrameConnection } = this.state;
      const parent = await parentFrameConnection;
      if (parent.updateHeight) {
        parent.updateHeight(document.documentElement.offsetHeight);
      }
    }
  }

  async updateParentTemplates(templates) {
    if (inIframe()) {
      const { parentFrameConnection } = this.state;
      const parent = await parentFrameConnection;
      if (parent.updateTemplates) {
        parent.updateTemplates(formatTemplate(templates));
      }
    }
  }

  render() {
    if (!this.state.document) {
      return (
        <input
          id="certificateContentsString"
          type="hidden"
          onChange={this.handleTextFieldChange}
        />
      );
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
