import { put, call } from "redux-saga/effects";
import {
  verifyCertificateIssuer,
  resolveEnsNamesToText,
  lookupEthereumAddresses
} from "./certificate";
import { verifyingCertificateIssuerSuccess } from "../reducers/certificate";
import MakeCertUtil from "./makeCertUtil";

function whenThereIsOneEthereumAddressIssuer() {
  const ethereumAddresses = ["0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F"];
  const testCert = new MakeCertUtil().addIssuer(ethereumAddresses[0]).finish();
  return { testCert, ethereumAddresses };
}

function whenThereIsOnlyOneEnsName() {
  const ensNames = ["govtech-test.sg.opencerts.eth"];
  const testCert = new MakeCertUtil().addIssuer(ensNames[0]).finish();

  return { testCert, ensNames };
}
function whenThereAreMultipleEnsNames() {
  const ensNames = [
    "govtech-test.sg.opencerts.eth",
    "govtech-test2.sg.opencerts.eth"
  ];
  const testCert = new MakeCertUtil()
    .addIssuer(ensNames[0])
    .addIssuer(ensNames[1])
    .finish();

  return { testCert, ensNames };
}

function whenThereAreEnsNamesAndEthereumAddresses() {
  const ensNames = [
    "govtech-test.sg.opencerts.eth",
    "govtech-test2.sg.opencerts.eth"
  ];
  const ethereumAddresses = [
    "0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F",
    "0x0096Ca31c87771a2Ed212D4b2E689e712Bd938F9"
  ];
  const testCert = new MakeCertUtil()
    .addIssuer(ensNames[0])
    .addIssuer(ensNames[1])
    .addIssuer(ethereumAddresses[0])
    .addIssuer(ethereumAddresses[1])
    .finish();

  return { testCert, ensNames, ethereumAddresses };
}

describe("sagas/certificate", () => {
  describe("verifyCertificateIssuer", () => {
    it("should resolve singular issuer ens name", () => {
      const { testCert, ensNames } = whenThereIsOnlyOneEnsName();
      const resolverReturnValue = ["test store"];
      const issuerSaga = verifyCertificateIssuer({ certificate: testCert });

      expect(issuerSaga.next().value).toEqual(
        call(resolveEnsNamesToText, ensNames)
      );
      const resolvedPut = issuerSaga.next(resolverReturnValue).value;

      expect(resolvedPut).toEqual(
        put(verifyingCertificateIssuerSuccess(resolverReturnValue))
      );
      const isSagaFinished = issuerSaga.next().done;

      expect(isSagaFinished).toBe(true);
    });

    it("should resolve multiple issuer ens name", () => {
      const { testCert, ensNames } = whenThereAreMultipleEnsNames();
      const resolverReturnValue = ["test store", "test store 2"];
      const issuerSaga = verifyCertificateIssuer({ certificate: testCert });

      expect(issuerSaga.next().value).toEqual(
        call(resolveEnsNamesToText, ensNames)
      );
      const resolvedPut = issuerSaga.next(resolverReturnValue).value;

      expect(resolvedPut).toEqual(
        put(verifyingCertificateIssuerSuccess(resolverReturnValue))
      );
      const isSagaFinished = issuerSaga.next().done;

      expect(isSagaFinished).toBe(true);
    });

    it("should resolve issuer ethereum address", () => {
      const {
        testCert,
        ethereumAddresses
      } = whenThereIsOneEthereumAddressIssuer();
      const resolverReturnValue = ["test store", "test store 2"];
      const issuerSaga = verifyCertificateIssuer({ certificate: testCert });

      expect(issuerSaga.next().value).toEqual(
        call(lookupEthereumAddresses, ethereumAddresses)
      );
      const resolvedPut = issuerSaga.next(resolverReturnValue).value;

      expect(resolvedPut).toEqual(
        put(verifyingCertificateIssuerSuccess(resolverReturnValue))
      );
      const isSagaFinished = issuerSaga.next().done;

      expect(isSagaFinished).toBe(true);
    });

    it("should resolve issuer ethereum address", () => {
      const {
        testCert,
        ensNames,
        ethereumAddresses
      } = whenThereAreEnsNamesAndEthereumAddresses();
      const resolverReturnValue = ["resolved ens 1", "resolved ens 2"];
      const issuerRegistryReturnValue = [
        "ethereum address registry 1",
        "ethereum address registry 2"
      ];
      const issuerSaga = verifyCertificateIssuer({ certificate: testCert });

      expect(issuerSaga.next().value).toEqual(
        call(resolveEnsNamesToText, ensNames)
      );

      expect(issuerSaga.next(resolverReturnValue).value).toEqual(
        call(lookupEthereumAddresses, ethereumAddresses)
      );
      const resolvedPut = issuerSaga.next(issuerRegistryReturnValue).value;

      expect(resolvedPut).toEqual(
        put(
          verifyingCertificateIssuerSuccess(
            issuerRegistryReturnValue.concat(resolverReturnValue)
          )
        )
      );
      const isSagaFinished = issuerSaga.next().done;

      expect(isSagaFinished).toBe(true);
    });
  });
});
