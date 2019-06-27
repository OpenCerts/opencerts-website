import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import connectToChild from "penpal/lib/connectToChild";
import { obfuscateFields } from "@govtechsg/open-certificate";
import {
  getCertificate,
  getActiveTemplateTab,
  updateObfuscatedCertificate,
  registerTemplates as registerTemplatesAction,
  selectTemplateTab as selectTemplateTabAction
} from "../../reducers/certificate";

class DecentralisedRenderer extends Component {
  constructor(props) {
    super(props);
    this.connection = null;
  }

  selectTemplateTab(i) {
    this.connection.promise.then(iframe => iframe.selectTemplateTab(i));
    this.props.selectTemplateTab(i);
  }

  updateHeight(h) {
    this.iframe.height = h;
  }

  updateTemplates(templates) {
    if (!templates) return;
    this.props.registerTemplates(templates);
  }

  updateCertificate(field) {
    const updatedDocument = obfuscateFields(this.props.document, field);
    this.props.updateObfuscatedCertificate(updatedDocument);
    this.renderCertificate(updatedDocument);
  }

  renderCertificate(doc) {
    this.connection.promise.then(frame => frame.renderCertificate(doc));
  }

  // Do not re-render component if only activeTab changes
  shouldComponentUpdate(nextProps) {
    if (
      this.props.activeTab !== nextProps.activeTab &&
      this.props.certificate === nextProps.certificate
    ) {
      this.selectTemplateTab(nextProps.activeTab);
      return false;
    }
    return true;
  }

  componentDidMount() {
    const iframe = this.iframe;
    const certificate = this.props.certificate;
    const updateHeight = this.updateHeight.bind(this);
    const updateTemplates = this.updateTemplates.bind(this);
    const updateCertificate = this.updateCertificate.bind(this);
    this.connection = connectToChild({
      iframe,
      methods: {
        updateHeight,
        updateTemplates,
        updateCertificate
      }
    });
    this.renderCertificate(certificate);
  }

  render() {
    return (
      <iframe
        title="Decentralised Rendered Certificate"
        id="iframe"
        ref={iframe => {
          this.iframe = iframe;
        }}
        src={this.props.template.url}
        style={{ width: "100%", border: 0 }}
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
  template: PropTypes.object,
  activeTab: PropTypes.number,
  registerTemplates: PropTypes.func,
  selectTemplateTab: PropTypes.func,
  updateObfuscatedCertificate: PropTypes.func
};
