import { getNamehash } from "./ens";

describe("ens", () => {
  describe("namehash", () => {
    test("ens", async () => {
      expect(getNamehash("")).toBe(
        "0x0000000000000000000000000000000000000000000000000000000000000000"
      );
      expect(getNamehash("eth")).toBe(
        "0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae"
      );
      expect(getNamehash("vitalik.eth")).toBe(
        "0xee6c4522aab0003e8d14cd40a6af439055fd2577951148c14b6cea9a53475835"
      );
      expect(getNamehash("opencerts.eth")).toBe(
        "0xf45f270a197192685da02eaee62c7d583b537c8209b27cc384b56cc094266652"
      );
      expect(getNamehash("sg.opencerts.eth")).toBe(
        "0x7c85146fd7a5dc82f01016603957c04b49f6758a96d64effd49e4d131df76e26"
      );
    });
  });
});
