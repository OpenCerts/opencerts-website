import { encodeQrCode, decodeQrCode } from "./index";

describe("encodeQrCode", () => {
  it("encodes an action correctly", () => {
    const action = {
      uri: "https://sample.domain/document/id?q=abc#123"
    };
    const encodedQrCode = encodeQrCode(action);
    expect(encodedQrCode).toBe(
      "tt://%7B%22uri%22%3A%22https%3A%2F%2Fsample.domain%2Fdocument%2Fid%3Fq%3Dabc%23123%22%7D"
    );
  });
});

describe("decodeQrCode", () => {
  it("decodes an action correctly", () => {
    const encodedQrCode =
      "tt://%7B%22uri%22%3A%22https%3A%2F%2Fsample.domain%2Fdocument%2Fid%3Fq%3Dabc%23123%22%7D";

    const action = decodeQrCode(encodedQrCode);
    expect(action).toEqual({
      uri: "https://sample.domain/document/id?q=abc#123"
    });
  });

  it("throws when qr code is malformed", () => {
    const encodedQrCode =
      "http://%7B%22uri%22%3A%22https%3A%2F%2Fsample.domain%2Fdocument%2Fid%3Fq%3Dabc%23123%22%7D";
    expect(() => decodeQrCode(encodedQrCode)).toThrow("not formatted");
  });
});
