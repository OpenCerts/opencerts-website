import {
  FrameActions,
  FrameConnector,
  HostActions,
  renderDocument,
  selectTemplate,
  print,
} from "@govtechsg/decentralized-renderer-react-components";
import { getData, obfuscateDocument, utils, v2, WrappedDocument } from "@govtechsg/open-attestation";
import React, { Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { LEGACY_OPENCERTS_RENDERER } from "../../config";
import { analyticsEvent, sendEventCertificateViewedDetailed } from "../Analytics";
import { MutiTabsContainer } from "../MultiTabs";
import styles from "./decentralisedRenderer.module.scss";

interface DecentralisedRendererProps {
  rawDocument: WrappedDocument;
  updateObfuscatedCertificate: (certificate: WrappedDocument) => void;
  forwardedRef: Ref<{ print: () => void } | undefined>;
}

type Dispatch = (action: HostActions) => void;
// giving scrollbar a default width as there are no perfect ways to get it
const SCROLLBAR_WIDTH = 20;

const DecentralisedRenderer: React.FunctionComponent<DecentralisedRendererProps> = ({
  rawDocument,
  updateObfuscatedCertificate,
  forwardedRef,
}) => {
  const toFrame = useRef<Dispatch>();
  const documentRef = useRef(rawDocument);
  const document = useMemo(() => getData(rawDocument), [rawDocument]);
  const [height, setHeight] = useState(0);
  const [templates, setTemplates] = useState<{ id: string; label: string }[]>([]);

  useImperativeHandle(forwardedRef, () => ({
    print() {
      if (toFrame.current) {
        toFrame.current(print());
      }
    },
  }));

  const onConnected = useCallback(
    (frame) => {
      toFrame.current = frame;
      if (toFrame.current) {
        toFrame.current(renderDocument({ document, rawDocument }));
      }
    },
    [document, rawDocument]
  );

  const dispatch = (action: FrameActions): void => {
    if (action.type === "UPDATE_HEIGHT") {
      // adding SCROLLBAR_WIDTH in case the frame content overflow horizontally, which will cause scrollbars to appear
      setHeight(action.payload + SCROLLBAR_WIDTH);
    } else if (action.type === "OBFUSCATE") {
      const field = action.payload;
      const updatedDocument = obfuscateDocument(documentRef.current, field);
      updateObfuscatedCertificate(updatedDocument);
      const newDocument = getData(updatedDocument);

      if (toFrame.current) {
        toFrame.current(renderDocument({ document: newDocument, rawDocument: documentRef.current }));
      }
    } else if (action.type === "UPDATE_TEMPLATES") {
      setTemplates(action.payload);
    }
  };

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

    certificateData.issuers.forEach((issuer: v2.Issuer) => {
      sendEventCertificateViewedDetailed({ issuer, certificateData });
    });
  }, [rawDocument]);

  return (
    <>
      <MutiTabsContainer
        templates={templates}
        onSelectTemplate={(label) => {
          if (toFrame.current) {
            toFrame.current(selectTemplate(label));
          }
        }}
      />
      <div>
        <h2 className="print-only exact-print text-center center m-4 mb-3 mt-5 alert alert-warning">
          If you want to print the certificate, please click on the highlighted button above.
        </h2>
        {!toFrame.current && (
          <div id={styles["renderer-loader"]} className="text-blue">
            <i className="fas fa-spinner fa-pulse fa-3x" />
            <div className="m-3" style={{ fontSize: "1.5rem" }}>
              Loading Renderer...
            </div>
          </div>
        )}
        <FrameConnector
          className={styles["decentralised-renderer"]}
          style={{ height: `${height}px` }}
          source={`${
            typeof rawDocument.data.$template === "object" ? document.$template.url : LEGACY_OPENCERTS_RENDERER
          }`}
          dispatch={dispatch}
          onConnected={onConnected}
        />
      </div>
    </>
  );
};

// looks needed for dynamic import
// eslint-disable-next-line import/no-default-export
export default DecentralisedRenderer;
