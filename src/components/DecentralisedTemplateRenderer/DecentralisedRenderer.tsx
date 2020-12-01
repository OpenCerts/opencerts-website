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

interface DecentralisedRendererProps {
  rawDocument: WrappedDocument<v2.OpenAttestationDocument>;
  updateObfuscatedCertificate: (certificate: WrappedDocument<v2.OpenAttestationDocument>) => void;
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
    let action: string;
    if (utils.isSignedWrappedV2Document(rawDocument)) {
      action = certificateData.issuers.map((issuer) => issuer.id).join(",");
    } else {
      const storeAddresses = utils.getIssuerAddress(rawDocument);
      action = Array.isArray(storeAddresses) ? storeAddresses.join(",") : storeAddresses;
    }
    analyticsEvent(window, {
      category: "CERTIFICATE_VIEWED",
      action,
      label: certificateData?.id ?? undefined,
    });

    certificateData.issuers.forEach((issuer: v2.Issuer) => {
      sendEventCertificateViewedDetailed({
        issuer,
        certificateData,
      });
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
      <h2 className="print-only exact-print text-center py-8">
        If you want to print the certificate, please click on the highlighted button above.
      </h2>
      {!toFrame.current && (
        <div className="container text-blue text-center py-16">
          <i className="fas fa-spinner fa-pulse fa-3x" />
          <div className="my-3">Loading Renderer...</div>
        </div>
      )}
      <FrameConnector
        className="w-full max-w-full"
        style={{ height: `${height}px` }}
        source={`${typeof document.$template === "object" ? document.$template.url : LEGACY_OPENCERTS_RENDERER}`}
        dispatch={dispatch}
        onConnected={onConnected}
      />
    </>
  );
};

// looks needed for dynamic import
// eslint-disable-next-line import/no-default-export
export default DecentralisedRenderer;
