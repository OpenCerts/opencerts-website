import { connect } from "react-redux";
import Head from "next/head";
import DecentralisedRenderer from "../src/components/DecentralisedTemplateRenderer/DecentralisedRenderer";

const data = {
  type: "",
  name: "",
  url: "http://localhost:3000/frameless-viewer"
};

const certificate = require("../src/components/CertificateTemplates/tlds/sg/gov/tech/Govtech-Demo-Cert/Ropsten-Demo.json");

const DecentralisedTemplateRenderer = () => (
  <div>
    <Head>
      <title>OpenCerts - Decentralised Template Renderer</title>
    </Head>
    <DecentralisedRenderer data={data} certificate={certificate} />
  </div>
);

export default connect()(DecentralisedTemplateRenderer);
