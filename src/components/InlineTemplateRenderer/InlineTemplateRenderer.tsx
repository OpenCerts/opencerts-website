import {
  decompressInlineHtmlTemplate,
  getRenderMethods,
  printInlineHtmlTemplate,
  renderInlineHtmlTemplate,
} from "@trustvc/trustvc";
import React, { Ref, useEffect, useImperativeHandle, useRef } from "react";
import { WrappedOrSignedOpenCertsDocument } from "../../shared";
import { MutiTabsContainer } from "../MultiTabs";

/** True when the document carries its own `INLINE_HTML_TEMPLATE` renderMethod entry, compressed or not. */
export const hasInlineTemplateRenderMethod = (document: unknown): boolean =>
  !!getRenderMethods(document).inlineHtmlTemplate;

interface InlineTemplateRendererProps {
  rawDocument: WrappedOrSignedOpenCertsDocument;
  /** Called when the template can't be decompressed or rendered, so the viewer can fall back to the renderer URL. */
  onFailure?: () => void;
  forwardedRef: Ref<{ print: () => void } | undefined>;
}

/**
 * Renders a credential from its own `INLINE_HTML_TEMPLATE` renderMethod entry instead of a remote
 * decentralised renderer.
 *
 * trustvc's `renderInlineTemplate` fills the template against `credentialSubject` and mounts it
 * in a sandboxed `srcdoc` iframe inside the host element. The template is issuer-controlled
 * HTML, so it never reaches this page's DOM: in the frame nothing can run, nothing remote can
 * load, and it cannot draw over the verification status above it. This component only owns the
 * host element. Its ref exposes `print()`, the same interface DecentralisedRenderer exposes.
 */
export const InlineTemplateRenderer: React.FunctionComponent<InlineTemplateRendererProps> = ({
  rawDocument,
  onFailure,
  forwardedRef,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  // Kept in a ref so a new callback identity from the viewer doesn't re-run the render effect.
  const onFailureRef = useRef(onFailure);
  onFailureRef.current = onFailure;

  useImperativeHandle(forwardedRef, () => ({
    print() {
      if (hostRef.current) printInlineHtmlTemplate(hostRef.current);
    },
  }));

  useEffect(() => {
    let cancelled = false;
    // A string `template` is gzipped (it was signed in that form), so inflate it before rendering.
    decompressInlineHtmlTemplate(rawDocument)
      .then((decompressed) => {
        if (cancelled || !hostRef.current) return;
        if (!renderInlineHtmlTemplate(decompressed, hostRef.current)) {
          throw new Error("No renderable INLINE_HTML_TEMPLATE entry");
        }
      })
      .catch((e) => {
        if (cancelled) return;
        console.error("Failed to render inline template", e);
        onFailureRef.current?.();
      });
    return () => {
      cancelled = true;
    };
  }, [rawDocument]);

  return (
    <>
      {/* The strip DecentralisedRenderer draws above its frame, with no template tabs: an inline
          template has a single view, but "View another" keeps its usual place. */}
      <MutiTabsContainer templates={[]} onSelectTemplate={() => undefined} />
      <div className="w-full max-w-full" ref={hostRef} data-testid="inline-template-renderer" />
    </>
  );
};
