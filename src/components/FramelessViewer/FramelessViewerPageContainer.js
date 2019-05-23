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
const flatten = o => JSON.parse(JSON.stringify(o));
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
          parent.updateTemplates(flatten(this.props.templates));
      });
    }
  }

  componentDidMount() {
    const { selectTemplateTab } = this.props;
    const getTemplates = () => flatten(this.props.templates);
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
