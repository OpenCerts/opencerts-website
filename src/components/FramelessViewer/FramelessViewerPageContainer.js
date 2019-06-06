import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  certificateData,
  validateSchema,
  verifySignature
} from "@govtechsg/open-certificate";
import connectToParent from "penpal/lib/connectToParent";
import styles from "../certificateViewer.scss";
import {
  updateCertificate,
  getCertificate,
  getTemplates as getTemplatesAction,
  getActiveTemplateTab,
  selectTemplateTab as selectTemplateTabAction
} from "../../reducers/certificate";
import FramelessCertificateViewer from "./FramelessCertificateViewer";
import { getLogger } from "../../utils/logger";

const { trace } = getLogger("components:FramelessViewerPageContainer");

const inIframe = () => window.location !== window.parent.location;
const formatTemplate = template =>
  template ? template.map(o => ({ label: o.label, id: o.id })) : null;

class FramelessViewerContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCertificateChange = this.handleCertificateChange.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.state = { parentFrameConnection: null };
  }

  componentDidUpdate() {
    if (inIframe()) {
      this.state.parentFrameConnection.promise.then(parent => {
        if (parent.updateHeight)
          parent.updateHeight(document.documentElement.scrollHeight);
        if (parent.updateTemplates)
          parent.updateTemplates(formatTemplate(this.props.templates));
      });
    }
  }

  
  /**
   * Upon mounting, the frameless viewer will expose two ways to interact with it: postMessage and window.opencerts method
   * 
   * On mobile webViews: CORS is not implemented and window.opencerts can be called directly. 
   * On browsers: CORS is implemented and the parent website can only interact with this iframe via postMessage.
   * 
   * Three methods, getTemplates, renderCertificate and selectTemplateTab is available for both implementation
   * 
   * renderCertificate(certificate)
   * The function takes in a certificate object and render it in the frame. Upon rendering, the getTemplate() function can 
   * be used to query the number (and labels) of tabs available to this certificate. Then, selectTemplateTab(index) can be 
   * used to select the index of the tab to be displayed.
   * 
   * 
   * getTemplate()
   * returns an array of templates available for a given certificate, each template has both id and label properties.
   * example of returned array:
   * [{
   *   id: "certificate",
   *   label: "Certificate"
   * },{
   *   id: "transcript",
   *   label: "Transcript"
   * }]
   * 
   * selectTemplateTab(index)
   * The function is used to select the tab to render the certificate. The index, corresponding to the getTemplate results, 
   * is needed to select which tab to render.
   * 
   * Only for iframes:
   * 
   * frameHeight()
   * returns the height of the component to allow parent component to scale accordingly. This is used to remove the double
   * scrollbar issue. 
   */
  componentDidMount() {
    const { selectTemplateTab } = this.props;
    const getTemplates = () => formatTemplate(this.props.templates);
    const renderCertificate = this.handleCertificateChange;
    const frameHeight = document.documentElement.scrollHeight;

    window.opencerts = {
      getTemplates,
      renderCertificate,
      selectTemplateTab
    };

    if (inIframe()) {
      const parentFrameConnection = connectToParent({
        methods: {
          renderCertificate,
          selectTemplateTab,
          getTemplates,
          frameHeight
        }
      });
      this.setState({ parentFrameConnection });
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
  templates: getTemplatesAction(store),
  activeTab: getActiveTemplateTab(store) // required to trigger componentDidUpdate when tab changes
});

const mapDispatchToProps = dispatch => ({
  updateCertificate: payload => dispatch(updateCertificate(payload)),
  selectTemplateTab: tabIndex => dispatch(selectTemplateTabAction(tabIndex))
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
