import { WrappedDocument, v2 } from "@trustvc/trustvc";
import polOaV2Fixture from "../components/tests/fixture/oa-v2-pol-mainnet.json";
import amoyOaV2Fixture from "../integration/fixture/amoy/oa-amoy-minted.json";
import w3cAmoyFixture from "../integration/fixture/amoy/w3c-amoy-minted.json";
import w3cPolFixture from "../integration/fixture/pol/w3c-pol-minted.json";
import { getNetworkName } from "./certificate";

jest.mock("../config", () => ({
  IS_MAINNET: false,
  NETWORK_NAME: "homestead",
}));

describe("sagas/certificate getNetworkName", () => {
  describe("oA v2 documents", () => {
    it("resolves POL mainnet document (chainId 137) to pol network", () => {
      const certificate = polOaV2Fixture as WrappedDocument<v2.OpenAttestationDocument>;

      expect(getNetworkName(certificate)).toBe("pol");
      expect(certificate.data.network?.chain).toContain("POL");
      expect(certificate.data.network?.chainId).toContain("137");
    });

    it("resolves Amoy document (chainId 80002) to amoy network", () => {
      const certificate = amoyOaV2Fixture as WrappedDocument<v2.OpenAttestationDocument>;

      expect(getNetworkName(certificate)).toStrictEqual({ chainId: 80002, name: "amoy" });
      expect(certificate.data.network?.chainId).toContain("80002");
    });
  });

  describe("w3C credentials", () => {
    it("resolves W3C POL credential (chainId 137) to pol network", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(getNetworkName(w3cPolFixture as any)).toBe("pol");
    });

    it("resolves W3C Amoy credential (chainId 80002) to amoy network", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(getNetworkName(w3cAmoyFixture as any)).toStrictEqual({ chainId: 80002, name: "amoy" });
    });
  });
});
