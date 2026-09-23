/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { captureException, captureMessage } from "@sentry/nextjs";
import {
  type VerificationFragment,
  decryptString,
  isValidOpenCert,
  isWrappedV2Document,
  isWrappedV3Document,
} from "@trustvc/trustvc";
import Router from "next/router";
import { call, put, select, takeEvery } from "redux-saga/effects";
import "isomorphic-fetch";

import { triggerV2ErrorLogging, triggerV3ErrorLogging, triggerW3CErrorLogging } from "../components/Analytics";
import { getCertificate } from "../reducers/certificate.selectors";
import {
  generateShareLink,
  generateShareLinkFailure,
  generateShareLinkReset,
  generateShareLinkSuccess,
  retrieveCertificateByAction,
  retrieveCertificateByActionFailure,
  retrieveCertificateByActionPending,
  retrieveCertificateByActionSuccess,
  sendCertificate,
  sendCertificateFailure,
  sendCertificateSuccess,
  updateCertificate,
  verifyingCertificate,
  verifyingCertificateCompleted,
  verifyingCertificateErrored,
} from "../reducers/certificate.slice";
import { sendEmail } from "../services/email";
import {
  certificateNotIssued,
  certificateRevoked,
  contractNotFound,
  invalidArgument,
  serverError,
} from "../services/fragment";
import { generateLink } from "../services/link";
import { matchPresentationFailure } from "../services/presentationFragment";
import { pushVerificationEvent } from "../services/verificationAnalytics";
import { createDocumentVerifier, getNetworkName } from "../services/verifier";
import { WrappedOrSignedOpenCertsDocument, isEncrypted } from "../shared";
import { getLogger } from "../utils/logger";
import { isVerifiablePresentation } from "../utils/presentation";

const { trace } = getLogger("saga:certificate");

// Re-exported: the network resolution lives with the verifier it configures.
export { getNetworkName };

export function* verifyCertificateSaga({ payload: certificate }: { payload: WrappedOrSignedOpenCertsDocument }) {
  try {
    yield put(verifyingCertificate());

    const verify = createDocumentVerifier(certificate);

    // https://github.com/redux-saga/redux-saga/issues/884
    const fragments: VerificationFragment[] = yield call(verify, certificate);
    trace(`Verification Status: ${JSON.stringify(fragments)}`);
    yield put(verifyingCertificateCompleted(fragments));

    const isValid = isValidOpenCert(fragments);
    // Push DOCUMENT_VERIFICATION_COMPLETED first so the GTM model reflects the current
    // verification result before any legacy analytics events (CERTIFICATE_ERROR) fire.
    pushVerificationEvent(certificate, fragments, isValid);

    if (isValid) {
      Router.push("/viewer");
    } else {
      const errors: string[] = [];
      if (!isValidOpenCert(fragments, ["DOCUMENT_INTEGRITY"])) {
        errors.push("CERTIFICATE_HASH");
      }

      if (!isValidOpenCert(fragments, ["DOCUMENT_STATUS"])) {
        if (certificateNotIssued(fragments)) errors.push("UNISSUED_CERTIFICATE");
        else if (certificateRevoked(fragments)) errors.push("REVOKED_CERTIFICATE");
        else if (serverError(fragments)) errors.push("SERVER_ERROR");
        else if (invalidArgument(fragments)) errors.push("INVALID_ARGUMENT");
        else if (contractNotFound(fragments)) errors.push("CERTIFICATE_STORE_NOT_FOUND");
        else errors.push("ETHERS_UNHANDLED_ERROR");
      }

      if (!isValidOpenCert(fragments, ["ISSUER_IDENTITY"])) {
        errors.push("ISSUER_IDENTITY");
      }

      // if the document is not valid
      if (!isWrappedV2Document(certificate) && !isWrappedV3Document(certificate)) {
        errors.splice(0, errors.length);
        // A presentation's fragments land on the same three types as a credential's, so the
        // checks above would report a revoked credential as an unissued certificate. Report
        // the failure the presentation verifier actually found instead.
        const presentationFailure = isVerifiablePresentation(certificate)
          ? matchPresentationFailure(fragments)
          : undefined;
        errors.push(presentationFailure ? `PRESENTATION_${presentationFailure.type}` : "INVALID_DOCUMENT");
      }

      if (errors.length > 0) {
        captureMessage("Certificate verification failed", {
          level: "error",
          tags: {
            saga: "verifyCertificate",
            outcome: "invalid_certificate",
            priority: "low",
          },
          extra: { reasons: errors },
          fingerprint: ["opencerts-verification-failed", ...[...errors].sort()],
        });
        if (isWrappedV2Document(certificate)) {
          triggerV2ErrorLogging(certificate, errors);
        } else if (isWrappedV3Document(certificate)) {
          triggerV3ErrorLogging(certificate, errors);
        } else {
          triggerW3CErrorLogging(certificate, errors);
        }
      }
    }
  } catch (e) {
    captureException(e, { tags: { saga: "verifyCertificate" } });
    if (e instanceof Error) yield put(verifyingCertificateErrored(e.message));
    else yield put(verifyingCertificateErrored(JSON.stringify(e)));
  }
}

export function* sendCertificateSaga({ payload }: { payload: { email: string; captcha: string } }) {
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
    captureException(e, { tags: { saga: "sendCertificate" } });
    if (e instanceof Error) yield put(sendCertificateFailure(e.message));
    else yield put(sendCertificateFailure(JSON.stringify(e)));
  }
}
type Await<T> = T extends PromiseLike<infer U> ? U : T;

export function* generateShareLinkSaga() {
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
    captureException(e, { tags: { saga: "generateShareLink" } });
    if (e instanceof Error) yield put(generateShareLinkFailure(e.message));
    else yield put(generateShareLinkFailure(JSON.stringify(e)));
  }
}

export function* retrieveCertificateByActionSaga({
  payload: { uri, key: payloadKey, anchorKey },
}: {
  payload: { uri: string; key?: string; anchorKey?: string };
}) {
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

    const key = anchorKey || payloadKey;

    if (isEncrypted(certificate)) {
      if (!key) {
        // key is missing, throw error
        throw new Error(`Key is required to decrypt certificate but received key=${key} and type=${certificate.type}`);
      }

      // Key is provided, decrypt document
      try {
        certificate = JSON.parse(
          decryptString({
            tag: certificate.tag,
            cipherText: certificate.cipherText,
            iv: certificate.iv,
            key,
            type: certificate.type,
          })
        );
      } catch (e) {
        throw new Error(`Error decrypting message with key=${key} and type=${certificate.type}`);
      }
    }

    yield put(updateCertificate(certificate as WrappedOrSignedOpenCertsDocument));
    yield put(retrieveCertificateByActionSuccess());
  } catch (e) {
    captureException(e, { tags: { saga: "retrieveCertificateByAction" } });
    if (e instanceof Error) yield put(retrieveCertificateByActionFailure(e.message));
    else yield put(retrieveCertificateByActionFailure(JSON.stringify(e)));
  }
}

export const sagas = [
  takeEvery(retrieveCertificateByAction, retrieveCertificateByActionSaga),
  takeEvery(updateCertificate, verifyCertificateSaga),
  takeEvery(sendCertificate, sendCertificateSaga),
  takeEvery(generateShareLink, generateShareLinkSaga),
];
