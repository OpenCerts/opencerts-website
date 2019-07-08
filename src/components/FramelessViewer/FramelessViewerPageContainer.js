import React, { Component } from "react";
import { validateSchema, verifySignature } from "@govtechsg/open-attestation";
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
    this.obfuscateDocument = this.obfuscateDocument.bind(this);
    this.state = {
      parentFrameConnection: null,
      document: null,
      tabIndex: 0
    };
  }

  componentDidUpdate() {
    this.updateParentHeight();
  }

  componentDidMount() {
    const selectTemplateTab = this.selectTemplateTab;
    const renderDocument = this.handleDocumentChange;

    window.opencerts = {
      renderDocument,
      selectTemplateTab
    };

    if (inIframe()) {
      const parentFrameConnection = connectToParent({
        methods: {
          renderDocument,
          selectTemplateTab
        }
      }).promise;
      this.setState({ parentFrameConnection });
    }
    this.updateHeightWhenResize();
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
    this.obfuscateDocument(fieldContents);
  }

  async selectTemplateTab(tabIndex) {
    if (inIframe()) {
      const { parentFrameConnection } = this.state;
      const parent = await parentFrameConnection;
      if (parent.selectTemplateTab) {
        await parent.selectTemplateTab(tabIndex);
      }
    }
    this.setState({ tabIndex });
  }

  handleDocumentChange(document) {
    this.setState({ document });
  }

  updateHeightWhenResize() {
    window.addEventListener("resize", this.updateParentHeight);
  }

  async obfuscateDocument(field) {
    if (inIframe()) {
      const { parentFrameConnection } = this.state;
      const parent = await parentFrameConnection;
      if (parent.updateCertificate) {
        parent.updateCertificate(field);
      }
    }
  }

  async updateParentHeight() {
    if (inIframe()) {
      const { parentFrameConnection } = this.state;
      const parent = await parentFrameConnection;
      if (parent.updateHeight) {
        await parent.updateHeight(document.documentElement.offsetHeight);
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
      <div className="frameless-tabs" id="rendered-certificate">
        <FramelessCertificateViewer
          id={styles["frameless-container"]}
          tabIndex={this.state.tabIndex}
          document={this.state.document}
          updateParentHeight={this.updateParentHeight}
          updateParentTemplates={this.updateParentTemplates}
          obfuscateDocument={this.obfuscateDocument}
        />
      </div>
    );
  }
}

export default FramelessViewerContainer;
