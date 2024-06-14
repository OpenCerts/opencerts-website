import {
  FrameActions,
  FrameConnector,
  HostActions,
  SvgRenderer,
  print,
  renderDocument,
  selectTemplate,
} from "@govtechsg/decentralized-renderer-react-components";
import { getData, obfuscateDocument, utils, v2, v3, v4 } from "@govtechsg/open-attestation";
import React, { Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { WrappedOrSignedOpenCertsDocument } from "../../shared";
import { getTemplate, opencertsGetData } from "../../utils/utils";
import {
  analyticsEvent,
  sendV2EventCertificateViewedDetailed,
  sendV3EventCertificateViewedDetailed,
  sendV4EventCertificateViewedDetailed,
  triggerV2RendererTimeoutLogging,
  triggerV3RendererTimeoutLogging,
  triggerV4RendererTimeoutLogging,
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
const CREDENTIAL_SUBJECT_PREFIX = "credentialSubject.";
const SVG_RENDERER_TYPE = "SvgRenderingTemplate2023";

const isSvgRenderMethod = (document: WrappedOrSignedOpenCertsDocument) => {
  if (!utils.isWrappedV4Document(document)) {
    return false;
  } else {
    const docAsV4 = document as v4.OpenAttestationDocument;
    return docAsV4.renderMethod?.find((method) => method.type === SVG_RENDERER_TYPE) !== undefined;
  }
};

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
  const [lastSelected, setLastSelected] = useState<string>("");

  const isSvg = isSvgRenderMethod(rawDocument);
  const svgRef = useRef<HTMLImageElement>(null);

  useImperativeHandle(forwardedRef, () => ({
    print() {
      if (toFrame.current) {
        const hasPrintTab = templates.filter((template) => template.id === "print").length > 0;
        if (!hasPrintTab) {
          toFrame.current(print());
        } else {
          // To support print all function
          toFrame.current(selectTemplate("print"));
          new Promise((resolve) => setTimeout(resolve, 500)).then(() => {
            toFrame.current?.(print());
            toFrame.current?.(selectTemplate(lastSelected));
          });
        }
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
        const field = utils.isWrappedV4Document(documentRef.current)
          ? CREDENTIAL_SUBJECT_PREFIX + action.payload
          : action.payload;
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
        } else if (utils.isWrappedV3Document(rawDocument)) {
          triggerV3RendererTimeoutLogging(rawDocument);
        } else {
          triggerV4RendererTimeoutLogging(rawDocument);
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
    if (utils.isWrappedV2Document(rawDocument)) {
      const certificateData = getData(rawDocument);
      analyticsEvent({
        category: "CERTIFICATE_VIEWED",
        options: {
          documentId: certificateData?.id ?? undefined,
          issuerId: `${certificateData.issuers.map((issuer) => issuer.id).join(",")}`,
        },
      });
    } else if (utils.isWrappedV3Document(rawDocument)) {
      const certificateData = opencertsGetData(rawDocument) as v3.OpenAttestationDocument;
      const storeAddresses = utils.getIssuerAddress(rawDocument);
      analyticsEvent({
        category: "CERTIFICATE_VIEWED",
        options: {
          documentId: certificateData?.id ?? undefined,
          documentStore: `${Array.isArray(storeAddresses) ? storeAddresses.join(",") : storeAddresses}`,
        },
      });
    } else {
      const rawDocumentAsv4 = rawDocument as v4.OpenAttestationDocument;
      analyticsEvent({
        category: "CERTIFICATE_VIEWED",
        options: {
          documentId: (rawDocumentAsv4?.credentialSubject.id as string) ?? undefined,
          issuerId: rawDocumentAsv4.issuer.id,
        },
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
    } else if (utils.isWrappedV3Document(rawDocument)) {
      sendV3EventCertificateViewedDetailed({ certificateData: rawDocument });
    } else {
      sendV4EventCertificateViewedDetailed({ certificateData: rawDocument });
    }
  }, [rawDocument]);

  const visibleTemplates = templates.filter((template) => template.id !== "print");
  return (
    <>
      <MutiTabsContainer
        templates={visibleTemplates}
        onSelectTemplate={(label) => {
          if (toFrame.current) {
            toFrame.current(selectTemplate(label));
            setLastSelected(label);
          }
        }}
      />
      <h2 className="print-only exact-print text-center py-8">
        If you want to print the certificate, please click on the highlighted button above.
      </h2>
      {!toFrame.current && !rendererTimeout && !isSvg && (
        <div className="container text-blue text-center py-16">
          <i className="fas fa-spinner fa-pulse fa-3x" />
          <div className="my-3">Loading Renderer...</div>
        </div>
      )}
      <div className={rendererTimeout ? "container text-center py-16" : ""}>
        {isSvg ? (
          <SvgRenderer
            className="mx-auto w-[70%] border border-black"
            document={rawDocument as v4.OpenAttestationDocument}
            ref={svgRef}
          />
        ) : (
          <FrameConnector
            className="w-full max-w-full"
            style={{ height: `${height}px` }}
            source={`${getTemplate(rawDocument)}`}
            dispatch={dispatch}
            onConnected={onConnected}
          />
        )}
      </div>
    </>
  );
};

// looks needed for dynamic import
// eslint-disable-next-line import/no-default-export
export default DecentralisedRenderer;
