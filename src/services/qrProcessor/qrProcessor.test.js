import axios from "axios";
import { encodeQrCode, decodeQrCode, processQrCode } from "./index";

jest.mock("axios");

describe("encodeQrCode", () => {
  it("encodes an action correctly", () => {
    const action = {
      uri: "https://sample.domain/document/id?q=abc#123"
    };
    const encodedQrCode = encodeQrCode(action);
    expect(encodedQrCode).toBe(
      "tradetrust://%7B%22uri%22%3A%22https%3A%2F%2Fsample.domain%2Fdocument%2Fid%3Fq%3Dabc%23123%22%7D"
    );
  });
});

describe("decodeQrCode", () => {
  it("decodes an action correctly", () => {
    const encodedQrCode =
      "tradetrust://%7B%22uri%22%3A%22https%3A%2F%2Fsample.domain%2Fdocument%2Fid%3Fq%3Dabc%23123%22%7D";

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

describe("processQrCode", () => {
  it("fetches calls get with the right parameter when a QR code is scanned", async () => {
    const action = {
      uri: "https://sample.domain/document/id?q=abc#123"
    };
    axios.get.mockResolvedValue({ data: "RESOURCE_FROM_URL" });
    const results = await processQrCode(encodeQrCode(action));
    expect(axios.get.mock.calls[0]).toEqual([action.uri]);
    expect(results).toEqual("RESOURCE_FROM_URL");
  });
});
