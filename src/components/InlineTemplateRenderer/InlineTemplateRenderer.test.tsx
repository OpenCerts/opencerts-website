import { configureStore } from "@reduxjs/toolkit";
import { render, screen, waitFor } from "@testing-library/react";
import { renderInlineHtmlTemplate } from "@trustvc/trustvc";
import React from "react";
import { Provider } from "react-redux";
import { rootReducer } from "../../reducers";
import { hasInlineTemplateRenderMethod, InlineTemplateRenderer } from "./InlineTemplateRenderer";

// Wrapped so a single test can make the SDK report a render failure; every other test runs the real one.
jest.mock("@trustvc/trustvc", () => {
  const actual = jest.requireActual("@trustvc/trustvc");
  return { ...actual, renderInlineHtmlTemplate: jest.fn(actual.renderInlineHtmlTemplate) };
});

const html = `
  <div class="cert">
    <div data-field="name"></div>
    <div data-field="course"></div>
  </div>
`;
const css = ".cert { color: red; }";

const inlineDocument = {
  renderMethod: [
    { type: "INLINE_HTML_TEMPLATE", template: { templateName: "CERTIFICATE", html, css } },
    { type: "EMBEDDED_RENDERER", templateName: "CERTIFICATE", id: "https://generic-templates.tradetrust.io" },
  ],
  credentialSubject: { name: "Jane Tan", course: "Bachelor of Computing" },
};

// "View another" in the strip above the template dispatches a reset, so it needs a store.
const renderInline = (props: Partial<React.ComponentProps<typeof InlineTemplateRenderer>> = {}) =>
  render(
    <Provider store={configureStore({ reducer: rootReducer })}>
      <InlineTemplateRenderer rawDocument={inlineDocument as never} forwardedRef={React.createRef()} {...props} />
    </Provider>
  );

// trustvc titles the sandboxed frame "Document". The template is decompressed asynchronously
// before it is mounted.
const mountedFrame = async (): Promise<HTMLIFrameElement> =>
  (await screen.findByTitle("Document")) as HTMLIFrameElement;

/**
 * jsdom doesn't load srcdoc frames, so read the srcdoc the frame was given. It is parsed into a
 * detached document, not the rendered page, so Testing Library's queries don't apply to it.
 */
const frameContent = (frame: HTMLIFrameElement) => {
  const parsed = new DOMParser().parseFromString(frame.srcdoc, "text/html");
  return {
    // eslint-disable-next-line testing-library/no-node-access
    field: (name: string) => parsed.querySelector(`[data-field="${name}"]`)?.textContent,
    // eslint-disable-next-line testing-library/no-node-access
    styles: Array.from(parsed.querySelectorAll("style")).map((style) => style.textContent),
  };
};

describe("hasInlineTemplateRenderMethod", () => {
  it("finds the inline entry in either order, compressed or not", () => {
    const inline = inlineDocument.renderMethod[0];
    const url = inlineDocument.renderMethod[1];

    expect(hasInlineTemplateRenderMethod({ renderMethod: [inline, url] })).toBe(true);
    expect(hasInlineTemplateRenderMethod({ renderMethod: [url, inline] })).toBe(true);
    expect(hasInlineTemplateRenderMethod({ renderMethod: [{ type: "INLINE_HTML_TEMPLATE", template: "H4sI" }] })).toBe(
      true
    );
  });

  it("is false for a document that only has a renderer url", () => {
    expect(hasInlineTemplateRenderMethod({ renderMethod: [inlineDocument.renderMethod[1]] })).toBe(false);
    expect(hasInlineTemplateRenderMethod({ renderMethod: inlineDocument.renderMethod[1] })).toBe(false);
    expect(hasInlineTemplateRenderMethod({})).toBe(false);
  });
});

describe("inlineTemplateRenderer", () => {
  it("fills the template against credentialSubject inside a sandboxed iframe", async () => {
    renderInline();
    const frame = await mountedFrame();

    expect(frame.getAttribute("sandbox")).toBe("allow-same-origin allow-modals");

    const content = frameContent(frame);

    expect(content.field("name")).toBe("Jane Tan");
    expect(content.field("course")).toBe("Bachelor of Computing");
    expect(content.styles).toContain(css);
  });

  it("does not put the template's markup or CSS into the page's DOM", async () => {
    renderInline();
    await mountedFrame();
    const host = screen.getByTestId("inline-template-renderer");

    expect(host.shadowRoot).toBeNull();
    expect(host).toHaveTextContent("");
    expect(screen.queryByText("Jane Tan")).not.toBeInTheDocument();
    expect(Array.from(document.styleSheets).map((sheet) => sheet.ownerNode?.textContent)).not.toContain(css);
  });

  it("keeps the view another button above the template", () => {
    renderInline();

    expect(screen.getByText("View another")).toBeInTheDocument();
  });
});

describe("inlineTemplateRenderer fallback", () => {
  it("calls onFailure when the template can't be decompressed", async () => {
    const onFailure = jest.fn();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    // A compressed `template` string that isn't valid gzip fails to decompress.
    renderInline({
      rawDocument: { renderMethod: [{ type: "INLINE_HTML_TEMPLATE", template: "not-gzip" }] } as never,
      onFailure,
    });

    await waitFor(() => expect(onFailure).toHaveBeenCalledTimes(1));
  });

  it("calls onFailure when the template can't be rendered", async () => {
    const onFailure = jest.fn();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    (renderInlineHtmlTemplate as jest.Mock).mockReturnValueOnce(false);
    renderInline({ onFailure });

    await waitFor(() => expect(onFailure).toHaveBeenCalledTimes(1));
  });

  it("does not call onFailure when the template renders", async () => {
    const onFailure = jest.fn();
    renderInline({ onFailure });
    await mountedFrame();

    expect(onFailure).not.toHaveBeenCalled();
  });
});

describe("inlineTemplateRenderer print", () => {
  it("prints the template's frame, not the page, through its ref", async () => {
    const ref = React.createRef<{ print: () => void }>();
    renderInline({ forwardedRef: ref });
    const frameWindow = (await mountedFrame()).contentWindow as Window;
    jest.spyOn(frameWindow, "focus").mockImplementation(() => undefined);
    const framePrint = jest.spyOn(frameWindow, "print").mockImplementation(() => undefined);
    const pagePrint = jest.spyOn(window, "print").mockImplementation(() => undefined);
    ref.current?.print();

    expect(framePrint).toHaveBeenCalledTimes(1);
    expect(pagePrint).not.toHaveBeenCalled();
  });
});
