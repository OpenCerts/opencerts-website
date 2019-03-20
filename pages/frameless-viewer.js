import { connect } from "react-redux";
import Head from "next/head";
import FramelessViewerPageContainer from "../src/components/FramelessViewerPageContainer";

const FramelessViewerPage = () => (
  <div>
    <Head>
      <title>OpenCerts - Frameless Certificate Viewer</title>
    </Head>
    <FramelessViewerPageContainer />
  </div>
);

export default connect()(FramelessViewerPage);
