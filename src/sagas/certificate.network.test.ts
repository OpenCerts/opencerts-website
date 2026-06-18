import { WrappedDocument, v2 } from "@trustvc/trustvc";
import polOaV2Fixture from "../integration/fixture/pol/oa-pol-minted.json";
import { getNetworkName } from "./certificate";

jest.mock("../config", () => ({
  IS_MAINNET: true,
  NETWORK_NAME: "homestead",
}));

describe("sagas/certificate getNetworkName", () => {
  it("resolves OA v2 POL mainnet fixture to pol network", () => {
    const certificate = polOaV2Fixture as WrappedDocument<v2.OpenAttestationDocument>;

    expect(getNetworkName(certificate)).toBe("matic");
    expect(certificate.data.network?.chain).toContain("POL");
    expect(certificate.data.network?.chainId).toContain("137");
  });
});
