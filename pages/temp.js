import { connect } from "react-redux";
import { Component } from "react";
import Head from "next/head";
import DecentralisedRenderer from "../src/components/DecentralisedTemplateRenderer/DecentralisedRenderer";

const template = {
  type: "",
  name: "",
  url: "http://localhost:3000/frameless-viewer"
};

const certificate = require("../src/components/CertificateTemplates/tlds/sg/gov/tech/Govtech-Demo-Cert/Ropsten-Demo.json");

class DecentralisedTemplateRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabId: 0
    };
    this.toggletab = this.toggletab.bind(this);
  }

  toggletab() {
    console.log(this.state.tabId);
    this.setState({ tabId: this.state.tabId + 1 });
  }

  render() {
    return (
      <div>
        <Head>
          <title>OpenCerts - Decentralised Template Renderer</title>
        </Head>
        <button onClick={this.toggletab}>Click Me</button>
        <DecentralisedRenderer
          template={template}
          certificate={certificate}
          tabId={this.state.tabId}
        />
      </div>
    );
  }
}

export default connect()(DecentralisedTemplateRenderer);
