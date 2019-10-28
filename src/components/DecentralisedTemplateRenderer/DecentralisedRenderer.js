import React, { useCallback, useEffect, useState, useRef } from "react";
import { FrameConnector } from "@govtechsg/decentralized-renderer-react-components";
import { getData, obfuscateDocument } from "@govtechsg/open-attestation";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LEGACY_OPENCERTS_RENDERER } from "../../config";
import styles from "./decentralisedRenderer.scss";
import MultiTabs from "../MultiTabs";
import { updateObfuscatedCertificate as updateObfuscatedCertificateAction } from "../../reducers/certificate";
import { analyticsEvent } from "../Analytics";
import { getDocumentIssuerStores } from "../../utils/certificate";

export const DecentralisedRenderer = ({
  rawDocument,
  updateObfuscatedCertificate
}) => {
  const toFrame = useRef();
  const documentRef = useRef(rawDocument);
  const [height, setHeight] = useState(0);
  const [templates, setTemplates] = useState([]);
  const document = getData(rawDocument);

  // actions
  const updateHeight = h => {
    setHeight(h);
  };
  const updateTemplates = t => {
    setTemplates(t);
  };
  const handleObfuscation = field => {
    const updatedDocument = obfuscateDocument(documentRef.current, field);
    updateObfuscatedCertificate(updatedDocument);
    toFrame.current.renderDocument(
      getData(updatedDocument),
      documentRef.current
    );
  };
  const onConnected = useCallback(frame => {
    toFrame.current = frame;
    toFrame.current.renderDocument(document, rawDocument);
  }, []);

  // effects
  // update document after every changes
  useEffect(() => {
    documentRef.current = rawDocument;
  }, [rawDocument]);

  // send analytics on which document has been displayed
  useEffect(() => {
    const certificateData = getData(rawDocument);
    analyticsEvent(window, {
      category: "CERTIFICATE_VIEWED",
      action: getDocumentIssuerStores(certificateData),
      label: certificateData ? certificateData.id : null
    });
  }, []);

  return (
    <>
      <MultiTabs
        templates={templates}
        onSelectTemplate={index => toFrame.current.selectTemplateTab(index)}
      />
      <div>
        <div id={styles["renderer-loader"]} className="text-blue">
          <i className="fas fa-spinner fa-pulse fa-3x" />
          <div className="m-3" style={{ fontSize: "1.5rem" }}>
            Loading Renderer...
          </div>
        </div>
        <FrameConnector
          className={styles["decentralised-renderer"]}
          style={{ height: `${height}px` }}
          source={`${
            typeof rawDocument.data.$template === "object"
              ? document.$template.url
              : LEGACY_OPENCERTS_RENDERER
          }`}
          methods={{ updateHeight, updateTemplates, handleObfuscation }}
          onConnected={onConnected}
        />
      </div>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  updateObfuscatedCertificate: updatedDoc =>
    dispatch(updateObfuscatedCertificateAction(updatedDoc))
});

export default connect(
  null,
  mapDispatchToProps
)(DecentralisedRenderer);

DecentralisedRenderer.propTypes = {
  rawDocument: PropTypes.object,
  updateObfuscatedCertificate: PropTypes.func
};
