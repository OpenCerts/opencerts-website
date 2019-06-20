import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import { certificateData } from "@govtechsg/open-certificate";
// import connectToParent from "penpal/lib/connectToParent";
import connectToChild from "penpal/lib/connectToChild";
import {
  getCertificate,
  getTemplates as getTemplatesAction,
  selectTemplateTab as selectTemplateTabAction,
  getActiveTemplateTab,
  registerTemplates as registerTemplatesAction
} from "../../reducers/certificate";
// import MultiCertificateRenderer from "../CertificateTemplates/utils/MultiCertificateRenderer";

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

  //   updateTemplates(templates) {
  //     if (!templates) return;
  //     this.props.registerTemplates(templates);
  //   }

  renderCertificate(doc) {
    this.connection.promise.then(frame => frame.renderCertificate(doc));
  }

  componentDidMount() {
    const iframe = this.iframe;
    const certificate = this.props.certificate;
    const updateHeight = this.updateHeight.bind(this);
    // const updateTemplates = this.updateTemplates.bind(this);
    this.connection = connectToChild({
      iframe,
      methods: {
        updateHeight
        // updateTemplates
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
        src={this.props.data.url}
        style={{ width: "100%", border: 0 }}
      />
    );
  }
}

const mapStateToProps = store => ({
  document: getCertificate(store),
  templates: getTemplatesAction(store),
  activeTab: getActiveTemplateTab(store) // required to trigger componentDidUpdate when tab changes
});

const mapDispatchToProps = dispatch => ({
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
  selectTemplateTab: PropTypes.func.isRequired,
  templates: PropTypes.array,
  data: PropTypes.object
  //   registerTemplates: PropTypes.func
};
