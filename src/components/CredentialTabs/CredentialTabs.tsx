import { VerificationFragment } from "@trustvc/trustvc";
import dynamic from "next/dynamic";
import React, { Ref, useImperativeHandle, useMemo, useRef, useState } from "react";
import { EmbeddedVerifiableCredential, WrappedOrSignedOpenCertsDocument } from "../../shared";
import { asOpenCertsDocument, getCredentialLabel, getPresentationCredentials } from "../../utils/presentation";
import { CertificateVerifyBlock } from "../CertificateVerifyBlock";
import { ViewAnotherButtonContainer } from "../ViewAnotherButton";

const DecentralisedRenderer = dynamic(() => import("../DecentralisedTemplateRenderer/DecentralisedRenderer"), {
  ssr: false,
});

interface CredentialTabsProps {
  presentation: WrappedOrSignedOpenCertsDocument;
  verificationStatus: VerificationFragment[];
  forwardedRef: Ref<{ print: () => void } | undefined>;
}

/**
 * Renders each credential embedded in a Verifiable Presentation on its own tab.
 *
 * A presentation is a bundle, so there is no single certificate to render: each credential
 * carries its own renderer template and its own issuer. Each tab therefore presents its
 * credential exactly as the viewer presents a standalone certificate — the same verify block
 * over the same renderer — while the block above reports on the envelope: who presented it,
 * and whether the envelope itself holds up.
 */
export const CredentialTabs: React.FunctionComponent<CredentialTabsProps> = ({
  presentation,
  verificationStatus,
  forwardedRef,
}) => {
  const credentials = useMemo(() => getPresentationCredentials(presentation), [presentation]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rendererRef = useRef<{ print: () => void }>();

  // The viewer's print button prints whichever credential is on screen — printing a bundle of
  // unrelated certificates from one button would be a surprise.
  useImperativeHandle(forwardedRef, () => ({
    print() {
      rendererRef.current?.print();
    },
  }));

  /**
   * The selected tab, stamped with the presentation it was chosen in.
   *
   * Resetting this in an effect instead leaves one render in between, so a newly loaded
   * presentation is rendered with the previous one's index still in place — pointing past the
   * end when the new one holds fewer credentials. Deriving the index means it is never out of
   * range at all.
   */
  const [selection, setSelection] = useState<{ presentation: unknown; index: number }>({ presentation, index: 0 });
  const selected =
    selection.presentation === presentation && selection.index < credentials.length ? selection.index : 0;
  const select = (index: number): void => setSelection({ presentation, index });

  /**
   * Arrow/Home/End movement between tabs, per the ARIA tabs pattern. With the roving tabIndex
   * below, Tab leaves the strip rather than walking every credential, so the arrow keys are
   * what moves within it.
   */
  const onTabKeyDown = (event: React.KeyboardEvent<HTMLUListElement>): void => {
    const last = credentials.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = selected === last ? 0 : selected + 1;
        break;
      case "ArrowLeft":
        next = selected === 0 ? last : selected - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  if (credentials.length === 0) return null;

  const active: EmbeddedVerifiableCredential = credentials[selected];

  return (
    <>
      {/* Laid out like the template strip a single certificate gets, so "View another" keeps
          its usual place: tabs on the left, the button on the right of the first strip under
          the header. The renderer's own strip below is told not to repeat it. */}
      <div className="bg-blue-100 pt-4 border-b-4">
        <div className="container">
          <div className="flex flex-wrap">
            {/* hidden below md, exactly as the template strip hides it: MultiTabs puts its
                whole desktop row behind `hidden md:block` and offers a Drawer instead, so on a
                phone a single certificate has no "View another". Matching that rule keeps one
                behaviour across both, rather than a button that appears only for presentations.
                The tabs themselves stay visible — they are the only way to move between
                credentials, and a second Drawer would put a second hamburger on the screen. */}
            <div className="hidden md:block w-full ml-auto mb-8 lg:mb-0 lg:w-auto lg:order-2">
              <ViewAnotherButtonContainer />
            </div>
            <div className="w-full lg:flex-1 lg:order-1">
              {/* Inside the tabs column, not above the whole row: the caption belongs to the
                  tabs it names, and between md and lg the button takes a full-width row of its
                  own, which a caption outside the row ended up crowding.

                  text-sm, sentence case: text-xs is used nowhere but the footer copyright, and
                  small-uppercase is a form-label idiom this design does not otherwise use. The
                  count is the part a verifier cannot read off the tabs at a glance. */}
              <p id="credential-tabs-caption" className="text-sm text-neutral-500 mb-2">
                {credentials.length === 1
                  ? "1 certificate in this presentation"
                  : `${credentials.length} certificates in this presentation`}
              </p>
              <ul
                id="credential-tabs-list"
                className="flex flex-wrap -mx-4"
                role="tablist"
                aria-labelledby="credential-tabs-caption"
                onKeyDown={onTabKeyDown}
              >
                {credentials.map((credential, index) => {
                  const isActive = index === selected;
                  return (
                    <li key={credential?.id ?? index} className="w-auto mr-2 max-w-xs">
                      <button
                        id={`credential-tab-${index}`}
                        ref={(element) => {
                          tabRefs.current[index] = element;
                        }}
                        role="tab"
                        aria-selected={isActive}
                        aria-controls={`credential-panel-${index}`}
                        // Roving tabIndex: the strip is one Tab stop and the arrow keys move
                        // within it, rather than every credential being its own Tab stop.
                        tabIndex={isActive ? 0 : -1}
                        data-testid={`credential-tab-${index}`}
                        className={`p-4 border-b-4 uppercase text-black hover:text-black hover:text-opacity-75 hover:border-black block overflow-x-auto whitespace-nowrap ${
                          isActive ? "font-semi border-black" : "border-neutral-400 text-neutral-500"
                        }`}
                        onClick={() => select(index)}
                      >
                        {getCredentialLabel(credential, index)}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* The selected credential gets the same block a single certificate gets — green frame,
          issuer, and an arrow onto its details. It is handed the presentation's fragments
          because those are what verified this credential: W3CVpSignatureIntegrity checks each
          embedded proof, W3CVpCredentialStatus each revocation status and validity window, and
          W3CVpIssuerIdentity resolves each issuer. The block above reports on the envelope. */}
      <section
        className="bg-blue-100 py-4"
        id={`credential-panel-${selected}`}
        role="tabpanel"
        aria-labelledby={`credential-tab-${selected}`}
      >
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 xl:w-1/3">
              <CertificateVerifyBlock verificationStatus={verificationStatus} document={asOpenCertsDocument(active)} />
            </div>
          </div>
        </div>
      </section>

      {/* Keyed so switching tabs remounts the renderer: the iframe holds the previous
          credential's template and does not re-render on a prop change alone. */}
      <DecentralisedRenderer
        key={selected}
        rawDocument={asOpenCertsDocument(active)}
        // An embedded credential is signed inside a presentation; obfuscating a field would
        // invalidate the holder's proof, so the renderer has nothing to write back to.
        updateObfuscatedCertificate={() => undefined}
        forwardedRef={rendererRef}
        showViewAnother={false}
      />

      {/* Every tab's aria-controls must point at an element that exists, but only the selected
          panel is rendered above. These stand in for the rest, empty and hidden: rendering
          their content would mount a DecentralisedRenderer, and so an iframe, per credential. */}
      {credentials.map((_, index) =>
        index === selected ? null : (
          <div
            key={index}
            id={`credential-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`credential-tab-${index}`}
            hidden
          />
        )
      )}
    </>
  );
};
