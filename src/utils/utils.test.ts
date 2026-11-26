import twoCredentials from "../components/tests/fixture/presentations/valid/two_credentials.json";
import { getTemplate } from "./utils";

const RENDERER_URL = "https://generic-templates.tradetrust.io";

// A signed W3C credential whose only renderMethod entry is the renderer url.
const credential = [twoCredentials.verifiableCredential].flat()[0];

const inlineEntry = {
  type: "INLINE_HTML_TEMPLATE",
  template: { templateName: "CHAFTA_COO", html: "", css: "" },
};

const withRenderMethod = (renderMethod: unknown) => ({ ...credential, renderMethod } as never);

describe("getTemplate for W3C credentials", () => {
  it("returns the renderer url of a credential with only a URL-based renderMethod", () => {
    expect(getTemplate(credential as never)).toBe(RENDERER_URL);
  });

  it("skips an INLINE_HTML_TEMPLATE entry placed ahead of the URL-based fallback", () => {
    expect(getTemplate(withRenderMethod([inlineEntry, ...credential.renderMethod]))).toBe(RENDERER_URL);
  });

  it("returns the renderer url when the INLINE_HTML_TEMPLATE entry comes after it", () => {
    expect(getTemplate(withRenderMethod([...credential.renderMethod, inlineEntry]))).toBe(RENDERER_URL);
  });

  it("returns undefined when the only renderMethod is an INLINE_HTML_TEMPLATE", () => {
    expect(getTemplate(withRenderMethod([inlineEntry]))).toBeUndefined();
  });

  it("still takes the first entry's url when it has no type, as before", () => {
    expect(getTemplate(withRenderMethod([{ id: RENDERER_URL }]))).toBe(RENDERER_URL);
  });

  it("still reads a single renderMethod object, as before", () => {
    expect(getTemplate(withRenderMethod(credential.renderMethod[0]))).toBe(RENDERER_URL);
  });
});
