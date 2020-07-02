import { FrameConnector, LegacyHostActions } from "@govtechsg/decentralized-renderer-react-components";
import { getData, obfuscateDocument, utils, WrappedDocument, v2 } from "@govtechsg/open-attestation";
import React, { Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { LEGACY_OPENCERTS_RENDERER } from "../../config";
import { analyticsEvent, sendEventCertificateViewedDetailed } from "../Analytics";
import MultiTabs from "../MultiTabs";
import styles from "./decentralisedRenderer.module.scss";

interface DecentralisedRendererProps {
  rawDocument: WrappedDocument;
  updateObfuscatedCertificate: (certificate: WrappedDocument) => void;
  forwardedRef: Ref<{ print: () => void } | undefined>;
}
const DecentralisedRenderer: React.FunctionComponent<DecentralisedRendererProps> = ({
  rawDocument,
  updateObfuscatedCertificate,
  forwardedRef,
}) => {
  const toFrame = useRef<LegacyHostActions>();
  const documentRef = useRef(rawDocument);
  const document = useMemo(() => getData(rawDocument), [rawDocument]);
  const [height, setHeight] = useState(0);
  const [templates, setTemplates] = useState<{ id: string; label: string }[]>([]);

  useImperativeHandle(forwardedRef, () => ({
    print() {
      if (toFrame.current) {
        const hasPrintedFromFrame = toFrame.current.print && toFrame.current.print();
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore yup the typing is not correct, to fix =)
        if (!hasPrintedFromFrame) {
          window.print();
        }
      }
    },
  }));

  // actions
  const updateHeight = (h: number): void => {
    setHeight(h);
  };
  const updateTemplates = (t: { id: string; label: string }[]): void => {
    setTemplates(t);
  };
  const handleObfuscation = (field: string): void => {
    const updatedDocument = obfuscateDocument(documentRef.current, field);
    updateObfuscatedCertificate(updatedDocument);
    if (toFrame.current) toFrame.current.renderDocument(getData(updatedDocument), documentRef.current);
  };
  const onConnected = useCallback(
    (frame) => {
      toFrame.current = frame;
      if (toFrame.current) toFrame.current.renderDocument(document, rawDocument);
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

    certificateData.issuers.forEach((issuer: v2.Issuer) => {
      sendEventCertificateViewedDetailed({ issuer, certificateData });
    });
  }, [rawDocument]);

  return (
    <>
      <MultiTabs
        templates={templates}
        onSelectTemplate={(index) => {
          if (toFrame.current) toFrame.current.selectTemplateTab(index);
        }}
      />
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

export default DecentralisedRenderer;
