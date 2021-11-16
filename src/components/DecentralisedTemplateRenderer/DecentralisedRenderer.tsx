import {
  FrameActions,
  FrameConnector,
  HostActions,
  print,
  renderDocument,
  selectTemplate,
} from "@govtechsg/decentralized-renderer-react-components";
import { getData, obfuscateDocument, utils, v2 } from "@govtechsg/open-attestation";
import React, { Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { WrappedOrSignedOpenCertsDocument } from "../../shared";
import { getTemplate, opencertsGetData } from "../../utils/utils";
import {
  analyticsEvent,
  sendV2EventCertificateViewedDetailed,
  sendV3EventCertificateViewedDetailed,
  triggerV2RendererTimeoutLogging,
  triggerV3RendererTimeoutLogging,
} from "../Analytics";
import { MutiTabsContainer } from "../MultiTabs";

interface DecentralisedRendererProps {
  rawDocument: WrappedOrSignedOpenCertsDocument;
  updateObfuscatedCertificate: (certificate: WrappedOrSignedOpenCertsDocument) => void;
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
  const documentData = useMemo(() => opencertsGetData(rawDocument), [rawDocument]);
  const [rendererTimeout, setRendererTimeout] = useState(false);
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
        toFrame.current(renderDocument({ document: documentData, rawDocument }));
      }
    },
    [documentData, rawDocument]
  );

  const dispatch = useCallback(
    (action: FrameActions): void => {
      if (action.type === "UPDATE_HEIGHT") {
        // adding SCROLLBAR_WIDTH in case the frame content overflow horizontally, which will cause scrollbars to appear
        setHeight(action.payload + SCROLLBAR_WIDTH);
      } else if (action.type === "OBFUSCATE") {
        const field = action.payload;
        // https://github.com/microsoft/TypeScript/issues/14107 overload does not support union :/
        const updatedDocument = utils.isWrappedV2Document(documentRef.current)
          ? obfuscateDocument(documentRef.current, field)
          : obfuscateDocument(documentRef.current, field);
        updateObfuscatedCertificate(updatedDocument);
        const newDocument = opencertsGetData(updatedDocument);

        if (toFrame.current) {
          toFrame.current(renderDocument({ document: newDocument, rawDocument: documentRef.current }));
        }
      } else if (action.type === "UPDATE_TEMPLATES") {
        setTemplates(action.payload);
      } else if (action.type === "TIMEOUT") {
        setRendererTimeout(true);

        // CERTIFICATE_RENDERER_TIMEOUT event
        if (utils.isWrappedV2Document(rawDocument)) {
          triggerV2RendererTimeoutLogging(rawDocument);
        } else {
          triggerV3RendererTimeoutLogging(rawDocument);
        }
      }
    },
    [toFrame, updateObfuscatedCertificate, rawDocument]
  );

  // effects
  // update document after every changes
  useEffect(() => {
    documentRef.current = rawDocument;
  }, [rawDocument]);

  // send analytics on which document has been displayed
  useEffect(() => {
    // CERTIFICATE_VIEWED event
    if (utils.isSignedWrappedV2Document(rawDocument)) {
      const certificateData = getData(rawDocument);
      analyticsEvent(window, {
        category: "CERTIFICATE_VIEWED",
        action: certificateData.issuers.map((issuer) => issuer.id).join(","),
        label: certificateData?.id ?? undefined,
      });
    } else {
      const certificateData = opencertsGetData(rawDocument);
      const storeAddresses = utils.getIssuerAddress(rawDocument);
      analyticsEvent(window, {
        category: "CERTIFICATE_VIEWED",
        action: Array.isArray(storeAddresses) ? storeAddresses.join(",") : storeAddresses,
        label: certificateData?.id ?? undefined,
      });
    }

    // CERTIFICATE_DETAILS event
    if (utils.isWrappedV2Document(rawDocument)) {
      const certificateData = getData(rawDocument);
      certificateData.issuers.forEach((issuer: v2.Issuer) => {
        sendV2EventCertificateViewedDetailed({
          issuer,
          certificateData,
        });
      });
    } else {
      sendV3EventCertificateViewedDetailed({ certificateData: rawDocument });
    }
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
      {!toFrame.current && !rendererTimeout && (
        <div className="container text-blue text-center py-16">
          <i className="fas fa-spinner fa-pulse fa-3x" />
          <div className="my-3">Loading Renderer...</div>
        </div>
      )}
      <div className={rendererTimeout ? "container text-center py-16" : ""}>
        <FrameConnector
          className="w-full max-w-full"
          style={{ height: `${height}px` }}
          source={`${getTemplate(rawDocument)}`}
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
