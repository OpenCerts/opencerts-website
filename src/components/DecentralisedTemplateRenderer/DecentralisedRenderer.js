import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import connectToChild from "penpal/lib/connectToChild";
import {
  registerTemplates as registerTemplatesAction,
  selectTemplateTab as selectTemplateTabAction
} from "../../reducers/certificate";

class DecentralisedRenderer extends Component {
  constructor(props) {
    super(props);
    this.connection = null;
  }

  selectTemplateTab(i) {
    this.connection.promise.then(frame => frame.selectTemplateTab(i));
  }

  updateHeight(h) {
    this.iframe.height = h;
  }

  updateTemplates(templates) {
    if (!templates) return;
    this.props.registerTemplates(templates);
  }

  renderCertificate(doc) {
    this.connection.promise.then(frame => frame.renderCertificate(doc));
  }

  // Do not re-render component if only tabId changes
  shouldComponentUpdate(nextProps) {
    if (
      this.props.tabId !== nextProps.tabId &&
      this.props.certificate === nextProps.certificate
    ) {
      this.selectTemplateTab(nextProps.tabId);
      return false;
    }
    return true;
  }

  componentDidMount() {
    const iframe = this.iframe;
    const certificate = this.props.certificate;
    const updateHeight = this.updateHeight.bind(this);
    const updateTemplates = this.updateTemplates.bind(this);
    this.connection = connectToChild({
      iframe,
      methods: {
        updateHeight,
        updateTemplates
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

const mapDispatchToProps = dispatch => ({
  registerTemplates: templates => dispatch(registerTemplatesAction(templates)),
  selectTemplateTab: tabIndex => dispatch(selectTemplateTabAction(tabIndex))
});

export default connect(
  null,
  mapDispatchToProps
)(DecentralisedRenderer);

DecentralisedRenderer.propTypes = {
  certificate: PropTypes.object,
  template: PropTypes.object,
  tabId: PropTypes.number,
  registerTemplates: PropTypes.func,
  selectTemplateTab: PropTypes.func
};
