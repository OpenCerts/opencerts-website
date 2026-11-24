import { isValidRecipient, MAX_EMAIL_LENGTH } from "./email";

// Same table as the backend's recipient tests (opencerts-functions src/email), so the two stay in step.
describe("isValidRecipient", () => {
  it.each(["someone@example.com", "first.last+tag@sub.example.co", "o'brien@example.com"])("accepts %s", (to) => {
    expect(isValidRecipient(to)).toBe(true);
  });

  it.each([
    "a@example.com,b@example.com",
    "a@example.com;b@example.com",
    "a@example.com b@example.com",
    "Someone <a@example.com>",
    "a@example.com\r\nBcc: b@example.com",
    "group:a@example.com,b@example.com;",
    "someone@",
    "someone@example",
    `${"a".repeat(250)}@example.com`,
  ])("rejects %j", (to) => {
    expect(isValidRecipient(to)).toBe(false);
  });

  it("rejects surrounding whitespace rather than trimming it, like the backend", () => {
    expect(isValidRecipient(" someone@example.com")).toBe(false);
    expect(isValidRecipient("someone@example.com ")).toBe(false);
  });

  it("accepts an address of exactly the maximum length and rejects one longer", () => {
    const domain = "@example.com";
    const longest = `${"a".repeat(MAX_EMAIL_LENGTH - domain.length)}${domain}`;
    expect(isValidRecipient(longest)).toBe(true);
    expect(isValidRecipient(`a${longest}`)).toBe(false);
  });

  it.each([undefined, null, 42, {}, ["someone@example.com"]])("rejects non-string %p", (to) => {
    expect(isValidRecipient(to)).toBe(false);
  });
});
