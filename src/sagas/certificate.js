import { get } from "lodash";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { getData, utils } from "@govtechsg/open-attestation";
import Router from "next/router";
import { decryptString } from "@govtechsg/oa-encryption";
import { isValid, verify } from "@govtechsg/opencerts-verify";
import "isomorphic-fetch";
import { getLogger } from "../utils/logger";
import {
  getCertificate,
  types,
  verifyingCertificateErrored,
  verifyingCertificateCompleted
} from "../reducers/certificate";
import { types as applicationTypes } from "../reducers/application";
import sendEmail from "../services/email";
import { generateLink } from "../services/link";
import { analyticsEvent } from "../components/Analytics";
import {
  certificateNotIssued,
  getAllButRevokeFragment,
  getRevokeFragment
} from "../services/fragment";
import { NETWORK_NAME } from "../config";

const { trace, error } = getLogger("saga:certificate");

const ANALYTICS_VERIFICATION_ERROR_CODE = {
  ISSUER_IDENTITY: 0,
  CERTIFICATE_HASH: 1,
  UNISSUED_CERTIFICATE: 2,
  REVOKED_CERTIFICATE: 3,
  CERTIFICATE_STORE: 4
};
export function* getAnalyticsDetails() {
  try {
    const rawCertificate = yield select(getCertificate);
    const certificate = getData(rawCertificate);

    const storeAddresses = utils.getIssuerAddress(rawCertificate);
    const id = get(certificate, "id");
    return { storeAddresses, id };
  } catch (e) {
    error(e.message);
    return {};
  }
}

export function* triggerAnalytics(errorCode) {
  const { storeAddresses, id } = yield call(getAnalyticsDetails);
  if (storeAddresses && id) {
    analyticsEvent(window, {
      category: "CERTIFICATE_ERROR",
      action: storeAddresses,
      label: id,
      value: errorCode
    });
  }
}

// to run if any of the issuer is not valid
export function* analyticsIssuerFail() {
  yield call(
    triggerAnalytics,
    ANALYTICS_VERIFICATION_ERROR_CODE.ISSUER_IDENTITY
  );
}

// to run if certificate has been tampered
export function* analyticsHashFail() {
  yield call(
    triggerAnalytics,
    ANALYTICS_VERIFICATION_ERROR_CODE.CERTIFICATE_HASH
  );
}

// to run if certificate has not been issued
export function* analyticsIssuedFail() {
  yield call(
    triggerAnalytics,
    ANALYTICS_VERIFICATION_ERROR_CODE.UNISSUED_CERTIFICATE
  );
}

// to run if certificate has been revoked
export function* analyticsRevocationFail() {
  yield call(
    triggerAnalytics,
    ANALYTICS_VERIFICATION_ERROR_CODE.REVOKED_CERTIFICATE
  );
}

// to run if store is not valid
export function* analyticsStoreFail() {
  yield call(
    triggerAnalytics,
    ANALYTICS_VERIFICATION_ERROR_CODE.CERTIFICATE_STORE
  );
}

export function* verifyCertificate({ payload: certificate }) {
  try {
    yield put({
      type: types.VERIFYING_CERTIFICATE
    });
    const fragments = yield call(verify, certificate, {
      network: NETWORK_NAME
    });
    trace(`Verification Status: ${JSON.stringify(fragments)}`);

    yield put(verifyingCertificateCompleted(fragments));
    if (isValid(fragments)) {
      Router.push("/viewer");
    } else {
      const fragmentsWithoutRevoke = getAllButRevokeFragment(fragments);
      const revokeFragment = [getRevokeFragment(fragments)];

      if (!isValid(fragments, ["DOCUMENT_INTEGRITY"])) {
        yield call(analyticsHashFail);
      }
      if (
        !isValid(fragmentsWithoutRevoke, ["DOCUMENT_STATUS"]) &&
        certificateNotIssued(fragments)
      ) {
        yield call(analyticsIssuedFail);
      }
      if (
        !isValid(fragments, ["DOCUMENT_STATUS"]) &&
        !certificateNotIssued(fragments)
      ) {
        yield call(analyticsStoreFail);
      }
      if (!isValid(revokeFragment, ["DOCUMENT_STATUS"])) {
        yield call(analyticsRevocationFail);
      }
      if (!isValid(fragments, ["ISSUER_IDENTITY"])) {
        yield call(analyticsIssuedFail);
      }
    }
  } catch (e) {
    yield put(verifyingCertificateErrored(e.message));
  }
}

export function* sendCertificate({ payload }) {
  try {
    const certificate = yield select(getCertificate);
    const { email, captcha } = payload;
    const success = yield sendEmail({
      certificate,
      email,
      captcha
    });

    if (!success) {
      throw new Error("Fail to send certificate");
    }

    yield put({
      type: types.SENDING_CERTIFICATE_SUCCESS
    });
  } catch (e) {
    yield put({
      type: types.SENDING_CERTIFICATE_FAILURE,
      payload: e.message
    });
  }
}

export function* generateShareLink() {
  try {
    yield put({
      type: types.GENERATE_SHARE_LINK_RESET
    });
    const certificate = yield select(getCertificate);
    const success = yield generateLink(certificate);

    if (!success) {
      throw new Error("Fail to generate certificate share link");
    }

    yield put({
      type: types.GENERATE_SHARE_LINK_SUCCESS,
      payload: success
    });
  } catch (e) {
    yield put({
      type: types.GENERATE_SHARE_LINK_FAILURE,
      payload: e.message
    });
  }
}

export function* retrieveCertificateByAction({ payload: { uri, key } }) {
  try {
    yield put({
      type: types.RETRIEVE_CERTIFICATE_BY_ACTION_PENDING
    });

    // if a key has been provided, let's assume
    let certificate = yield window.fetch(uri).then(response => {
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
          type: certificate.type
        })
      );
    } else if (key || certificate.type) {
      throw new Error(
        `Unable to decrypt certificate with key=${key} and type=${
          certificate.type
        }`
      );
    }

    yield put({
      type: types.UPDATE_CERTIFICATE,
      payload: certificate
    });
    yield put({
      type: types.RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS
    });
  } catch (e) {
    yield put({
      type: types.RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE,
      payload: e.message
    });
  }
}

export function* networkReset() {
  yield put({
    type: types.NETWORK_RESET
  });
}

export default [
  takeEvery(types.RETRIEVE_CERTIFICATE_BY_ACTION, retrieveCertificateByAction),
  takeEvery(types.UPDATE_CERTIFICATE, verifyCertificate),
  takeEvery(types.SENDING_CERTIFICATE, sendCertificate),
  takeEvery(types.GENERATE_SHARE_LINK, generateShareLink),
  takeEvery(applicationTypes.UPDATE_WEB3, networkReset)
];
