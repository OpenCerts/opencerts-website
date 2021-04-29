/* eslint-disable @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/explicit-function-return-type */
import { decryptString } from "@govtechsg/oa-encryption";
import { VerificationFragment } from "@govtechsg/oa-verify";
import { v2, WrappedDocument, utils } from "@govtechsg/open-attestation";
import { isValid, verify } from "@govtechsg/opencerts-verify";
import { ethers } from "ethers";
import Router from "next/router";
import { call, put, select, takeEvery } from "redux-saga/effects";
import "isomorphic-fetch";
import { triggerErrorLogging } from "../components/Analytics";
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
import {
  certificateNotIssued,
  certificateRevoked,
  contractNotFound,
  invalidArgument,
  serverError,
} from "../services/fragment";
import { generateLink } from "../services/link";
import { getLogger } from "../utils/logger";

const { error } = getLogger("saga:certificate");
// lower priority === higher priority, so infura has priority, alchemy is used as fallback
const provider = new ethers.providers.FallbackProvider(
  [
    { priority: 1, provider: new ethers.providers.InfuraProvider(NETWORK_NAME, process.env.INFURA_API_KEY) },
    { priority: 10, provider: new ethers.providers.AlchemyProvider(NETWORK_NAME, process.env.ALCHEMY_API_KEY) },
  ],
  1
);

export function* verifyCertificate({ payload: certificate }: { payload: WrappedDocument<v2.OpenAttestationDocument> }) {
  try {
    console.log("la");
    utils.diagnose({ mode: "non-strict", version: "2.0", kind: "signed", document: certificate, debug: true });
    // https://github.com/redux-saga/redux-saga/issues/884
    const fragments: VerificationFragment[] = yield call(verify({ provider }), certificate);
    console.log(fragments);
    error(`Verification Status: ${JSON.stringify(fragments)}`);
    console.log("here2");

    yield put(verifyingCertificateCompleted(fragments));
    if (isValid(fragments)) {
      Router.push("/viewer");
    } else {
      const errors: string[] = [];
      if (!isValid(fragments, ["DOCUMENT_INTEGRITY"])) {
        errors.push("CERTIFICATE_HASH");
      }

      if (!isValid(fragments, ["DOCUMENT_STATUS"])) {
        if (certificateNotIssued(fragments)) errors.push("UNISSUED_CERTIFICATE");
        else if (certificateRevoked(fragments)) errors.push("REVOKED_CERTIFICATE");
        else if (serverError(fragments)) errors.push("SERVER_ERROR");
        else if (invalidArgument(fragments)) errors.push("INVALID_ARGUMENT");
        else if (contractNotFound(fragments)) errors.push("CERTIFICATE_STORE_NOT_FOUND");
        else errors.push("ETHERS_UNHANDLED_ERROR");
      }

      if (!isValid(fragments, ["ISSUER_IDENTITY"])) {
        errors.push("ISSUER_IDENTITY");
      }

      if (!utils.isWrappedV2Document(certificate)) {
        // if the document is not valid
        errors.splice(0, errors.length);
        errors.push("INVALID_DOCUMENT");
      }

      if (errors.length > 0) {
        triggerErrorLogging(certificate, errors);
      }
    }
  } catch (e) {
    console.log(e);
    yield put(verifyingCertificateErrored(e.message));
  }
}

export function* sendCertificate({ payload }: { payload: { email: string; captcha: string } }) {
  try {
    // https://github.com/redux-saga/redux-saga/issues/884
    const certificate: ReturnType<typeof getCertificate> = yield select(getCertificate);
    if (!certificate) throw new Error("No certificate");
    const { email, captcha } = payload;
    const success: boolean = yield sendEmail({
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
type Await<T> = T extends PromiseLike<infer U> ? U : T;

export function* generateShareLink() {
  try {
    yield put(generateShareLinkReset());
    // https://github.com/redux-saga/redux-saga/issues/884
    const certificate: ReturnType<typeof getCertificate> = yield select(getCertificate);
    if (!certificate) {
      throw new Error("No certificate");
    }
    const success: Await<ReturnType<typeof generateLink>> = yield generateLink(certificate);

    if (!success) {
      throw new Error("Fail to generate certificate share link");
    }

    yield put(generateShareLinkSuccess(success));
  } catch (e) {
    yield put(generateShareLinkFailure(e.message));
  }
}

export function* retrieveCertificateByAction({ payload: { uri, key } }: { payload: { uri: string; key?: string } }) {
  try {
    yield put(retrieveCertificateByActionPending());

    // TODO fix the type :)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let certificate: Record<string, any> = yield window.fetch(uri).then((response) => {
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

    yield put(updateCertificate(certificate as WrappedDocument<v2.OpenAttestationDocument>));
    yield put(retrieveCertificateByActionSuccess());
  } catch (e) {
    yield put(retrieveCertificateByActionFailure(e.message));
  }
}

// TODO https://github.com/redux-saga/redux-saga/issues/1883
export const sagas = [
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  takeEvery(RETRIEVE_CERTIFICATE_BY_ACTION, retrieveCertificateByAction),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  takeEvery(UPDATE_CERTIFICATE, verifyCertificate),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  takeEvery(SENDING_CERTIFICATE, sendCertificate),
  takeEvery(GENERATE_SHARE_LINK, generateShareLink),
];
