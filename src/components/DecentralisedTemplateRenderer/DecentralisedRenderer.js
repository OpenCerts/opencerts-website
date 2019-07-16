import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import connectToChild from "penpal/lib/connectToChild";
import { getData, obfuscateDocument } from "@govtechsg/open-attestation";
import { get } from "lodash";
import {
  getCertificate,
  getActiveTemplateTab,
  updateObfuscatedCertificate,
  registerTemplates as registerTemplatesAction,
  selectTemplateTab as selectTemplateTabAction
} from "../../reducers/certificate";
import { analyticsEvent } from "../Analytics";
import { getAnalyticsStores } from "../../sagas/certificate";

class DecentralisedRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childFrameConnection: null
    };
  }

  async selectTemplateTab(i) {
    const { childFrameConnection } = this.state;
    const child = await childFrameConnection;
    await child.selectTemplateTab(i);
    this.props.selectTemplateTab(i);
  }

  updateHeight(h) {
    this.iframe.height = h;
  }

  updateTemplates(templates) {
    if (!templates) return;
    this.props.registerTemplates(templates);
  }

  handleObfuscation(field) {
    const updatedDocument = obfuscateDocument(this.props.document, field);
    this.props.updateObfuscatedCertificate(updatedDocument);
    const updatedCertificate = getData(updatedDocument);
    this.renderDocument(updatedCertificate);
  }

  async renderDocument(certificate) {
    const { childFrameConnection } = this.state;
    const child = await childFrameConnection;
    await child.renderDocument(certificate);
  }

  // Do not re-render component if only activeTab changes
  shouldComponentUpdate(nextProps) {
    if (
      this.props.activeTab !== nextProps.activeTab &&
      this.props.document === nextProps.document
    ) {
      this.selectTemplateTab(nextProps.activeTab);
      return false;
    }
    return true;
  }

  componentDidMount() {
    const iframe = this.iframe;
    const updateHeight = this.updateHeight.bind(this);
    const updateTemplates = this.updateTemplates.bind(this);
    const handleObfuscation = this.handleObfuscation.bind(this);
    const childFrameConnection = connectToChild({
      iframe,
      methods: {
        updateHeight,
        updateTemplates,
        handleObfuscation
      }
    }).promise;
    this.setState({ childFrameConnection });

    childFrameConnection.then(frame =>
      frame.renderDocument(getData(this.props.certificate))
    );

    analyticsEvent(window, {
      category: "CERTIFICATE_VIEWED",
      action: getAnalyticsStores(getData(this.props.certificate)),
      label: get(getData(this.props.certificate), "id")
    });
  }

  render() {
    return (
      <iframe
        title="Decentralised Rendered Certificate"
        id="iframe"
        ref={iframe => {
          this.iframe = iframe;
        }}
        src={this.props.source}
        style={{ width: "100%", border: 0, position: "relative" }}
      />
    );
  }
}

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
)(DecentralisedRenderer);

DecentralisedRenderer.propTypes = {
  document: PropTypes.object,
  certificate: PropTypes.object,
  source: PropTypes.string,
  activeTab: PropTypes.number,
  registerTemplates: PropTypes.func,
  selectTemplateTab: PropTypes.func,
  updateObfuscatedCertificate: PropTypes.func
};
