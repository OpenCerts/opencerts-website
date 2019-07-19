import { getIdentityVerificationText } from "./CertificateVerifyBlock";

describe("Certificate verify block getIdentityVerificationText", () => {
  describe("When registry is verified", () => {
    test("singular registry is verified", () => {
      const testValue = [{ registry: "Govtech", dns: "abc.com" }];
      expect(getIdentityVerificationText(testValue)).toEqual(
        "Accredited by SSG"
      );
    });

    test("registry is verified but dns is unverified", () => {
      const testValue = [{ registry: "Demo", dns: "false" }];
      expect(getIdentityVerificationText(testValue)).toEqual(
        "Accredited by SSG"
      );
    });

    test("when multiple registry is verified", () => {
      const testValue = [
        { registry: "govtech", dns: "abc.com" },
        { registry: "demo", dns: "demo.com" }
      ];
      expect(getIdentityVerificationText(testValue)).toEqual(
        "Accredited by SSG"
      );
    });

    test("when one of each registry and dns verified", () => {
      const testValue = [
        { registry: false, dns: "abc.com" },
        { registry: "demo", dns: false }
      ];
      expect(getIdentityVerificationText(testValue)).toEqual(
        "Accredited by SSG"
      );
    });
  });

  describe("When dns is verified", () => {
    test("when registry is unverified but dns is verified", () => {
      const testValue = [{ registry: false, dns: "abc.com" }];
      expect(getIdentityVerificationText(testValue)).toEqual(
        "Issued by ABC.COM"
      );
    });

    test("when multiple dns is verified", () => {
      const testValue = [
        { registry: false, dns: "abc.com" },
        { registry: false, dns: "demo.com" }
      ];
      expect(getIdentityVerificationText(testValue)).toEqual(
        "Issued by ABC.COM & DEMO.COM"
      );
    });
  });
});
