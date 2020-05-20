import { FrameConnector } from "@govtechsg/decentralized-renderer-react-components";
import { getData, obfuscateDocument, utils } from "@govtechsg/open-attestation";
import PropTypes from "prop-types";
import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { LEGACY_OPENCERTS_RENDERER } from "../../config";
import { analyticsEvent } from "../Analytics";
import MultiTabs from "../MultiTabs";
import styles from "./decentralisedRenderer.scss";

const DecentralisedRenderer = ({ rawDocument, updateObfuscatedCertificate, forwardedRef }) => {
  const toFrame = useRef();
  const documentRef = useRef(rawDocument);
  const [height, setHeight] = useState(0);
  const [templates, setTemplates] = useState([]);
  const document = getData(rawDocument);

  useImperativeHandle(forwardedRef, () => ({
    print() {
      const hasPrintedFromFrame = toFrame.current.print && toFrame.current.print();
      if (!hasPrintedFromFrame) {
        window.print();
      }
    },
  }));

  // actions
  const updateHeight = (h) => {
    setHeight(h);
  };
  const updateTemplates = (t) => {
    setTemplates(t);
  };
  const handleObfuscation = (field) => {
    const updatedDocument = obfuscateDocument(documentRef.current, field);
    updateObfuscatedCertificate(updatedDocument);
    toFrame.current.renderDocument(getData(updatedDocument), documentRef.current);
  };
  const onConnected = useCallback(
    (frame) => {
      toFrame.current = frame;
      toFrame.current.renderDocument(document, rawDocument);
    },
    [document, rawDocument]
  );

  // effects
  // update document after every changes
  useEffect(() => {
    documentRef.current = rawDocument;
  }, [rawDocument]);

  // send analytics on which document has been displayed
  useEffect(() => {
    const certificateData = getData(rawDocument);
    const storeAddresses = utils.getIssuerAddress(rawDocument);
    analyticsEvent(window, {
      category: "CERTIFICATE_VIEWED",
      action: Array.isArray(storeAddresses) ? storeAddresses.join(",") : storeAddresses,
      label: certificateData ? certificateData.id : null,
    });
  }, [rawDocument]);

  return (
    <>
      <MultiTabs templates={templates} onSelectTemplate={(index) => toFrame.current.selectTemplateTab(index)} />
      <div>
        <h2 className="print-only exact-print text-center center m-4 mb-3 mt-5 alert alert-warning">
          If you want to print the certificate, please click on the highlighted button above.
        </h2>
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
            typeof rawDocument.data.$template === "object" ? document.$template.url : LEGACY_OPENCERTS_RENDERER
          }`}
          methods={{ updateHeight, updateTemplates, handleObfuscation }}
          onConnected={onConnected}
        />
      </div>
    </>
  );
};

DecentralisedRenderer.propTypes = {
  rawDocument: PropTypes.object,
  updateObfuscatedCertificate: PropTypes.func,
  forwardedRef: PropTypes.any,
};

export default DecentralisedRenderer;
