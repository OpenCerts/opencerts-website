import { decryptString } from "@govtechsg/oa-encryption";
import { getData, utils, v2, WrappedDocument } from "@govtechsg/open-attestation";
import { isValid, verify } from "@govtechsg/opencerts-verify";
import { get } from "lodash";
import Router from "next/router";
import { call, put, select, takeEvery } from "redux-saga/effects";
import "isomorphic-fetch";
import { analyticsEvent } from "../components/Analytics";
import { NETWORK_NAME } from "../config";

import {
  GENERATE_SHARE_LINK,
  generateShareLinkFailure,
  generateShareLinkReset,
  generateShareLinkSuccess,
  RETRIEVE_CERTIFICATE_BY_ACTION,
  retrieveCertificateByActionFailure,
  retrieveCertificateByActionPending,
  retrieveCertificateByActionSuccess,
  sendCertificateFailure,
  sendCertificateSuccess,
  SENDING_CERTIFICATE,
  UPDATE_CERTIFICATE,
  updateCertificate,
  verifyingCertificate,
  verifyingCertificateCompleted,
  verifyingCertificateErrored,
} from "../reducers/certificate.actions";
import { getCertificate } from "../reducers/certificate.selectors";
import { sendEmail } from "../services/email";
import { certificateNotIssued, getAllButRevokeFragment, getRevokeFragment } from "../services/fragment";
import { generateLink } from "../services/link";
import { getLogger } from "../utils/logger";

const { trace, error } = getLogger("saga:certificate");

const ANALYTICS_VERIFICATION_ERROR_CODE = {
  ISSUER_IDENTITY: 0,
  CERTIFICATE_HASH: 1,
  UNISSUED_CERTIFICATE: 2,
  REVOKED_CERTIFICATE: 3,
  CERTIFICATE_STORE: 4,
};
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* getAnalyticsDetails() {
  try {
    const rawCertificate = yield select(getCertificate);
    const certificate = getData(rawCertificate);

    const storeAddresses = utils.getIssuerAddress(rawCertificate);
    const id = get(certificate, "id");
    return {
      storeAddresses: Array.isArray(storeAddresses) ? storeAddresses.join(",") : storeAddresses,
      id,
    };
  } catch (e) {
    error(e.message);
    return {};
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* triggerAnalytics(errorCode: number) {
  const { storeAddresses, id } = yield call(getAnalyticsDetails);
  if (storeAddresses && id) {
    analyticsEvent(window, {
      category: "CERTIFICATE_ERROR",
      action: storeAddresses,
      label: id,
      value: errorCode,
    });
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* triggerAnalyticsErrorV2(value: string) {
  const rawCertificate: WrappedDocument = yield select(getCertificate);
  const certificate = getData(rawCertificate);

  // If there are multiple issuers in a certificate, we send multiple events!
  // const storeAddresses = utils.getIssuerAddress(rawCertificate);
  const id = get(certificate, "id") ?? ""; // Use get or certificate?.id?
  const name = get(certificate, "name") ?? "";
  const issuedOn = get(certificate, "issuedOn") ?? "";
  const errors = value ?? "";

  certificate.issuers.forEach((issuer: v2.Issuer) => {
    const store = issuer.certificateStore ?? issuer.documentStore ?? issuer.tokenRegistry ?? "";
    const issuerName = issuer.name;
    // const registryIssuer = registry.issuers[store];
    console.log(store, id, name, issuedOn, issuerName);
    analyticsEvent(window, {
      category: "CERTIFICATE_ERROR",
      action: `ERROR - ${issuerName}`,
      label: value,
      options: {
        nonInteraction: true,
        dimension1: store || "(not set)",
        dimension2: id || "(not set)",
        dimension3: name || "(not set)",
        dimension4: issuedOn || "(not set)",
        dimension5: issuerName || "(not set)",
        // dimension6: registryIssuer?.id || "(not set)",
        dimension7: errors,
      },
    });
  });

  // const id = certificateData?.id ?? "";
  // const name = certificateData?.name ?? "";
  // const issuedOn = certificateData?.issuedOn ?? "";
  // // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // // @ts-ignore ignoring because typescript complain the key cant be undefined and there is no match between string type and keyof typeof registry.issuers
  // const registryIssuer = registry.issuers[store];

  // if (registryIssuer) {
  //   issuerName = registryIssuer.name;
  //   label = `"store":"${store}"${separator}"document_id":"${id}"${separator}"name":"${name}"${separator}"issued_on":"${issuedOn}"${separator}"issuer_name":"${
  //     issuerName ?? ""
  //   }"${separator}"issuer_id":"${registryIssuer.id ?? ""}"`;
  // } else if (issuer.identityProof) {
  //   issuerName = issuer.identityProof.location;
  //   label = `"store":"${store}"${separator}"document_id":"${id}"${separator}"name":"${name}"${separator}"issued_on":"${issuedOn}"${separator}"issuer_name":"${
  //     issuerName ?? ""
  //   }"`;
  // } else {
  //   label = "Something went wrong, please check the analytics code of sendEventCertificateViewedDetailed";
  // }
}

// to run if any of the issuer is not valid
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* analyticsIssuerFail() {
  yield call(triggerAnalytics, ANALYTICS_VERIFICATION_ERROR_CODE.ISSUER_IDENTITY);
}

// to run if certificate has been tampered
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* analyticsHashFail() {
  yield call(triggerAnalytics, ANALYTICS_VERIFICATION_ERROR_CODE.CERTIFICATE_HASH);
}

// to run if certificate has not been issued
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* analyticsIssuedFail() {
  yield call(triggerAnalytics, ANALYTICS_VERIFICATION_ERROR_CODE.UNISSUED_CERTIFICATE);
}

// to run if certificate has been revoked
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* analyticsRevocationFail() {
  yield call(triggerAnalytics, ANALYTICS_VERIFICATION_ERROR_CODE.REVOKED_CERTIFICATE);
}

// to run if store is not valid
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* analyticsStoreFail() {
  yield call(triggerAnalytics, ANALYTICS_VERIFICATION_ERROR_CODE.CERTIFICATE_STORE);
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* verifyCertificate({ payload: certificate }: { payload: WrappedDocument<v2.OpenAttestationDocument> }) {
  try {
    yield put(verifyingCertificate());
    const fragments = yield call(verify, certificate, {
      network: NETWORK_NAME,
    });
    trace(`Verification Status: ${JSON.stringify(fragments)}`);

    yield put(verifyingCertificateCompleted(fragments));
    if (isValid(fragments)) {
      Router.push("/viewer");
    } else {
      const fragmentsWithoutRevoke = getAllButRevokeFragment(fragments);
      const revokeFragment = [getRevokeFragment(fragments)];
      const errors: string[] = [];
      if (!isValid(fragments, ["DOCUMENT_INTEGRITY"])) {
        yield call(analyticsHashFail);
        errors.push("CERTIFICATE_HASH");
      }
      if (!isValid(fragmentsWithoutRevoke, ["DOCUMENT_STATUS"]) && certificateNotIssued(fragments)) {
        yield call(analyticsIssuedFail);
        errors.push("UNISSUED_CERTIFICATE");
      }
      if (!isValid(fragments, ["DOCUMENT_STATUS"]) && !certificateNotIssued(fragments)) {
        yield call(analyticsStoreFail);
        errors.push("CERTIFICATE_STORE"); // should we have a better name..? doesn't say much. maybe CERTIFICATE_STORE_NOT_FOUND?
      }
      if (!isValid(revokeFragment, ["DOCUMENT_STATUS"])) {
        yield call(analyticsRevocationFail);
        errors.push("REVOKED_CERTIFICATE");
      }
      if (!isValid(fragments, ["ISSUER_IDENTITY"])) {
        yield call(analyticsIssuedFail);
        errors.push("ISSUER_IDENTITY");
      }
      if (errors) {
        console.log(errors.join(","));
        yield call(triggerAnalyticsErrorV2, errors.join(","));
      }
    }
  } catch (e) {
    yield put(verifyingCertificateErrored(e.message));
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* sendCertificate({ payload }: { payload: { email: string; captcha: string } }) {
  try {
    const certificate = yield select(getCertificate);
    const { email, captcha } = payload;
    const success = yield sendEmail({
      certificate,
      email,
      captcha,
    });

    if (!success) {
      throw new Error("Fail to send certificate");
    }

    yield put(sendCertificateSuccess());
  } catch (e) {
    yield put(sendCertificateFailure(e.message));
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* generateShareLink() {
  try {
    yield put(generateShareLinkReset());
    const certificate = yield select(getCertificate);
    const success = yield generateLink(certificate);

    if (!success) {
      throw new Error("Fail to generate certificate share link");
    }

    yield put(generateShareLinkSuccess(success));
  } catch (e) {
    yield put(generateShareLinkFailure(e.message));
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function* retrieveCertificateByAction({ payload: { uri, key } }: { payload: { uri: string; key?: string } }) {
  try {
    yield put(retrieveCertificateByActionPending());

    // if a key has been provided, let's assume
    let certificate = yield window.fetch(uri).then((response) => {
      if (response.status >= 400 && response.status < 600) {
        throw new Error(`Unable to load the certificate from ${uri}`);
      }
      return response.json();
    });
    certificate = certificate.document || certificate; // opencerts-function returns the document in a nested document object

    if (!certificate) {
      throw new Error(`Certificate at address ${uri} is empty`);
    }
    // if there is a key and the type is "OPEN-ATTESTATION-TYPE-1", let's use oa-encryption
    if (key && certificate.type === "OPEN-ATTESTATION-TYPE-1") {
      certificate = JSON.parse(
        decryptString({
          tag: certificate.tag,
          cipherText: certificate.cipherText,
          iv: certificate.iv,
          key,
          type: certificate.type,
        })
      );
    } else if (key || certificate.type) {
      throw new Error(`Unable to decrypt certificate with key=${key} and type=${certificate.type}`);
    }

    yield put(updateCertificate(certificate));
    yield put(retrieveCertificateByActionSuccess());
  } catch (e) {
    yield put(retrieveCertificateByActionFailure(e.message));
  }
}

// TODO https://github.com/redux-saga/redux-saga/issues/1883
export const sagas = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  takeEvery(RETRIEVE_CERTIFICATE_BY_ACTION, retrieveCertificateByAction),
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  takeEvery(UPDATE_CERTIFICATE, verifyCertificate),
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  takeEvery(SENDING_CERTIFICATE, sendCertificate),
  takeEvery(GENERATE_SHARE_LINK, generateShareLink),
];
